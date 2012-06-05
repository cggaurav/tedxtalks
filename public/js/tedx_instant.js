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
  // var searchBox=$('#searchBox');searchBox.keyup(doInstantSearch);
  // $(document.documentElement).keydown(onKeyDown);
  // $('#buttonControl').click(playPause);
  // $('#linkUrl').click(function(e){
  //   $(this).select();});
  //   onBodyLoad();doInstantSearch();
  }

function onPlayerStateChange(newState){
  playerState=newState;
  console.log(playerState);
  if(playerState == 0)
  { 
    // loadVideoPL(playlist);
  }
}

function loadPlaylists(playlist,titles){

  for(var i=1;i<=6;i++)
  {
    var id="#" + i;
    var thumbnail = getThumbnail(playlist[i-1],"small");
    console.log(id);
    console.log(thumbnail);
    $(id).html(jQuery('<td />').html(titles[i-1].substring(0,40) + "..." + '<img src="' + thumbnail + '">'));
  }
}

jQuery(document).ready(function($) {
  
  //twitter links
  $('input#target').on('keydown', function() { 
    var query = $(this).val();
    console.log($(this).val()); 
    $.ajax({
      type: "GET",
      url: "https://gdata.youtube.com/feeds/api/videos",
      data: { alt: "json", q: query, author: 'tedxtalks', v : '2'}
    }).done(function(message) {
      if(message.feed.title.$t.split('YouTube Videos matching query: ')[1]==query){
        youtube = message.feed.entry;

        var playlist = [];
        var titles = [];
        var descriptions = [];
        for(var i=0;i<10;i++){
          titles.push(youtube[i].title.$t);
          playlist.push(youtube[i].media$group.yt$videoid.$t);
          descriptions.push(youtube[i].media$group.media$description.$t.split("About TEDx")[0].split("In the spirit of ideas worth spreading")[0]);
        }
        loadVideoID(playlist[0],titles[0],descriptions[0]);
        loadPlaylists(playlist,titles);
      }
    });

  })
});

google.setOnLoadCallback(loadPlayer);

