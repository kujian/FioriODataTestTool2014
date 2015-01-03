jQuery.sap.require("scn_exercise.util.Formatter");

sap.ui.controller("scn_exercise.view.Master", {

	handleListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("Detail", context);
	}
});