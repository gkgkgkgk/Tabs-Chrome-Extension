var unclickedLinks;

unclickedLinks = chrome.storage.sync.get({
        "unreadList": [] //put defaultvalues if any
    },
    function(data) {
        unclickedLinks = data.unreadList;
        $.each(unclickedLinks, function(i, item) {
            var tempUrl = unclickedLinks[i];
            var title;
            //console.log(tempUrl);
            $.ajax({
                url: unclickedLinks[i],
                complete: function(data) {
                    //console.log(data.responseText); //url starts with URL=' and ends wih )'"
                    if (data.responseText.includes("<title>")) {
                        //console.log(data.responseText.match(/<title[^>]*>([^<]+)<\/title>/)[1]);
                        title = (data.responseText.match(/<title[^>]*>([^<]+)<\/title>/)[1]);
                        $("#unreadList").append('<li><a href = "' + unclickedLinks[i] + '" target="_blank" class = "link">' + title + '</a></li>'); // add all the stuff

                    } else {
                        $.ajax({
                            url: data.responseText.match(/URL='([^<]+)'"/)[1],
                            complete: function(data2) {
                                console.log(data2.responseText.match(/<title[^>]*>([^<]+)<\/title>/)[1]);
                                title = (data2.responseText.match(/<title[^>]*>([^<]+)<\/title>/)[1]);
                                $("#unreadList").append('<li><a href = "' + unclickedLinks[i] + '" target="_blank" class = "link">' + title + '</a></li>'); // add all the stuff

                            }

                        });
                    }
                }
            }); // ajax call to get title of website

        });
    }
);

var clickedLinksFinal;
var clickedLinks;

clickedLinksFinal = chrome.storage.sync.get("readList",
        function(object) {
        	console.log(object);
        	if (object['readList'] != null) {
                clickedLinks = readList;
                $.each(clickedLinks, function(i, item) {
                    var tempUrl = clickedLinks[i];
                    var title;
                    //console.log(tempUrl);
                    $.ajax({
                        url: clickedLinks[i],
                        complete: function(readData) {
                            console.log(data.responseText); //url starts with URL=' and ends wih )'"
                            if (readData.responseText.includes("<title>")) {
                                //console.log(data.responseText.match(/<title[^>]*>([^<]+)<\/title>/)[1]);
                                title = (readData.responseText.match(/<title[^>]*>([^<]+)<\/title>/)[1]);
                                $("#readList").append('<li><a href = "' + clickedLinks[i] + '" target="_blank" class = "link">' + title + '</a></li>'); // add all the stuff

                            } else {
                                $.ajax({
                                    url: readData.responseText.match(/URL='([^<]+)'"/)[1],
                                    complete: function(readData2) {
                                        console.log(readData2.responseText.match(/<title[^>]*>([^<]+)<\/title>/)[1]);
                                        title = (readData2.responseText.match(/<title[^>]*>([^<]+)<\/title>/)[1]);
                                        $("#readList").append('<li><a href = "' + clickedLinks[i] + '" target="_blank" class = "link">' + title + '</a></li>'); // add all the stuff

                                    }

                                });
                            }
                        }
                    }); // ajax call to get title of website
					
                });
        	}
            }
        );



        $(document).ajaxStop(function() {

            $(".link").click(function(event) {
                //console.log("Link Clicked!"); // ok this works - wasnt working before because the ajax calls were
                //async and doc.ready loaded the event handlers before the links were appended to doc
                var links = [];
                var linkUrl = $(this).attr("href");
                console.log(linkUrl);
                chrome.storage.sync.get("readList",function(object){
		if(object['readList'] == null){ // i guess this worked....
			links = [];
			console.log("fixed the null bug!" +"?");
			links = [linkUrl];
		}
		else{
			var tempArray = [linkUrl];
			links = object['readList'].concat(tempArray);
		}

		chrome.storage.sync.set({
        "readList": links
    }, function() {
        console.log("added to read list");
    });
});

            });



        });

        $(document).ready(function() {

            $("#clearButton").click(function(event) {
                console.log("Data Cleared!");
                unclickedLinks = [];
                chrome.storage.sync.set({
                    "unreadList": []
                });
                chrome.storage.sync.set({
                    "readList": []
                });
            });

        });