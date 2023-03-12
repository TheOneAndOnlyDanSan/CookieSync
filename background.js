chrome.action.onClicked.addListener(async function() {
	var defaultTab = await chrome.tabs.query({active: true, lastFocusedWindow: true})
	var tabs = await chrome.tabs.query({url: ["https://orteil.dashnet.org/cookieclicker/*", "http://orteil.dashnet.org/cookieclicker/*"]})

	if(tabs.length == 0) {
		if(defaultTab[0].url == "chrome://newtab/") chrome.tabs.update(defaultTab[0].id, {url: "https://orteil.dashnet.org/cookieclicker/"});
		else chrome.tabs.create({url: "https://orteil.dashnet.org/cookieclicker/"});
	} else {
		var tabsWindow = await chrome.tabs.query({url: "https://orteil.dashnet.org/cookieclicker/", lastFocusedWindow: true})
		
		if(tabsWindow.length == 0) {
			chrome.tabs.move(tabs[0].id, {windowId: (await chrome.windows.getCurrent()).id, index: -1});
			chrome.tabs.update(tabs[0].id, {active: true})
		} else {
			chrome.tabs.update(tabs[0].id, {active: true});
		}
	}
});
