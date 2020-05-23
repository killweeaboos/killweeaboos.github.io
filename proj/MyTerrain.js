
/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
class MyTerrain extends CGFobject{
	constructor(scene, nrDivs) {
		super(scene);


		this.tShader = new CGFshader(scene.gl, 'shaders/terrain.vert', 'shaders/terrain.frag');
		this.texture1 = new CGFtexture(scene, 'images/terrain.png');
		this.texture2 = new CGFtexture(scene, 'images/heightmap.png');

		this.tShader.setUniformsValues({ uSampler1: 1});
		this.plane=new MyPlane(scene,nrDivs);
	}


	display() {
        this.scene.setActiveShader(this.tShader);
        this.scene.pushMatrix();

        this.texture1.bind(0);
        this.texture2.bind(1);

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.scene.scale(50, 50, 1);

				this.plane.display();

        this.scene.popMatrix();
				this.scene.popMatrix();

        // restore default shader (will be needed for drawing the axis in next frame)
        this.scene.setActiveShader(this.scene.defaultShader);
    }



}
