/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var height = 1




        for(var i = 0; i <= this.slices; i++){

            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.vertices.push(Math.cos(ang), height, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));

            ang+=alphaAng;
        }

        for (var i = 0; i < (this.slices*2); i+=2){
         this.indices.push(i, i+2 , i+1);
         this.indices.push(i+1, i+2, i+3);
        }



        for (var i = 0; i <=this.slices;i++){
          this.texCoords.push(i/this.slices,1);
          this.texCoords.push(i/this.slices,0);
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
