// Update a particular HTML element with a new value
function updateHTML(elmId, value) {
  document.getElementById(elmId).innerHTML = value;
}

// Loads the selected video into the player.
function loadVideoID(videoID,title,description) {
  if(ytplayer) {
    ytplayer.loadVideoById(videoID);
    $('#title').html(jQuery('<h2 />').html(title));
    $('#description').html(jQuery('<p />').html(linkify(description).replace(/(^|\s)(@\w+)/gm, '$1<a href="http://twitter.com/$2">$2</a>')));
  }
}

function loadVideoPL(playlist)
{
  if(ytplayer){
    ytplayer.loadVideobyId(playlist[Math.floor(Math.random()*6)])
  }
}

function getThumbnail(videoId,size)
{
  if(size == "small"){
    return "http://img.youtube.com/vi/"+videoId+"/2.jpg";
  }
  else {
    return "http://img.youtube.com/vi/"+videoId+"/0.jpg";
  }
}

// This function is called when an error is thrown by the player
function onPlayerError(errorCode) {
  alert("An error occured of type:" + errorCode);
}

// The "main method" of this sample. Called when someone clicks "Run".
function loadPlayer() {

  // letting.js
  $("#logo h1").lettering('words');

  // The video to load
  var videoID = "K3wXI82Y8_0"
  // Lets Flash from another domain call JavaScript
  var params = { allowScriptAccess: "always" };
  // The element id of the Flash embed
  var atts = { id: "ytPlayer" };
  // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
  swfobject.embedSWF("http://www.youtube.com/v/" + videoID + 
                     "?version=3&enablejsapi=1&playerapiid=player1", 
                     "play", "600", "430", "9", null, null, params, atts);
}

function onYouTubePlayerReady(playerId){
  ytplayer=document.getElementById("ytPlayer");
  ytplayer.addEventListener("onStateChange","onPlayerStateChange");

}

function onPlayerStateChange(newState){
  playerState=newState;
  console.log(playerState);
  if(playerState == 0)
  { 
    // loadVideoPL(playlist);
  }
}

function loadPlaylists(playlist,titles,descriptions){

  for(var i=1;i<=6;i++)
  {
    var id="#" + i;
    var idid = i*10+i;
    var thumbnail = getThumbnail(playlist[i-1],"small");
    console.log(idid);
    console.log(thumbnail);
    $(id).html('<td id="' + idid + '" title ="' + titles[i-1] + '" description="' + descriptions[i-1] + 'ytID="' + playlist[i-1] + '">' + titles[i-1].split("-")[1].substring(0,30) + ".." + '<img src="' + thumbnail + '">');
  }
}

jQuery(document).ready(function($) 
{
    $('input#target').on('keydown', function() { 
      var query = $(this).val();
      console.log($(this).val()); 
      $.ajax({
        type: "GET",
        url: "https://gdata.youtube.com/feeds/api/videos",
        data: { alt: "json", q: query, author: 'tedxtalks', v : '2'},

        success: function(message)
        {
          if(message.feed.title.$t.split('YouTube Videos matching query: ')[1]==query)
          {
            youtube = message.feed.entry;
            var playlist = [];
            var titles = [];
            var descriptions = [];
            for(var i=0;i<10;i++)
            {
              titles.push(youtube[i].title.$t);
              playlist.push(youtube[i].media$group.yt$videoid.$t);
              descriptions.push(youtube[i].media$group.media$description.$t.split("About TEDx")[0].split("In the spirit of ideas worth spreading")[0]);
            }
            loadVideoID(playlist[0],titles[0],descriptions[0]);
            loadPlaylists(playlist,titles,descriptions);
          }
      }
    });
  });

  $('#1').on('click', function() { 
    var title = $("#11").attr('title'); 
    var description = $("#11").attr('description'); 
    var videoId = $("#11").attr('ytID');
    loadVideoID(videoId,title,description); });
  $('#2').on('click', function() { 
    var title = $("#22").attr('title'); 
    var description = $("#22").attr('description'); 
    var videoId = $("#22").attr('ytID');
    loadVideoID(videoId,title,description); });
  $('#3').on('click', function() { 
    var title = $("#33").attr('title'); 
    var description = $("#33").attr('description'); 
    var videoId = $("#33").attr('ytID');
    loadVideoID(videoId,title,description); });
  $('#4').on('click', function() { 
    var title = $("#44").attr('title'); 
    var description = $("#44").attr('description'); 
    var videoId = $("#44").attr('ytID');
    loadVideoID(videoId,title,description); });
  $('#5').on('click', function() { 
    var title = $("#55").attr('title'); 
    var description = $("#55").attr('description'); 
    var videoId = $("#55").attr('ytID');
    loadVideoID(videoId,title,description); });
  $('#6').on('click', function() { 
    var title = $("#66").attr('title'); 
    var description = $("#66").attr('description'); 
    var videoId = $("#66").attr('ytID');
    loadVideoID(videoId,title,description); });

});

google.setOnLoadCallback(loadPlayer);

