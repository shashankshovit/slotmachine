class MeraObj {
	constructor(){
		this.parent = null;
		this.children = [];
		this.html = '';
	}
	add(item) {
		this.children.push(item);
		item.parent = this;
		this.html.append(item.render());
	}
}

class Image extends MeraObj {
	constructor(identity){
		super();
		this.identity = identity;
		this.top = 0;
		this.speed = 5;
		this.allowedTop = -100;
	}

	getPath(){
		return "../images/" + this.identity + ".png";
	}

	setIdentity(identity){
		this.identity = identity;
		this.html.src = this.identity;
	}

	resetSpeed(){
		this.speed = 0;
		return this.speed;
	}

	nextTop(){
		this.top -= this.speed;
		if(this.top <= this.allowedTop) {
			this.top = 100;
		}
		return this.top;
	}

	update(){
		this.html.style.top = this.nextTop() + "px";
		this.html.src = this.getPath();
	}

	render(){
		// this.html = document.createElement("div");
		// let image = document.createElement("img");
		this.html = document.createElement("img");
		// image.setAttribute("src", this.path);
		this.html.setAttribute("src", this.getPath());
		this.html.style.top = this.identity + 100 + "px";
		// this.html.append(image);
		return this.html;
	}
}

class Slot extends MeraObj {
	constructor(i, width){
		super();
		this.identity = i;
		this.imageCounter = 0;
		this.width = width;
		this.top = 0;
	}

	currentImageCounter(){
		return this.imageCounter;
	}

	nextImageCounter(){
		if(this.imageCounter + 1 > 9){
			return 0;
		}
		else {
			return this.imageCounter + 1;
		}
	}

	previousImageCounter(){
		if(this.imageCounter - 1 < 0){
			return 9;
		} else {
			return this.imageCounter - 1;
		}
		
	}

	incrementImageCounter(){
		this.imageCounter = this.nextImageCounter();
		return this.imageCounter;
	}

	decrementImageCounter(){
		this.imageCounter = this.previousImageCounter();
		return this.imageCounter;
	}

	update(){
		// this.html.style.top = --this.top + "px";
		this.children.map(image => image.update());
	}

	render(){
		this.html = document.createElement("div");
		this.html.setAttribute("id", "slot"+this.identity);
		this.html.setAttribute("class", "slot slot"+this.identity);
		this.html.style.width = this.width+"%";
		let image = '';
		image = new Image(this.previousImageCounter());		
		this.add(image);
		image = new Image(this.currentImageCounter());
		this.add(image);
		image = new Image(this.nextImageCounter());
		this.add(image);
		let cover = '';
		cover = document.createElement("div");
		cover.setAttribute("class", "cover first");
		this.html.append(cover);
		cover = document.createElement("div");
		cover.setAttribute("class", "cover second");
		this.html.append(cover);
		return this.html;
	}
}

class Header extends MeraObj {
	constructor(heading){
		super();
		this.heading = heading;
	}
	render(){
		this.html = document.createElement("div");
		this.html.setAttribute("class", "header");
		this.html.innerHTML = this.heading;
		return this.html;
	}
}

class SlotArea extends MeraObj {
	constructor(slots){
		super();
		this.slots = slots;
	}
	render(){
		this.html = document.createElement("div");
		this.html.setAttribute("class", "slot-area");
		for(let i=0; i < this.slots; i++){
			let slot = new Slot(i, (100/this.slots - 0.5));
			this.add(slot);
		}

		return this.html;
	}
}

class Button extends MeraObj {
	constructor(text){
		super();
		this.text = text;
	}
	startAction(){
		return function(){
			alert("working");
		}
	}
	render(){
		this.html = document.createElement("div");
		this.html.setAttribute("class", "button");
		this.html.addEventListener("click", this.startAction());
		this.html.innerHTML = this.text;
		return this.html;
	}
}

class SlotMachine extends MeraObj {
	constructor(slots = 3 /* integer */, heading /* text */){
		super();
		this.slots = slots;
		this.heading = heading ? heading : "Slot Machine";
		this.time = 0; 	// ms
		this.timeInterval = 100;	// ms
		this.isSpinning = null;
	}

	_initialise(){
		let header = new Header(this.heading);
		this.add(header);
		let slotArea = new SlotArea(this.slots);
		this.add(slotArea);
		// let button = new Button("i am button");
		// this.add(button.render())
	}

	start(){
		// we dont want to call setInterval multiple times
		if (!this.isSpinning) {
			this.isSpinning = setInterval(function(){ this.update(); }.bind(this), this.timeInterval);
		}
	}

	update(){
		this.time += this.timeInterval;
		// check if slot machine is spinning status
		if(this.isSpinning) {
			// start spinning each slot every 500 ms
			for(let i = 0; i < this.slots; i++){
				if (this.time > i*500) {
					// this.children[1] gives slot area
					// this.children[1].children[i] gives slot
					this.children[1].children[i].update();
				}
			}
		}
	}

	render(){
		this.html = document.createElement("div");
		this.html.setAttribute("class", "slot-machine");
		this._initialise();
		return this.html;
	}

}

class SlotMachineEngine {
	constructor(slots = 3 /* integer */, heading /* text */){
		this.slots = slots;
		this.heading = heading ? heading : "Slot Machine";
	}

	initialise(){
		this.slotMachineContainer = document.getElementById("slot_machine");
		this.slotMachine = new SlotMachine(this.slots, this.heading);
		this.slotMachineContainer.append(this.slotMachine.render());
	}

	start(){
		this.slotMachine.start();
	}
}

