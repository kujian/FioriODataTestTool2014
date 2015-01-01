jQuery.sap.declare("2014-12-30-fioriodatatest.reuselib.reuse");


(function(name) {
	console.log("Hello world: " + name);
	jQuery.sap.JerryTrace = function(name_output) {
		console.log("Hello world: " + name_output);
	};
	
	jQuery.sap.addColumnSorterAndFilter =  function (oColumn, comparator) {  
		var oCustomMenu = new sap.ui.commons.Menu();  
		oCustomMenu.addItem(new sap.ui.commons.MenuItem({  
			text: 'Sort ascending',  
			select:function() {  
				var oTable = oColumn.getParent();  
				var oSorter = new sap.ui.model.Sorter(oColumn.getSortProperty(), false);  
				oSorter.fnCompare=comparator;  
				oTable.getBinding("rows").sort(oSorter);  
				for (var i=0;i<oTable.getColumns().length; i++) {
					oTable.getColumns()[i].setSorted(false); 
				}
				oColumn.setSorted(true);  
				oColumn.setSortOrder(sap.ui.table.SortOrder.Ascending);  
			}}));
		
		oCustomMenu.addItem(new sap.ui.commons.MenuItem({  
			text: 'Sort descending',  
			select:function(oControlEvent) {  
				var oTable = oColumn.getParent();  
				var oSorter = new sap.ui.model.Sorter(oColumn.getSortProperty(), true);  
				oSorter.fnCompare = comparator;  
				oTable.getBinding("rows").sort(oSorter);  
				for (var i=0;i<oTable.getColumns().length; i++) {
					oTable.getColumns()[i].setSorted(false);  
				}
				oColumn.setSorted(true);  
				oColumn.setSortOrder(sap.ui.table.SortOrder.Descending);  
			}}));  

			oCustomMenu.addItem(new sap.ui.commons.MenuTextFieldItem({  
				text: 'Filter',  
				select: function(oControlEvent) {  
					var oTable = oColumn.getParent();  
					var filterValue = oControlEvent.getParameters().item.getValue();  
					var filterProperty = oControlEvent.getSource().getParent().getParent().mProperties.sortProperty;  
					var filters = [];  
					if (filterValue.trim() != '') {  
						var oFilter1 = new sap.ui.model.Filter(filterProperty, sap.ui.model.FilterOperator.Contains, filterValue);  
						filters = [oFilter1];      
					}  
					oTable.getBinding("rows").filter(filters, sap.ui.model.FilterType.Application);  
				}}));  
			oColumn.setMenu(oCustomMenu);  
			return oColumn;  
		},  
		
	jQuery.sap.sort = function( left, right) {
		if( left === right)
			return 0;
		for( var i = 0; i < left.length; i ++) {
			var leftChar = left.charAt(i);
			for( var j = i; j < right.length; j ++) {
				var rightChar = right.charAt(j);
				if( leftChar == rightChar) {
					break;
				}
				else if( leftChar > rightChar) {
					console.log(left + " big than " + right);
					return 1;
				}
				else {
					console.log(left + " small than " + right);
					return -1;
				}
	 	}
	 }
	 if( left.length > right.length) {
	 	console.log( left + " big than " + right);
	 	return 1;
	 }
	 else {
	 	console.log( left + " small than " + right);
	 	return -1;
	 }
	}            
})("Jerry");
