/**
* @constructor
*/
class MyLeme extends CGFobject {
    constructor(scene) {
        super(scene);
        this.triangle= new MyTriangle(scene);
        this.quad= new MyQuad(scene);
    }

    display() {
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.pushMatrix();
        this.scene.translate(0,1.5,0);
        this.quad.display();
        this.scene.translate(1,0,0);
        this.scene.scale(1/2,1/2,0);
        this.triangle.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,1,0,0)
        this.scene.translate(0,1.5,0);
        this.quad.display();
        this.scene.translate(1,0,0);
        this.scene.scale(1/2,1/2,0);
        this.triangle.display();
        this.scene.popMatrix();


    }


}
