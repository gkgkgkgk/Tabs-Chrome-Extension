$(document).ready(function(){

var unclickedLinks = [];

chrome.storage.sync.get({
    "unreadList":[]//put defaultvalues if any
},
function(data) {
   unclickedLinks = data.unreadList;
   for(var i = 0; i < unclickedLinks.length; i++){//add everything in list
   $( "#unreadList" ).append( "<li>"+unclickedLinks[i]+"</li>" ); // add all the stuff
   }
   }
);  


});

$( "#clearButton" ).click( function( event ) {
      console.log("Data Cleared!");
      unclickedLinks = [];
      chrome.storage.sync.set({"unreadList": null});
});