sap.ui.jsview("scn_exercise.view.App", {

	getControllerName: function () {
		return "scn_exercise.view.App";
	},
	
	createContent: function (oController) {
		
		// to avoid scroll bars on desktop the root view must be set to block display
		this.setDisplayBlock(true);
		
		this.app = new sap.m.App();
		
		// load the master page
		var master = sap.ui.xmlview("Master", "scn_exercise.view.Master");
		master.getController().nav = this.getController();
		this.app.addPage(master, true);
		
		var detail = sap.ui.xmlview("Detail", "scn_exercise.view.Detail");
		detail.getController().nav = this.getController();
		this.app.addPage(detail, false);
		
		return this.app;
	}
});