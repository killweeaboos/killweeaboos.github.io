/**
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene,slices) {
        super(scene);
        //this.dirigivel= new MyDirigivel(this,);
        this.pyramid= new MyPyramid(scene,3,1);
        this.ang=0;
        this.vel=0;
        this.x=0;
        this.z=0;
    }
    update(){
      this.x+=this.vel*Math.sin(this.ang);
      this.z+=this.vel*Math.cos(this.ang);
    }

    turn(val){
      this.ang=(this.ang+val*0.1)%(2*Math.PI);
    }
    accelerate(val){
      this.vel+=val*0.01;
      if(this.vel<0){
        this.vel=0;
      }
    }
    reset(){
      this.x=0;
      this.z=0;
      this.ang=0;
      this.vel=0;
    }
    display() {
      this.scene.pushMatrix();
      this.scene.translate(this.x,0,this.z);
        this.scene.rotate(this.ang,0,1,0);
        this.scene.translate(0,0,-1/2);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.pyramid.display();
      this.scene.popMatrix();
    }


}
