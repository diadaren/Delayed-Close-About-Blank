chrome.tabs.onActivated.addListener((activeInfo) => {
	console.log("activeInfo.tabId = " + activeInfo.tabId)
	chrome.tabs.get(activeInfo.tabId, (tab) => {
		if (tab.url === "about:blank") {
			console.log("You switched to a tab that is on 'about:blank', tabId is " + activeInfo.tabId)
			setTimeout(()=>{
					chrome.tabs.get(activeInfo.tabId, (tab) => {
						  if (tab.url === "about:blank") {
							  console.log("tabId " + activeInfo.tabId + " is still on 'about:blank' after 5 seconds, killing")
							  chrome.tabs.remove(activeInfo.tabId);
						  } else {
							  console.log("tabId " + activeInfo.tabId + " has left 'about:blank', nothing to do")
						  }
					});
				},5000);
			}
	});
});

chrome.tabs.onUpdated.addListener((tabId, tab) => {
	if (tab.url === "about:blank") {
		console.log("A tab is on 'about:blank', tabId is " + tabId)
		setTimeout(()=>{
			chrome.tabs.get(tabId, (tab) => {
				  if (tab.url === "about:blank") {
					  console.log("tabId " + tabId + " is still on 'about:blank' after 5 seconds, killing")
					  chrome.tabs.remove(tabId);
				  } else {
					  console.log("tabId " + tabId + " has left 'about:blank', nothing to do")
				  }
			});
        },5000);
	}
});