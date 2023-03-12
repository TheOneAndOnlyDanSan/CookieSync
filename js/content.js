var s = document.createElement("script");
s.src = chrome.runtime.getURL("js/inject/fixSave.js");
s.async = false;
s.onload = function () {
	this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);

window.addEventListener("getSave", function(event) {
	chrome.storage.sync.get(event.detail, function(get) {
		window.dispatchEvent(new CustomEvent("returnSave", {detail: get[event.detail]}));
	});
});

window.addEventListener("setSave", async function(event) {	
	await chrome.storage.sync.set(event.detail);
});

window.addEventListener("showAll", async function(event) {	
	console.log(await chrome.storage.sync.get(null));
});

window.addEventListener("clear", async function(event) {	
	console.log(await chrome.storage.sync.clear());
});

