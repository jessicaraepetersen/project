// #############################################################################
// Sort album list options

$('#sort-by-artist-name').click(function(evt) {
    $('#album-name-sort').addClass('hidden');
    $('#release-date-sort').addClass('hidden');
    $('#artist-name-sort').removeClass('hidden');
    $('.sort-color').html("Artist Name");
});


$('#sort-by-album-name').click(function(evt) {
    $('#artist-name-sort').addClass('hidden');
    $('#release-date-sort').addClass('hidden');
    $('#album-name-sort').removeClass('hidden');
    $('.sort-color').html("Album Name");
});

$('#sort-by-release-date').click(function(evt) {
    $('#album-name-sort').addClass('hidden');
    $('#artist-name-sort').addClass('hidden');
    $('#release-date-sort').removeClass('hidden');
    $('.sort-color').html("Release Date");
});


// #############################################################################
// Change play button to pause button or vice versa

$('.play-btn').click(function(evt) {
    $(this).toggleClass('pause-btn');
});


// #############################################################################
// Remove div album card upon clicking the x button


$('.x-btn').click(function(evt) {
    var album_id = $(this).data('albumId');
    $('.card' + album_id ).remove();
});


// #############################################################################
// A user can add all the tracks of an album to one of their playlists of choice
// and a message will appear at the top of the html page alerting the user of the
// event.


function showFlashMessage(result) {
    album_name = result['album_name']
    playlist_name = result['playlist_name']

    album_name = truncate(album_name, 19);
    playlist_name = truncate(playlist_name, 13);

    $('#album-added-message').html(album_name + ' was added to ' + playlist_name + '.')
    $("#album-added-box").fadeIn(250);
    setTimeout(function() {$('#album-added-box').fadeOut(250);}, 3000);
}


function addAlbumToPlaylist(evt) {
    evt.preventDefault();

    var playlist_id = $(this).data('playlistId');
    var album_id = $(this).data('albumId');


    $.post('/add-to-playlist',
           {'playlist_id': playlist_id, 'album_id': album_id},
           showFlashMessage);
}


$('.playlist-choice').click(addAlbumToPlaylist);


function truncate(name, num) {
    if (name.length > num) {
        return name.slice(0, num) + '...';
    } else {
        return name;
    }
}









