class MyBackBillboard extends CGFobject {
  constructor(scene,nrDivs) {
    super(scene);
    nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
		this.nrDivs = nrDivs;
		this.patchLength = 1.0 / nrDivs;
		this.initBuffers();
  }
  initBuffers(){
    this.vertices= [];
    this.normals = [];
		this.texCoords = [];
    this.indices = [];
    var ind_lin= 2 * (this.nrDivs +1 );
    var y= 0.5;
    for (var i = 0; i <=this.nrDivs; i++) {
      var x = -0.5;
      for (var j = 0; j <= this.nrDivs; j++) {
        this.vertices.push(x,y,0);
        this.vertices.push(x,y,0);
        this.normals.push(0,0,1);
        this.normals.push(0,0,-1);
        this.texCoords.push(j*this.patchLength/2,i*this.patchLength/2);
        this.texCoords.push(0.5+j*this.patchLength/2,0.5+i*this.patchLength/2);
        if (j < this.nrDivs && i < this.nrDivs){
          this.indices.push(i*ind_lin+2*j,(1+i)*ind_lin+2*j,i*ind_lin+2*(j+1));
          this.indices.push(i*ind_lin+2*(j+1),(1+i)*ind_lin+2*j,(1+i)*ind_lin+2*(j+1));
          this.indices.push((1+i)*ind_lin+2*j+1,i*ind_lin+2*j+1,i*ind_lin+2*(j+1)+1);
          this.indices.push((1+i)*ind_lin+2*j+1,i*ind_lin+2*(j+1)+1,(1+i)*ind_lin+2*(j+1)+1);
        }
        x+=this.patchLength;
      }
      y-=this.patchLength
   }


   this.primitiveType = this.scene.gl.TRIANGLES;
   this.initGLBuffers();
  }

}
