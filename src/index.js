const get = require('request').get;
const EventEmitter = require('event-chains')

var ytInterval;



//sNum selects what livestream from a certain channel to view
//default = 0
//pretty sure its sorted by when the livestreams were started (maybe when they were supposed to start in the case of an event)
//var sNum = 0
//var videoIdDebug = false

var chatRefreshTimeout = 1000;

class YouTube extends EventEmitter {
	constructor(videoId, apiKey) {
		super();
		//this.id = channelId;
		this.key = apiKey;
		//sNum = streamNum;
		this.liveId  = videoId;
		this.getChatId();
	}

	/* //not used
	getLive() {
		
		if (!videoIdDebug){
		get({url: `https://www.googleapis.com/youtube/v3/search?eventType=live&part=id&channelId=${this.id}&type=video&key=${this.key}`, json: true}, (err, res, json) => {
			if (err) {
				this.emit('error', err);
			} else if (res.statusCode != 200) {
				this.emit('error', json);
			} else if (!json.items[0]) {
				this.emit('error', 'Can not find live');
			} else {
				console.log('[INFO] Connected to video id: '+json.items[sNum].id.videoId)
				this.emit('streamsRunning', json.items.length);
				this.liveId = json.items[sNum].id.videoId;
				this.getChatId();
			}
		});
		}else{
			this.liveId = videoIdDebug;
			this.getChatId();

		}
	} */
	

	getChatId() {
		get({url: `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${this.liveId}&key=${this.key}`, json: true}, (err, res, json) => {
			if (err) {
				this.emit('error', err);
			} else if (res.statusCode != 200) {
				this.emit('error', json);
			} else if (!json.items.length) {
				this.emit('error', 'Can not find chat');
			} else {
				this.chatId = json.items[0].liveStreamingDetails.activeLiveChatId;
				//console.log(json.items[0].snippet.title)
				this.emit('ready', null);
			}
		});
	}

	getChat() {
		get({url: `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${this.chatId}&part=authorDetails,snippet&hl=ja&maxResults=2000&key=${this.key}`, json: true}, (err, res, json) => {
			if (err) {
				this.emit('error', err);
			} else if (res.statusCode != 200) {
				this.emit('error', json);
			} else {
				this.emit('json', json);
			}
		});
	}

	listen(timeout) {
		ytInterval = setInterval(()=>{this.getChat()}, timeout);
		let lastRead = 0, item = {}, time = 0;
		this.on('json', json => {
			//chatRefreshTimeout = json.pollingIntervalMillis;
			for (let i=0; i<json.items.length; i++) {
				item = json.items[i];
				time = new Date(item.snippet.publishedAt).getTime();
				if (lastRead < time) {
					lastRead = time;
					this.emit('chat', item);
				}
			}
			this.emit('chatRefreshed','');

		})
		this.on('stop', stopcall => {
			clearInterval(ytInterval);
		});
	}
}

module.exports = YouTube;
