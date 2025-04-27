import { io } from 'socket.io-client';

const ENDPOINT = 'http://localhost:3000'; // Adjust if you deploy
const socket = io(ENDPOINT);

export default socket;
