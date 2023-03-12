var url = window.location.href;
var save;
var load = false;

window.addEventListener("returnSave", function(event) {
	var sync = event.detail;
	if(sync == null) {
		save = {};
		if(!url.endsWith("beta/")) save["CookieClickerGame"] = localStorage.getItem("CookieClickerGame");
		else save["CookieClickerGameBeta"] = localStorage.getItem("CookieClickerGameBeta");	
		save["CookieClickerLang"] = localStorage.getItem("CookieClickerLang");
	} else {
		save = sync;
	}
	load = true;
})

window.dispatchEvent(new CustomEvent("getSave", {detail: url}));

var isLoaded = function() {
    if(load === false) {
       window.setTimeout(isLoaded, 50);
    } else {
		
		localStorageGet = function(key) {
			return save[key] ?? 0;
		}
		
		localStorageSet = function(key, str) {
			var local=0;
			try {
				local = window.localStorage.setItem(key, str);
				save[key] = str;
				var saveUrl = {};
				saveUrl[url] = save;
				window.dispatchEvent(new CustomEvent("setSave", {detail: saveUrl}));
			} catch (exception) {}
			return local;
		}
		
	}
}

isLoaded();

