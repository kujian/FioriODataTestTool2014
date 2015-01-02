jQuery.sap.require("scn_exercise.util.Formatter");

sap.ui.controller("scn_exercise.view.Detail", {

	handleNavButtonPress : function (evt) {
		this.nav.back("Master");
	}
});