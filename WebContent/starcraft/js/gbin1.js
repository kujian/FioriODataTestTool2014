$(document).ready(function(){
	
	var items = $('#starcraft li'), itemsByTag = {};
	
	items.each(function(i){
		var elem = $(this);
		var tag = elem.data('tag');
		elem.attr('data-id',i);
		tag = $.trim(tag);			
		if(!(tag in itemsByTag)){
			itemsByTag[tag] = [];
		}
		itemsByTag[tag].push(elem);
	});

	
	createList('All unit',items);

	$.each(itemsByTag,function(k,v){
		createList(k,v);
	});
		
	$('#navbar').delegate('a', 'click', function(e){
		var link = $(this);
		link.addClass('active').siblings().removeClass('active');		
		$('#starcraft').quicksand(link.data('list').find('li'));
		e.preventDefault();
	});
	
	$('#navbar a:first').click();
	
	/*$('li').live('click', function(e){*/
	
	$(window.document).on( "click", "li", function(e) {
		
		if($('#details').is(":visible")){
			$('#details').hide();
		}
	
		var src = $(this).find('img').attr('src');
		
		$('#details').html($('<img>',{
			src: src,
			width: '150px',
			height: '150px'
		}));
		
		var details = $('#details');
		var offset = $(this).offset();
		$('#details').css({"left":offset.left-32, "top":offset.top-32}).show(function() {
			$('#details img').animate({
				width: '150px', 
				height: '150px',
			}, 800);
		});
		
	});	

	$("#details").click(function() {
		$("#details").fadeOut();
	});

	
	function createList(text,items){
		var ul = $('<ul>',{'class':'hidden'});
		$.each(items,function(){
			$(this).clone().appendTo(ul);
		});
		ul.appendTo('#container');
		var a = $('<a>',{
			html: text,
			href:'#',
			data: {list:ul}
		}).appendTo('#navbar');
	}
});