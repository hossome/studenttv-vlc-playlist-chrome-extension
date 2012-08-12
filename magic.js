/**
 * StudentTV VLC Playlist
 * http://api.studenttv.sk/vlcplaylist/
 *
 * Copyright (c) 2011 Cifro Nix (about.me/Cifro)
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

$(function(){

	formatDuration = function(s){
		return Math.round(s / 60) + " min";
	}

	$.ajaxSetup({
		url: 'http://api.studenttv.sk/vlcplaylist/v1?from=chrome-ext',
		dataType: "json",
		type: 'GET',
	});

	var $canvas = $('#canvas');

	$.ajax({
		success: function(data){

			if(data.ads != undefined){
				var $ads = $('<div/>', {
					id: 'ads',
				})
				$canvas.before($ads);
				$('#ads-template').tmpl(data.ads).appendTo($ads);
			}

			var channels = [];

			for(ch in data.channels){
				channels.push(data.channels[ch]);
			}
			$('#channel-template').tmpl(channels).appendTo($canvas);

		},

		error: function(data){
			var json = JSON.parse(data.responseText);

			if(json.error.code == 404){
				json.error.errorClass = 'error-404';
			}else if(json.error.code == 403){
				json.error.errorClass = 'error-403';
			}

			$('#error-template').tmpl(json.error).appendTo($canvas);
		}
	});
});