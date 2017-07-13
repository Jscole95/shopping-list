//keeps track of items on the list
var list = {
	items: [],
};

//adds items to the list
function addItem(list, element){
	var prep = '<li>\n<span class="shopping-item">'
	var appe = '</span>\n<div class="shopping-item-controls">\n\
	<button class="shopping-item-toggle">\n\
	<span class="button-label">check</span>\n\
	</button>\n<button class="shopping-item-delete">\n\
	<span class="button-label">delete</span>\n</button>\n\
	</div>\n</li>'
	list.items.push(prep + element.val() + appe);
}

//Resets array and adds each item to the list again
function completeItems(list){
	list.items = [];
	$(".shopping-list li").each(function(){
		list.items.push("<li>" + $(this).html() + "</li>");
	});
}


//Remove items from the list
function deleter(list, index){
	var newlist = [];
	var i = 0;
	list.items.forEach(function(element){
		if (i != index)
			newlist.push(element);
		i++;
	})
	console.log(newlist);
	console.log(list.items);
	list.items = newlist;
}

//Redraw the page with updated list
function change(list){
	$(".shopping-list").empty();
	list.items.forEach(function(item){
		$(".shopping-list").append(item);
	});
}


function start(){
	completeItems(list);
	$("#js-shopping-list-form").submit(function(event){
		event.preventDefault();
		addItem(list, $("#shopping-list-entry"));
		change(list);
	});
	$('ul').on("click", ".shopping-item-toggle", function(event){
		var toggle = ($(this).parent().parent().find("span.shopping-item"));
		toggle.toggleClass("shopping-item__checked");
		completeItems(list);
		change(list);
	});
	$('ul').on("click", ".shopping-item-delete", function(event){
		var index = ($(this).parent().parent().index());
		deleter(list, index);
		change(list);
	});
}




$(function(){
	start();
})
