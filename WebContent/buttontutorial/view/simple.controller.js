sap.ui.controller("buttontutorial.view.simple", {

	onInit : function() {
		var oButton = this.getButtonReference();
		var oDom = oButton.getDomRef();
		debugger;
	},
	
	onBeforeRendering: function() {
		var oButton = this.getButtonReference();
		var oDom = oButton.getDomRef();
		debugger;
	},
	
	onAfterRendering: function() {
		var oButton = this.getButtonReference();
		var oDom = oButton.getDomRef();
		jQuery.sap.require("sap.ui.core.theming.Parameters");
		oDom.style.color = sap.ui.core.theming.Parameters.get("sapUiAccent2");
		oDom.style.backgroundColor = sap.ui.core.theming.Parameters.get("sapUiErrorBG");
		debugger;
	},
	
	getButtonReference: function() {
		return this.getView().byId("jerryButton");
	}
	
});