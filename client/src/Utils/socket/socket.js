import socketIOClient from 'socket.io-client';

const connect = (userId) => {
	const ENDPOINT = 'http://127.0.0.1:3001';
	console.log(userId);
	const socket = socketIOClient(ENDPOINT, { query: { userId } });
	return socket;
};

export default connect;
