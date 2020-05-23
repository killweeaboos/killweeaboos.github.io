/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			0.5, -0.5, -0.5,	//0
			0.5, 0.5, -0.5,	//1
			-0.5, 0.5, -0.5,	//2
			-0.5, -0.5, -0.5,	//3

			-0.5, -0.5, 0.5, //7
			-0.5, 0.5, 0.5,	//6
		0.5, 0.5, 0.5,	//5
			0.5, -0.5, 0.5,	//4


			0.5, -0.5, 0.5,	//4
			0.5, 0.5, 0.5,	//5
			0.5, 0.5, -0.5,	//1
			0.5, -0.5, -0.5,	//0

			-0.5, -0.5, -0.5,	//3
			-0.5, 0.5, -0.5,	//2
			-0.5, 0.5, 0.5,	//6
			-0.5, -0.5, 0.5, //7

			0.5, 0.5, -0.5,	//1
			0.5, 0.5, 0.5,	//5
			-0.5, 0.5, 0.5,	//6
			-0.5, 0.5, -0.5,	//2

			0.5, -0.5, 0.5,	//4
			0.5, -0.5, -0.5,	//0
			-0.5, -0.5, -0.5,	//3
			-0.5, -0.5, 0.5, //7




		];

		//Counter-clockwise reference of vertices
		this.indices = [

		];

		for( var i = 0; i < 23 ; i+=4){
			this.indices.push(i,i+1,i+3);
			this.indices.push(i+1,i+2,i+3);
		}

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1,

			0,0,-1,
			0,0,-1,
			0,0,-1,
			0,0,-1,

			-1,0,0,
			-1,0,0,
			-1,0,0,
			-1,0,0,


			1,0,0,
			1,0,0,
			1,0,0,
			1,0,0,

			0,-1,0,
			0,-1,0,
			0,-1,0,
			0,-1,0,

			0,1,0,
			0,1,0,
			0,1,0,
			0,1,0,

		]

		this.texCoords=[
			2/4,2/3,
			2/4,1/3,
			1/4,1/3,
			1/4,2/3,

			4/4,2/3,
			4/4,1/3,
			3/4,1/3,
			3/4,2/3,


			3/4,2/3,
			3/4,1/3,
			2/4,1/3,
			2/4,2/3,


			1/4,2/3,
			1/4,1/3,
			0, 1/3,
			0, 2/3,

			2/4,1/3,
			2/4,0,
			1/4,0,
			1/4,1/3,


			2/4,3/3,
			2/4,2/3,
			1/4,2/3,
			1/4,3/3,



		];



		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
