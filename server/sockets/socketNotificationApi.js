const io = require('socket.io')();
const socketApi = { io };

socketApi.sockets = [];

socketApi.io.on('connect', (socket) => {
	const { userId } = socket.handshake.query;
	socket.userId = userId;
	socket.on('disconnect', () => {
		socketApi.sockets.splice(socketApi.sockets.indexOf(socket), 1);
		console.log(`User ${socket.userId} disconnected`);
	});
	socketApi.sockets.push(socket);
});

socketApi.emitTweetLikeNotification = (ownedBy, username, tweetId) => {
	console.log('emitting tweet like1');
	const socket = socketApi.sockets.find((curr) => curr.userId == ownedBy);
	if (socket) {
		socket.emit('tweet liked', { username, tweetId });
	} //else you want to set a notification for the user, but don't need to emit the event
};

module.exports = socketApi;
