// Update a particular HTML element with a new value
      function updateHTML(elmId, value) {
        document.getElementById(elmId).innerHTML = value;
      }
      
      // Loads the selected video into the player.
      function loadVideoID(videoID) {
        if(ytplayer) {
          ytplayer.loadVideoById(videoID);
        }
      }

      function loadVideoPL(playlist)
      {
        if(ytplayer){
          ytplayer.loadVideobyId(playlist[Math.floor(Math.random()*playlist.length())])
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
                           "?version=3&enablejsapi=1&playerapiid=player1&autoplay=1", 
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
          loadVideoPL(playlist);
        }
      }

      function loadTitle(title){

        $('#title').html(jQuery('<h2 />').html(title));
      }

      function loadDescription(description){

        $('#description').html(jQuery('<p />').html(linkify(description).replace(/(^|\s)(@\w+)/gm, '$1<a href="http://twitter.com/$2">$2</a>')));
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
          }).done(function( message) {

              youtube = message.feed.entry;
              var title = youtube[0].title.$t;

              var description = youtube[0].media$group.media$description.$t.split("About TEDx")[0];
              description = description.split("In the spirit of ideas worth spreading")[0];
              
              var videoId = youtube[0].media$group.yt$videoid.$t;

              var playlist = []
              for(var i=0;i<25;i++){
                playlist.push(youtube[i].media$group.yt$videoid.$t);
              }
              
              console.log(youtube);
              console.log(title);
              console.log(description);
              console.log(videoId);
              console.log(playlist);              
              
              loadTitle(title);
              loadDescription(description);
              loadVideoID(videoId);
          });

        })
      });

      
      function _run() {
        loadPlayer();
      }
      google.setOnLoadCallback(_run);

