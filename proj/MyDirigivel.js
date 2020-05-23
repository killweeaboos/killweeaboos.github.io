/**
* @constructor
*/
class MyDirigivel extends CGFobject {
    constructor(scene,slices) {
        super(scene);
        this.ang=0;
        this.ang_leme=0;
        this.ang_motor=0;
        this.vel=0;
        this.x=0;
        this.z=0;
        this.x_C=0;
        this.z_C=0;
        this.dir=0;
        this.pil_ang=0;
        this.vel_ang_autoP=Math.PI*2/5000;
        this.autoOn=0;
        this.sphere=new MySphere(scene,16,8);
        this.leme= new MyLeme(scene);
        this.gondola= new MyGondola(scene);
        this.motor= new MyMotor(scene);
        this.bandeira= new MyFlag(scene,20);
        this.time=0;
        this.offset=0;
        this.previous_vel=this.vel;
        this.scaleVehicle=1;

        this.bandTex = new CGFappearance(this.scene);
        this.bandTex.setAmbient(0.1, 0.1, 0.1, 1);
        this.bandTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bandTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.bandTex.setShininess(10.0);
        this.bandTex.loadTexture('images/wario.png');
        this.bandTex.setTextureWrap('REPEAT', 'REPEAT');

        this.bodyTex = new CGFappearance(this.scene);
        this.bodyTex.setAmbient(0.1, 0.1, 0.1, 1);
        this.bodyTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bodyTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.bodyTex.setShininess(10.0);
        this.bodyTex.loadTexture('images/duff.png');
        this.bodyTex.setTextureWrap('REPEAT', 'REPEAT');




        this.bandshader = new CGFshader(scene.gl, 'shaders/bandeira.vert', 'shaders/bandeira.frag');



        this.bandshader.setUniformsValues({speed: this.vel});
        this.bandshader.setUniformsValues({timeFactor: this.time});
        this.bandshader.setUniformsValues({uSampler1: 0})

    }
    update(deltaT,scaleVehicle){
      this.time+=deltaT;
      this.offset+=Math.min(deltaT*(this.vel+0.1)*0.1,2.0);
      this.bandshader.setUniformsValues({speed: this.vel});
      this.bandshader.setUniformsValues({timeFactor: this.offset});
      this.scaleVehicle=scaleVehicle;


      if (this.autoOn){
        this.pil_ang=(this.pil_ang+deltaT*this.vel_ang_autoP);
        this.x=this.x_C+5*Math.sin(this.pil_ang);
        this.z=this.z_C+5*Math.cos(this.pil_ang);
        this.ang=(this.pil_ang+Math.PI/2);
      } else {
        this.x+=this.vel*Math.sin(this.ang);
        this.z+=this.vel*Math.cos(this.ang);
      }

      this.ang_motor=(this.ang_motor+this.vel*2+0.1)%(2*Math.PI)
    }

    turn(val){
      this.ang=(this.ang+val*0.1)%(2*Math.PI);
      this.ang_leme+=val*0.1;

      if (this.ang_leme>Math.PI/7){
        this.ang_leme=Math.PI/7;
      } else if (this.ang_leme<-Math.PI/7) {
        this.ang_leme=-Math.PI/7;
      }
      if ((val==0)&& !(this.autoOn))
      this.ang_leme=0;
    }
    accelerate(val){
      this.vel+=val*0.01;
      if(this.vel<0){
        this.vel=0;
      }
    }
    reset(){
      this.ang=0;
      this.ang_leme=0;
      this.ang_motor=0;
      this.vel=0;
      this.x=0;
      this.z=0;
      this.x_C=0;
      this.z_C=0;
      this.dir=0;
      this.pil_ang=0;
      this.autoOn=0;

    }
    autoPilot(){
      if (this.autoOn){
        this.autoOn=0;
        this.vel=this.previous_vel;
        this.ang_leme=0;
        return;
      }else{
        this.autoOn=1;
        this.previous_vel=this.vel;
        this.ang_leme=-Math.PI/15;
      }

      this.dir=(this.ang+Math.PI/2);
      this.x_C=this.x+5*Math.sin(this.dir);
      this.z_C=this.z+5*Math.cos(this.dir);
      this.vel=5*this.vel_ang_autoP;
      this.pil_ang=(this.ang-(Math.PI/2));
      //this.x=this.x_C-5*Math.cos(this.dir);
      //this.z=this.z_C-5*Math.sin(this.dir);
      //this.ang=this.pil_ang+Math.PI/2;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x,10,this.z);
        this.scene.scale(this.scaleVehicle,this.scaleVehicle,this.scaleVehicle);
        this.scene.rotate(this.ang,0,1,0);

                              this.scene.pushMatrix();
                                this.gondola.display();
                              this.scene.popMatrix();



                      this.scene.pushMatrix();
                      //rodar leme
                          this.scene.rotate(this.ang_leme,0,1,0);
                          this.scene.translate(0,0,-1);
                          this.scene.scale(0,1/3,1/3);
                          this.leme.display();
                      this.scene.popMatrix();

                      this.scene.pushMatrix();
                            this.scene.rotate(Math.PI/2,0,0,1);
                            this.scene.translate(0,0,-1);
                            this.scene.scale(0,1/3,1/3);
                            //leme estático
                            this.leme.display();
                      this.scene.popMatrix();

                      this.scene.pushMatrix();
                            this.scene.translate(0,-0.54,-0.52);
                            this.scene.scale(1/25,1/25,1/25);
                            this.scene.rotate(this.ang_motor,0,0,1);
                            this.motor.display();
                      this.scene.popMatrix();

                      this.scene.pushMatrix();
                        this.scene.setActiveShader(this.bandshader);
                        this.bandTex.apply()

                        this.scene.translate(0,0,-3);
                        this.scene.scale(1,1,2);;
                        this.scene.rotate(Math.PI/2,0,1,0);
                        this.bandeira.display();


                      this.scene.popMatrix();

                      this.scene.setActiveShader(this.scene.defaultShader);

                      this.scene.pushMatrix();
                            this.scene.scale(0.5,0.5,1);
                            //corpo dirigivel
                            this.scene.pushMatrix();
                            this.bodyTex.apply();
                            this.sphere.display();
                            this.scene.popMatrix();
                      this.scene.popMatrix();
        this.scene.popMatrix();
    }


}
