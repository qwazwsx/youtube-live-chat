# youtube-live-chat

instead of inputing a channel ID you input a youtube ID of a specific livestream



##below is unaltered from where I forked this from:

A library for get YouTube live chats

## Demo

```js
const YouTube = require('youtube-live-chat');

const yt = new YouTube('CHANNEL_ID_IS_HERE', 'APIKEY_IS_HERE');

yt.on('ready', () => {
	console.log('ready!');
	yt.listen(1000);
});

yt.on('chat', json => {
	console.log(json.snippet.displayMessage);
});

yt.on('error', err => {
	console.log(err);
});
```

## Requirement

- events ^1.1.1
- request ^2.81.0

## Install

```
$ npm install --seve youtube-live-chat
```



## License

[MIT](https://github.com/yuta0801/youtube-live-chat/blob/master/LICENSE)

## Author

[yuta0801](https://github.com/yuta0801)
