import openSocket from 'socket.io-client';

const socket = openSocket(`${process.env.REACT_APP_SOCKET_URL}/system/ws`);

export default socket;
