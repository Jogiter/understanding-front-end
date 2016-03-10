var getReferrer = function() {
    var referrer = '';

    try {
        referrer = window.top.document.referrer;
    } catch (e) {
        if (window.parent) {
            try {
                referrer = window.parent.document.referrer;
            } catch (e2) {
                referrer = '';
            }
        }
    }
    if (referrer === '') {
        referrer = document.referrer;
    }
    return referrer;
};


window.onload = load;

/** back in Firefox history, javascript won't run
 * Set an empty function to be called on window.onunload:
 */

window.onunload = unload;
window.onpageshow / window.onpagehide
// detect window tab show or hidden(mini the window)
document.visibilityState
document.hidden