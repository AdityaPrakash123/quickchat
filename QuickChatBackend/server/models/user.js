import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String, required: true, default: null },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model('User', userSchema);
export default user;
