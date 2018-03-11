# youtube-live-chat

A library for getting YouTube live chats

## Demo

this demo will print all messages and print the amount of messages gotten per refresh of the chat (demo of new chatRefreshed call) 

```js
const YouTube = require('youtube-live-chat');

//NOTE
//you input the id of the youtube video, not the channel
const yt = new YouTube('YOUTUBE_LIVESTREAM_ID', 'APIKEY_IS_HERE');

var chat = [];

yt.on('ready', () => {
	console.log('ready!');
	//fetch messages every 1 sec
	yt.listen(1000);
});

//called every time a new chat comes through
//gets called many times when you first run it
yt.on('chat', json => {
	console.log(json.snippet.displayMessage);
	//add message to array
	chat.push(json.snippet.displayMessage);
});

//called after all messages are passed through from a refresh
yt.on('chatRefreshed', json => {
	//print amount of chats sent
	console.log(chat.length);
	//reset aray
	chat = [];
});


//catch errors
yt.on('error', err => {
	console.log(err);
});
```

## Requirement

- events ^1.1.1
- request ^2.81.0

## Install

```
$ npm install qwazwsx/youtube-live-chat
```



## License

[MIT](https://github.com/yuta0801/youtube-live-chat/blob/master/LICENSE)

## Author

[yuta0801](https://github.com/yuta0801)
