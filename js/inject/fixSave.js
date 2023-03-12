var save;
var load = false;

window.addEventListener("returnSave", function(event) {
	var sync = event.detail;
	if(sync == null) {
		save = {};
		save["CookieClickerGame"] = localStorage.getItem("CookieClickerGame");
		save["CookieClickerGameBeta"] = localStorage.getItem("CookieClickerGameBeta");
		save["CookieClickerLang"] = localStorage.getItem("CookieClickerLang");
	} else {
		save = sync;
	}
	load = true;
})

window.dispatchEvent(new CustomEvent("getSave"));

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
				window.dispatchEvent(new CustomEvent("setSave", {detail: save}));
			} catch (exception) {}
			return local;
		}
	
	}
}

isLoaded();

