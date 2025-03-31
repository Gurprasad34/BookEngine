import User from '../models/User.js'; // Reference your existing User model
import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../services/auth.js';


const resolvers = {
  Query: {
    me: async (_: any, __: any, { user }: any) => {
      if (!user) {
        throw new AuthenticationError('Not authenticated');
      }
      return await User.findById(user._id);
    },
  },
  Mutation: {
    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      const isValid = await user.isCorrectPassword(password);
      if (!isValid) {
        throw new AuthenticationError('Invalid password');
      }

      const token = jwt.sign({ _id: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET_KEY || '', { expiresIn: '1h' });
      return { token, user };
    },

    addUser: async (_: any, { username, email, password }: any) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new AuthenticationError('User already exists');
      }

    
      const newUser = new User({ username, email, password });
      await newUser.save();

      const token = jwt.sign({ _id: newUser._id, email: newUser.email, username: newUser.username }, process.env.JWT_SECRET_KEY || '', { expiresIn: '1h' });
      return { token, user: newUser };
    },

    saveBook: async (_: any, { bookId, authors, description, title, image, link }: any, { user }: any) => {
      if (!user) {
        throw new AuthenticationError('Not authenticated');
      }

      const newBook = { bookId, authors, description, title, image, link };
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $push: { savedBooks: newBook }, $inc: { bookCount: 1 } },
        { new: true }
      );
      return updatedUser;
    },

    removeBook: async (_: any, { bookId }: any, { user }: any) => {
      if (!user) {
        throw new AuthenticationError('Not authenticated');
      }

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $pull: { savedBooks: { bookId } }, $inc: { bookCount: -1 } },
        { new: true }
      );
      return updatedUser;
    },
  },
};

export default resolvers;