import socketIOClient from 'socket.io-client';

const connect = (userId) => {
	const ENDPOINT = process.env.REACT_APP_SERVER_URL || 'http://127.0.0.1:8080';
	const socket = socketIOClient(ENDPOINT, { query: { userId } });
	return socket;
};

export default connect;
