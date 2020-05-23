/**
* @constructor
*/
class MyGondola extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cylinder= new MyCylinder(scene,12);
        this.sphere= new MySphere(scene,16,8);

        this.glassTex = new CGFappearance(this.scene);
        this.glassTex.setAmbient(0.1, 0.1, 0.1, 1);
        this.glassTex.setDiffuse(0.9, 0.9, 0.9, 1);
        this.glassTex.setSpecular(0.1, 0.1, 0.1, 1);
        this.glassTex.setShininess(10.0);
        this.glassTex.loadTexture('images/glass.png');
        this.glassTex.setTextureWrap('REPEAT', 'REPEAT');

    }

    display() {
      this.scene.pushMatrix();
      this.glassTex.apply();
        this.scene.translate(0,-0.5,0);
        this.scene.scale(1/5,1/3,1/6);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.5,2,0.5);
        this.scene.translate(0,-1/2,0);
        this.cylinder.display();
        this.sphere.display();
        this.scene.translate(0,1,0);
        this.sphere.display();
      this.scene.popMatrix();
    }


}
