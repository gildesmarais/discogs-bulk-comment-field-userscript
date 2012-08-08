// ==UserScript==
// @name			Discogs.com bulk change public-comment-field
// @version			0.1
// @namespace		https://github.com/gill0r/discogs-bulk-comment-field-userscript/
// @description		Allows bulk changing the public-comment-field of your selling items (prepend, suffix and remove text)
// @updateURL		https://raw.github.com/gill0r/discogs-bulk-comment-field-userscript/master/discogs_bulk.user.js
// @include			https://www.discogs.com/sell/manage_edit
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

showMenu();

function showMenu() {

	if (!jQuery) {
		alert("'Bulk change public coment' can not be used. Please file a bug at http://github.com/gill0r/userscripts/");
		return false;
	}
	if ($("#userscript_bulk_menu_closed")) {
		$("#userscript_bulk_menu_closed").slideUp();
		$("userscript_bulk_menu_closed").remove();
	}

	var menuElement = document.createElement('div');
	menuElement.id = 'userscript_bulk_menu';
	menuElement.style.display = 'none';

	var menuHtml = '<h3>"Bulk change public-comment-field" Userscript options</h3><p>Please choose what you want to do:</p><ul>';
	menuHtml += '<li><a id="user_prepend">Prepend text</a></li>';
	menuHtml += '<li><a id="user_suffix" href="javascript:suffixText(null)">Suffix text</a></li>';
	menuHtml += '<li><a id="user_replace" >Replace text</a></li></ul>';
	menuHtml += '<p><a href="https://github.com/gill0r/discogs-bulk-comment-field-userscript/issues">Something is broken? Please file a bug!</a></p>';
	menuHtml += '<p><a id="user_close">Hide the script options</a></p>';

	menuElement.innerHTML = menuHtml;

	$("#page  h2").after(menuElement);

	document.getElementById('user_prepend').addEventListener("click",
			prependText);
	document.getElementById('user_suffix')
			.addEventListener("click", suffixText);
	document.getElementById('user_replace').addEventListener("click",
			replaceText);
	document.getElementById('user_close').addEventListener("click", hideMenu);

	jQuery("#userscript_bulk_menu").slideDown();
}

function hideMenu(event) {
	var menuElement = document.createElement('div');
	menuElement.id = 'userscript_bulk_menu_closed';
	menuElement.innerHTML = '<p><a id="user_reopen">&rarr; Show "Bulk change public-comment-field" Userscript options</a></p>';
	jQuery("#userscript_bulk_menu").after(menuElement);

	document.getElementById('userscript_bulk_menu_closed').addEventListener(
			"click", showMenu);

	$("#userscript_bulk_menu").slideUp().delay(1000).remove();
}

function prependText(event) {
	var text = prompt("Enter the text to prepend");
	if (text == null || text == "")
		return;
	jQuery('textarea[name$="comments"]').each(function(i, e) {
		jQuery(e).val(text + " " + jQuery(e).val());
	});
}

function suffixText(event) {
	var text = prompt("Enter the text to suffix:");
	if (text == null || text == "")
		return;
	jQuery('textarea[name$="comments"]').each(function(i, e) {
		jQuery(e).val(jQuery(e).val() + " " + text);
	});
}

function replaceText(event) {
	var textToReplace = prompt("Enter the text which should be replaced:");
	if (textToReplace == "") {
		alert("You have to enter a text to replace!");
		return false;
	}

	var text = prompt("Enter the text which should be written instead:");
	if (text == null)
		text = "";

	jQuery('textarea[name$="comments"]').each(function(i, e) {
		jQuery(e).val(jQuery(e).val().replace(textToReplace, text));
	});
}
