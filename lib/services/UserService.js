import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export default class UserService {
  static async create({ email, avatar, password }) {
    const user = await User.findByEmail(email);
    if(user) {
      throw new Error('Email already associated with an account. Log in instead!');
    }
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    return User.insert({ email, avatar, passwordHash });
  }

  static async authorize({ email, password }) {
    // create findByEmail function
    const user = await User.findByEmail(email);
    if(!user) {
      throw new Error('Invalid email and/or password');
    }
    const matchingPasswords = await bcrypt.compare(password, user.passwordHash);
    if(!matchingPasswords) {
      throw new Error('Invalid email and/or password');
    }
    return user;
  }
}
