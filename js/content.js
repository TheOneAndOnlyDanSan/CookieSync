var s = document.createElement("script");
s.src = chrome.runtime.getURL("js/inject/fixGame.js");
s.async = false;
s.onload = function () {
	this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);

window.addEventListener("getSave", function() {
	chrome.storage.sync.get("save", function(get) {
		window.dispatchEvent(new CustomEvent("returnSave", {detail: get.save}));
	});
});

window.addEventListener("setSave", async function(event) {	
	await chrome.storage.sync.set({save: event.detail});
});
