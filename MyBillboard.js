class  MyBillboard extends CGFobject {
  constructor(scene) {
    super(scene);
    this.progressBar = new MyPlane(scene,20);
    this.rect = new MyBackBillboard(scene,20);
    this.legs = new MyFlag(scene,20);

    this.backgroundTex = new CGFappearance(this.scene);
    this.backgroundTex.setAmbient(0.1, 0.1, 0.1, 1);
    this.backgroundTex.setDiffuse(0.9, 0.9, 0.9, 1);
    this.backgroundTex.setSpecular(0.1, 0.1, 0.1, 1);
    this.backgroundTex.setShininess(10.0);
    this.backgroundTex.loadTexture('images/billboard.png');
    this.backgroundTex.setTextureWrap('REPEAT', 'REPEAT');

    this.legsTex = new CGFappearance(this.scene);
    this.legsTex.setAmbient(0.1, 0.1, 0.1, 1);
    this.legsTex.setDiffuse(0.9, 0.9, 0.9, 1);
    this.legsTex.setShininess(10.0);
    this.legsTex.setSpecular(0.1, 0.1, 0.1, 1);
    this.legsTex.loadTexture('images/metal.png');
    this.legsTex.setTextureWrap('REPEAT', 'REPEAT');

    this.progressShader = new CGFshader(scene.gl, 'shaders/progressBar.vert', 'shaders/progressBar.frag');

  }

  update(SupDeliv){

    this.progressShader.setUniformsValues({Psupplies: SupDeliv/5.0});
  }

  display(){



            this.scene.pushMatrix();
            this.scene.translate(-5,1,-5);
            this.scene.rotate(Math.PI/4,0,1,0);
                this.scene.pushMatrix();
                  this.scene.translate(0,0.2,-0.020);
                  this.scene.scale(2,1,1);
                  this.backgroundTex.apply();
                  this.rect.display();
                this.scene.popMatrix();

              this.scene.pushMatrix();
                this.scene.setActiveShader(this.progressShader);
                this.backgroundTex.apply()
                this.scene.scale(1.5,0.2,1);
                this.progressBar.display();
                this.scene.setActiveShader(this.scene.defaultShader);
              this.scene.popMatrix();



              this.scene.pushMatrix();
                this.scene.translate(0,-0.8,0);
                this.legsTex.apply();
                this.scene.pushMatrix();
                    this.scene.translate(0.7,0,0);
                    this.scene.rotate(Math.PI,0,0,1);
                    this.scene.scale(0.2,1,1);
                    this.legs.display();
                this.scene.popMatrix();
                this.scene.pushMatrix();
                    this.scene.translate(-0.7,0,0);
                    this.scene.rotate(Math.PI,0,0,1);
                    this.scene.scale(0.2,1,1);
                    this.legs.display();
                this.scene.popMatrix();
              this.scene.popMatrix();
            this.scene.popMatrix();
  }

}
