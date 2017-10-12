class MeraObj {
	constructor(){
		this.parent = null;
		this.children = [];
		this.html = '';
	}
	add(item) {
		this.children.push(item);
		item.parent = this;
		this.html.append(item);
	}
}

class Image extends MeraObj {
	constructor(path){
		super();
		this.path = path;
	}
	render(){
		this.html = document.createElement("div");
		let image = document.createElement("img");
		image.setAttribute("src", this.path);
		this.html.append(image);
		return this.html;
	}
}

class Slot extends MeraObj {
	constructor(i){
		super();
		this.identity = i;
	}

	render(){
		this.html = document.createElement("div");
		this.html.setAttribute("id", "slot"+this.identity);
		this.html.setAttribute("class", "slot slot"+this.identity);
		for(let i=0; i<10; i++){
			let image = new Image("../images/" + i + ".png");
			this.add(image.render());
		}
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
			let slot = new Slot(i);
			this.add(slot.render());
		}
		return this.html;
	}
}

class Button extends MeraObj {
	constructor(text){
		super();
		this.text = text;
	}
	render(){
		this.html = document.createElement("div");
		this.html.setAttribute("class", "button");
		this.html.innerHTML = this.text;
		return this.html;
	}
}

class SlotMachine extends MeraObj {
	constructor(slots = 3 /* integer */, heading /* text */){
		super();
		this.slots = slots;
		this.heading = heading ? heading : "Slot Machine";
	}

	_initialise(){
		let header = new Header(this.heading);
		this.add(header.render());
		let slotArea = new SlotArea(this.slots);
		this.add(slotArea.render())
		let button = new Button("i am button");
		this.add(button.render())
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
}

