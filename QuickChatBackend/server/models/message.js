import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatModel' },
  },
  {
    timestamps: true,
  }
);

const message = mongoose.model('Message', messageSchema);
export default message;
