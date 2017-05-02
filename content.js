$(document).ready(function(){

var unclickedLinks = [];
chrome.storage.sync.get({
    list:[]//put defaultvalues if any
},
function(data) {
   unclickedLinks = data.unreadList;
   $( "#unreadList" ).append( "<li>"+unclickedLinks[0]+"</li>" ); // add all the stuff

   }
);  


});
