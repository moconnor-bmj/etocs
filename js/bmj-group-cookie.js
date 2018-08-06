$(window).load(function (){
	bmjCookiePolicyPopUp('cookie-holder');
});
function bmjCookiePolicyPopUp(globalNavDiv) {
	
	var cookiePolicyHtml = '<div class="bmj-cookie-noticebar-content"><span class="cookie-notice">'
			+ 'This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies.'
			+ ' <a id="bmj-cookie-link" target="_blank" href="https://www.bmj.com/company/your-privacy/" title="Read our privacy policy">'
			+ 'Find out more here.</a></span><span class="hide-bar">&times;</span></div>';
	
	if (getBMJCookie('BMJ-cookie-policy') != null) {
		if (getBMJCookie('BMJ-cookie-policy') == 'open') {
			$('div#'+globalNavDiv+':first').after(cookiePolicyHtml);
			setBMJCookie('BMJ-cookie-policy', 'open', '365');
		} else {
			setBMJCookie('BMJ-cookie-policy', 'close', '365');
		}
	} else {
		$('div#'+globalNavDiv+':first').after(cookiePolicyHtml);
		setBMJCookie('BMJ-cookie-policy', 'open', '365');
	}

	$('.bmj-cookie-noticebar-content,.bmj-cookie-noticebar-content .hide-bar').on('click', function() {
		$('div.bmj-cookie-noticebar-content').animate({opacity: 0}, 1900, "easeInOutBounce");
		setTimeout(function() {
			$('div.bmj-cookie-noticebar-content').hide();
		}, 1300);
		setBMJCookie('BMJ-cookie-policy', 'close', '365');
		return true;
	});
	$('.bmj-cookie-noticebar-content #bmj-cookie-link').on('click', function() {
		$('div.bmj-cookie-noticebar-content').animate({opacity: 0}, 1900, "easeInOutBounce");
		setTimeout(function() {
			$('div.bmj-cookie-noticebar-content').hide();
		}, 1300);
		setBMJCookie('BMJ-cookie-policy', 'close', '365');
		return true;
	});
}

function setBMJCookie(name, value, days) {	
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	} 

	var holder = window.location.hostname.split('.');
	var l = holder.length;
	var crossDomain = holder[l - 2];

	document.cookie = name + "=" + value + expires + "; domain=." + crossDomain
			+ ".com;path=/";
}

function getBMJCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for ( var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')
			c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function deleteBMJCookie(name) {
	setCookie(name, "", -1);
}