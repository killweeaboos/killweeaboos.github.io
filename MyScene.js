/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);

        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.sphere = new MySphere(this, 16, 8);
        this.cylinder= new MyCylinder(this,3);
        this.cube = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this,4);
        this.dirigivel = new MyDirigivel(this,4);
        this.terrain = new MyTerrain(this,20);
        this.supply1= new MySupply(this);
        this.supply2= new MySupply(this);
        this.supply3= new MySupply(this);
        this.supply4= new MySupply(this);
        this.supply5= new MySupply(this);
        this.billboard = new MyBillboard(this);

        this.supplies=[this.supply1,this.supply2,this.supply3,this.supply4,this.supply5]




        this.objects = [this.sphere,this.cylinder,this.vehicle,this.dirigivel];
        this.objectIDs = { 'Sphere': 0 , 'Cylinder': 1, "Vehicle":2, "dirigivel":3};


        this.quadMaterial = new CGFappearance(this);
        this.quadMaterial.setAmbient(1.0, 1.0, 1.0, 1);
        this.quadMaterial.setDiffuse(0.4, 0.4, 0.4, 1);
        this.quadMaterial.setSpecular(0.0, 0.0, 0.0, 1);
        this.quadMaterial.setShininess(10.0);
        //this.quadMaterial.loadTexture('images/default.png');
        this.quadMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.earth = new CGFappearance(this);
        this.earth.setAmbient(0.8, 0.8, 0.8, 1);
        this.earth.setDiffuse(0.9, 0.9, 0.9, 1);
        this.earth.setSpecular(0.1, 0.1, 0.1, 1);
        this.earth.setShininess(10.0);
        this.earth.loadTexture('images/earth.jpg');
        this.earth.setTextureWrap('REPEAT', 'REPEAT');

        this.sky = new CGFtexture(this,'images/cubemap.png');
        this.night = new CGFtexture(this,'images/night.png');

        this.textures=[this.sky,this.night];
        this.textureIds={'Sky':0,'Night':1};

        this.defaultMaterial = new CGFappearance(this);
        this.defaultMaterial.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultMaterial.setShininess(10.0);
        //Objects connected to MyInterface
        this.displayAxis = true;
        this.selectedObject = 3;
        this.displayNormals = false;
        this.objectComplexity = 0.5;
        this.scaleFactor = 2.0;
        this.scaleFactorVehicle = 1.0;
        this.speedFactor=0.5;
        this.selectedTexture=-1;
        this.lastUpdateTime=0;
        this.refreshTime=0;
        this.droppedCounter=0;


    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(100, 100, 100), vec3.fromValues(10, 10, 10));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }


    checkKeys() {
            var text="Keys pressed: ";
            var keysPressed=false;
            if (!(this.dirigivel.autoOn)){
              if (this.gui.isKeyPressed("KeyA")) {
              text+=" A ";
              keysPressed=true;
              this.vehicle.turn(-1);
              this.dirigivel.turn(-1);
              }
              if (this.gui.isKeyPressed("KeyD")) {
              text+=" D ";
              keysPressed=true;
              this.vehicle.turn(1);
              this.dirigivel.turn(1);
              }
              if (this.gui.isKeyPressed("KeyW")) {
              text+=" W ";
              keysPressed=true;
              this.vehicle.accelerate(1*this.speedFactor);
              this.dirigivel.accelerate(1*this.speedFactor);
              }
              if (this.gui.isKeyPressed("KeyS")) {
              text+=" S ";
              keysPressed=true;
              this.vehicle.accelerate(-1*this.speedFactor);
              this.dirigivel.accelerate(-1*this.speedFactor);
              }
            }
            // Check for key codes e.g. in https://keycode.info/
            if (this.gui.isKeyPressed("KeyL") && this.objects[this.selectedObject]==this.dirigivel) {
            text+=" L ";
            keysPressed=true;
            if(this.droppedCounter<5){
                this.supplies[this.droppedCounter].drop(this.dirigivel.x,this.dirigivel.z);
                this.supplies[this.droppedCounter].scaleFactorupdate(this.scaleFactorVehicle);
                this.droppedCounter++;

            }

            }
            if (this.gui.isKeyPressed("KeyR")) {
            text+=" R ";
            keysPressed=true;
            this.vehicle.reset(1);
            this.dirigivel.reset(1);
            this.droppedCounter=0;
            for( var i =0; i<5; i++){
              this.supplies[i].reset();
            }
            }
            if (this.gui.isKeyPressed("KeyP")) {
            text+=" P ";
            keysPressed=true;
            this.dirigivel.autoPilot();
            }
            if (keysPressed){
            console.log(text);
            }
            if (!(this.gui.isKeyPressed("KeyA")) && !(this.gui.isKeyPressed("KeyD"))){
            this.dirigivel.turn(0);
            }
            }
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        //To be done...
        if(this.lastUpdateTime== 0)
            this.lastUpdateTime=t;
        this.refreshTime=t-this.lastUpdateTime;
        this.lastUpdateTime=t;
        this.checkKeys();
        this.vehicle.update();
        this.vehicle.display();
        this.dirigivel.update(this.refreshTime,this.scaleFactorVehicle);
        this.dirigivel.display();
        for( var i =0; i<5; i++){
          this.supplies[i].update(this.refreshTime);
        }
        this.billboard.update(this.droppedCounter);
      }


    updateObjectComplexity(){
        if (this.objects[this.selectedObject]==this.cylinder)
        this.objects[this.selectedObject].updateBuffers(this.objectComplexity);

    }

    updateAppliedTexture() {
      this.quadMaterial.setTexture(this.textures[this.selectedTexture]);
    }


    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();


        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);

        this.pushMatrix();
        this.billboard.display()
        this.popMatrix();

        // ---- BEGIN Primitive drawing section


        //This sphere does not have defined texture coordinates

        if (this.objects[this.selectedObject]==this.cylinder){
          if (this.displayNormals)
              this.objects[this.selectedObject].enableNormalViz();
          else{
            this.objects[this.selectedObject].disableNormalViz();
          }
        }

        if (this.objects[this.selectedObject]==this.sphere){
          this.pushMatrix();
          this.translate(0,10,0);
          this.earth.apply();
          this.objects[this.selectedObject].display();
          this.popMatrix();
        }

        else if ( this.objects[this.selectedObject]==this.dirigivel){
          this.pushMatrix();
          this.objects[this.selectedObject].display();
          this.popMatrix();
          this.pushMatrix();

            for( var i =0; i<5; i++){
              this.supplies[i].display();
            }

          this.popMatrix();
        }else{
          this.pushMatrix();
          this.translate(0,10,0);
          this.defaultMaterial.apply();
          this.objects[this.selectedObject].display();
          this.popMatrix();
        }

        this.terrain.display();
        this.pushMatrix();
        this.quadMaterial.apply();
        this.translate(0,24.98,0);
        this.scale(50,50,50);
        this.cube.display();
        this.popMatrix();
        // ---- END Primitive drawing section
    }

}
