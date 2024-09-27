// import asyncHandler from 'express-async-handler';
// import User from '../server/models/user.js';

// export const registerUser = asyncHandler(async (req, res) => {
//     route.post('/signup', async (req, res) => {
//         const { name, email, password } = req.body;
      
//         if (!email || !password) {
//           return res.status(400).json({ message: 'Please enter all fields' });
//         }
      
//         try {
//           const userExists = await User.findOne({ email });
      
//           if (userExists) {
//             return res.status(409).json({ message: 'User already exists' });
//           }
      
//           const passwordHash = await bcrypt.hash(password, 10);
      
//           const startingInfo = {
//             status: '',
//             handle: '',
//             reputation: '',
//             email: '',
//             joined: '',
//             notifications: '',
//             lastSeen: '',
//           };
      
//           const newUser = await User.create({
//             name,
//             email,
//             password: passwordHash, // Ensure the field name matches your schema
//             info: startingInfo,
//             isVerified: false,
//           });
      
//           const userId = newUser._id; // Adjust this according to your ORM/ODM
      
//           jwt.sign(
//             {
//               id: userId,
//               email,
//               info: startingInfo,
//               isVerified: false,
//             },
//             process.env.JWT_SECRET,
//             {
//               expiresIn: '2d',
//             },
//             (err, token) => {
//               if (err) {
//                 return res.status(500).send(err);
//               }
//               res.status(200).json({ token, userId });
//             }
//           );
//         } catch (error) {
//           return res.status(500).json({ message: 'Server Error', error });
//         }
//       });
      
//       // route to login in to website
//       route.post('/login', async (req, res) => {
//         const { email, password } = req.body;
      
//         try {
//           const user = await User.findOne({ email });
      
//           if (!user) {
//             return res.status(409).json({ message: 'User does not exist' });
//           }
      
//           const isMatch = await bcrypt.compare(password, user.password);
      
//           if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//           }
      
//           const userId = user._id; // Adjust this according to your ORM/ODM
      
//           jwt.sign(
//             {
//               id: userId,
//               email: user.email,
//               info: user.info,
//               isVerified: user.isVerified,
//             },
//             process.env.JWT_SECRET,
//             {
//               expiresIn: '2d',
//             },
//             (err, token) => {
//               if (err) {
//                 return res.status(500).send(err);
//               }
//               res.status(200).json({ token, userId });
//             }
//           );
//         } catch (error) {
//           return res.status(500).json({ message: 'Server Error', error });
//         }
//       });


import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../server/models/user.js';

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const startingInfo = {
      status: '',
      handle: '',
      reputation: '',
      email: '',
      joined: '',
      notifications: '',
      lastSeen: '',
    };

    const newUser = await User.create({
      name,
      email,
      password: passwordHash, // Ensure the field name matches your schema
      info: startingInfo,
      isVerified: false,
    });

    const userId = newUser._id;

    jwt.sign(
      {
        id: userId,
        email,
        info: startingInfo,
        isVerified: false,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2d',
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).json({ token, userId });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
});
