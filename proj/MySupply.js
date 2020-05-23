const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};
/**

 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {
	constructor(scene) {
		super(scene);
		this.box = new MyUnitCubeQuad(scene);
		this.state=SupplyStates.INACTIVE;
		this.y=10;
		this.x=0;
		this.z=0;
    this.boxScale=1;
					this.materialFall = new CGFappearance(this.scene);
	        this.materialFall.setAmbient(1, 1, 1, 1.0);
	        this.materialFall.setDiffuse(0.5, 0.5, 0.5, 1.0);
	        this.materialFall.setSpecular(1, 1, 1, 1.0);
	        this.materialFall.setShininess(50.0);
	        this.materialFall.loadTexture('images/fall.png');

					this.materialLand = new CGFappearance(this.scene);
	        this.materialLand.setAmbient(1, 1, 1, 1.0);
	        this.materialLand.setDiffuse(0.5, 0.5, 0.5, 1.0);
	        this.materialLand.setSpecular(1, 1, 1, 1.0);
	        this.materialLand.setShininess(50.0);
	        this.materialLand.loadTexture('images/land.png');

	}
	update(deltaT){
		if(this.state==SupplyStates.FALLING){
		this.y-=10/3*deltaT/1000;
		this.land();
	}
	}


  scaleFactorupdate(scaleFactor){
    this.boxScale=scaleFactor;
  }
	drop(x,z){
		this.x=x;
		this.z=z;
		this.state=SupplyStates.FALLING;

	}
	land(){
		if(this.y<=0.5*this.boxScale){
			this.state=SupplyStates.LANDED;
      this.y=0.5*this.boxScale;
		}
	}
	reset(){
		this.state=SupplyStates.INACTIVE;
		this.y=10;
		this.x=0;
		this.z=0;
	}
	display()
	{
		if (this.state!=SupplyStates.INACTIVE){
		this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		if (this.state==SupplyStates.FALLING){
			this.materialFall.apply();
		}else {
			this.materialLand.apply();
		}
    this.scene.scale(this.boxScale,this.boxScale,this.boxScale);
    this.scene.scale(0.5,0.5,0.5);
		this.box.display();
		this.scene.popMatrix();

	}
}
}
