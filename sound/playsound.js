function getFlashMovieObject(movieName) {
  if (window.document[movieName]) {
      return window.document[movieName];
  }
  if (navigator.appName.indexOf("Microsoft Internet")==-1) {
    if (document.embeds && document.embeds[movieName])
      return document.embeds[movieName]; 
  } else {
    return document.getElementById(movieName);
  }
}

var eventList = new Array();
function nextSoundEvent() {
	if (eventList.length) {
		var flash = getFlashMovieObject('playsound');
		var readyValue = null;
		try {
        	readyValue = flash.GetVariable('ready');
		} catch(e) {
			window.setTimeout(nextSoundEvent, 150);
			return;
		}
		try {
			if (!parseInt(readyValue)) {		
				window.setTimeout(nextSoundEvent, 150);
				return;
			}
			flash.SetVariable('ready', 0);
			var event = eventList[0];
			eventList = eventList.slice(1);
			if (event.type == 'play') {
				flash.SetVariable('soundID', event.id);
				flash.SetVariable('looping', event.loop ? 1 : 0);
				flash.SetVariable('soundURL', event.url);
			} else {
				flash.SetVariable('stopID', event.id);
			}
		} catch(e) {
			return;
		}
	}
}

function playSound(url,id,loop) {
	eventList.push({
		"type": 'play',
		"url": url,
		"id": id,
		"loop": loop
	});
	nextSoundEvent();
}

function stopSound(id) {
	eventList.push({
		"type": 'stop',
		"id": id
	});
	nextSoundEvent();
}