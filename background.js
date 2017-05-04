var s = chrome.extension.getBackgroundPage(); // used for background debugging -for main console-

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
function addLinkToList(info) { //only one parameter needed - the output. 
	//.linkUrl is used to access the context URL
	//.linkUrl is used to access the context Selection Text AKA - Title
	var links = [];
	chrome.storage.sync.get("unreadList",function(object){
		console.log(object);
		if(object['unreadList'] == null){ // i guess this worked....
			links = [];
			console.log("fixed the null bug!" +"?");
			links = [info.linkUrl];
		}
		else{
			var tempArray = [info.linkUrl];
			links = object['unreadList'].concat(tempArray);
		}

		chrome.storage.sync.set({
        "unreadList": links
    }, function() {
        console.log("added to list");
        //links = []; //clear links once sent to storage //edit- did not need to clear here.
        console.log(links.length);
    });
});
	    

}

//open tabs
chrome.browserAction.onClicked.addListener(function() {
	//console.log(links.length + " Before new page");
		    chrome.tabs.create({
        url: chrome.runtime.getURL("page.html")
    });


    });