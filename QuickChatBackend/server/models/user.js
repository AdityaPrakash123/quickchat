// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     profilePic: { type: String, default: null },
//   },
//   {
//     timestamps: true,
//   }
// );

// const user = mongoose.model('User', userSchema);
// export default user;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: null },
    info: {
      status: { type: String, default: 'offline' }, // Default to 'offline'
      joined: { type: Date, default: Date.now }, // Automatically set to account creation time
      lastSeen: { type: Date, default: Date.now }, // Default to the same as `joined`
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  }
);

const user = mongoose.model('User', userSchema);
export default user;
