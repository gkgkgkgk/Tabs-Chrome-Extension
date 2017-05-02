var s = chrome.extension.getBackgroundPage(); // used for background debugging
//arrays of links
var unclickedLinks = [];
var clickedLinks = [];

//add to list
function addLinkToList(info, linkUrl) {
  unclickedLinks.push(info.linkUrl);      
}

//open tabs
chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({ url: chrome.runtime.getURL("page.html") });
    
    chrome.storage.sync.set({
    "unreadList":unclickedLinks
}, function() {
    console.log("added to list");
});
});

//context menu customization
chrome.contextMenus.create({
 title: "Tab this tab!",
 contexts:["link"],  // ContextType
 onclick: addLinkToList // A callback function
});
