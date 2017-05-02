var s = chrome.extension.getBackgroundPage(); // used for background debugging

var links = [];

// wipe the context menu so no duplicates
chrome.contextMenus.removeAll(function() {
    //context menu customization
    chrome.contextMenus.create({
        title: "Tab this tab!",
        contexts: ["link"], // ContextType
        onclick: addLinkToList // A callback function
    });
});

//add to list
function addLinkToList(info, linkUrl) {
    links.push(info.linkUrl);
}

//open tabs
chrome.browserAction.onClicked.addListener(function() {
	chrome.storage.sync.set({
        "unreadList": links
    }, function() {
        console.log("added to list");
        links = []; //clear links once sent to storage
        console.log(links.length);
    });
    chrome.tabs.create({
        url: chrome.runtime.getURL("page.html")
    });

    });