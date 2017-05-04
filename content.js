var unclickedLinks;

unclickedLinks = chrome.storage.sync.get({
    "unreadList":[]//put defaultvalues if any
},
function(data) {
   unclickedLinks = data.unreadList;
$.each(unclickedLinks, function (i, item) {
   	var tempUrl = unclickedLinks[i];
	var title;
	console.log(tempUrl);
   	$.ajax({
      url: unclickedLinks[i],
      complete: function(data) {
        //console.log(data.responseText); //url starts with URL=' and ends wih )'"
		if(data.responseText.includes("<title>")){
			//console.log(data.responseText.match(/<title[^>]*>([^<]+)<\/title>/)[1]);
			title = (data.responseText.match(/<title[^>]*>([^<]+)<\/title>/)[1]);
					$( "#unreadList" ).append( '<li><a href = "' + unclickedLinks[i] + '" target="_blank" id = "link">'+title+'</a></li>' ); // add all the stuff

		}
		else{
			$.ajax({
				url: data.responseText.match(/URL='([^<]+)'"/)[1],
				complete: function(data2){
					console.log(data2.responseText.match(/<title[^>]*>([^<]+)<\/title>/)[1]);
					title = (data2.responseText.match(/<title[^>]*>([^<]+)<\/title>/)[1]);
							$( "#unreadList" ).append( '<li><a href = "' + unclickedLinks[i] + '" target="_blank" id = "link">'+title+'</a></li>' ); // add all the stuff

				}
				
			});
		}
      }
	}); // ajax call to get title of website
   
   });
   }
);  





$(document).ready(function(){


$( "#clearButton" ).click( function( event ) {
      console.log("Data Cleared!");
      unclickedLinks = [];
      chrome.storage.sync.set({"unreadList": []});
});


});


