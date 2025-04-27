// import dotenv from 'dotenv';
// dotenv.config();
// import express from 'express';
// import cors from 'cors';
// import connectDB from './server/config/db.js';
// import mainRoute from './server/routes/main.js';
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());
// app.use(mainRoute);

// connectDB();

// app.listen(PORT, () => {
//   console.log(`Your api is running at http://localhost:${PORT}`);
// });

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './server/config/db.js';
import mainRoute from './server/routes/main.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const httpServer = createServer(app); // Wrap Express with HTTP server for socket.io

connectDB();

// 💡 Inline getId helper for safety
const getId = (obj) => {
  if (!obj) return undefined;
  return obj._id || obj.id;
};

// 🌟 Updated CORS for your frontend (localhost:5173)
app.use(
  cors({
    origin: 'http://localhost:5173', // ✅ Correct frontend origin
    credentials: true,
  })
);

app.use(express.json());

// API Routes
app.use(mainRoute);

// ------------------- Deployment Setup --------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  const frontendBuildPath = path.join(__dirname, '/frontend/build');
  app.use(express.static(frontendBuildPath));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(frontendBuildPath, 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}
// -----------------------------------------------------------

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// 🌟 Set up Socket.io server
const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:5173', // ✅ Correct frontend origin
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('⚡ Connected to socket.io');

  socket.on('setup', (userData) => {
    socket.join(getId(userData));
    socket.emit('connected');
  });

  socket.on('join chat', (roomId) => {
    socket.join(roomId);
  });

  socket.on('new message', (newMessageReceived) => {
    const chat = newMessageReceived.chat;
    if (!chat?.users) return;

    chat.users.forEach((user) => {
      if (getId(user) === getId(newMessageReceived.sender)) return;
      socket.in(getId(user)).emit('message recieved', newMessageReceived);
    });
  });

  socket.off('setup', () => {
    console.log('USER DISCONNECTED');
    socket.leave(getId(userData));
  });
});

// Start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
