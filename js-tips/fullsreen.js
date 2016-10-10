function toggleFullScreen() {
	if (!document.fullscreenElement && // alternative standard method
		!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) { // current working methods
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.msRequestFullscreen) {
			document.documentElement.msRequestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
}

function getStylable(style) {
    var vendors = ['webkit', 'moz', 'ms', 'o', ''],
        styles = document.documentElement.style,
        i = 0,
        vendorStyle,
        length = vendors.length,
        stylable;

    while (i < length) {
        vendorStyle = vendors[i] ? vendors[i] + style.substr(0, 1).toUpperCase() + style.substr(1) : vendors[i];
        if (vendorStyle in styles) {
            stylable = vendorStyle;
            break;
        }
        i++;
    }
    return stylable;
}
getStylable('requestFullscreen');

/**
 * test
document.onkeydown = toggleFullScreen;
document.querySelector('h2').onclick = toggleFullScreen;
*/