function loadApplication(){
	window.slotMachineEngine = new SlotMachineEngine(4);
	window.slotMachineEngine.initialise();
}

function startAction(){
	window.slotMachineEngine.start();
}