sap.ui.jsview("scn_exercise.view.App", {

	getControllerName: function () {
		return "scn_exercise.view.App";
	},
	
	createContent: function (oController) {
		
		// to avoid scroll bars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
		
		this.app = new sap.m.SplitApp();
		
		// load the master page
		var master = sap.ui.xmlview("Master", "scn_exercise.view.Master");
		master.getController().nav = this.getController();
		this.app.addPage(master, true);
		
		// load the empty page
		var empty = sap.ui.xmlview("Empty", "scn_exercise.view.Empty");
		this.app.addPage(empty, false);
		
		return this.app;
	}
});