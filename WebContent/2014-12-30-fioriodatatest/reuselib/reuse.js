jQuery.sap.declare("2014-12-30-fioriodatatest.reuselib.reuse");


(function(name) {
	console.log("Hello world: " + name);
	jQuery.sap.JerryTrace = function(name_output) {
		console.log("Hello world: " + name_output);
	};
	
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
