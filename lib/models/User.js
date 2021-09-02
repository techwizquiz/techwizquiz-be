import pool from '../utils/pool.js';
import jwt from 'jsonwebtoken';

export default class User {
  id;
  email;
  avatar;
  passwordHash;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.avatar = row.avatar;
    this.passwordHash = row.password_hash;
  }

  static async insert({ email, avatar, passwordHash }) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, avatar, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [email, avatar, passwordHash]
    )
    return new User(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    if (!rows[0]) return null;
    return new User(rows[0])
  }

  authToken() {
    const json = { ...this };
    delete json.passwordHash;
    return jwt.sign({ user: { ...json }}, process.env.APP_SECRET, {
      expiresIn: '24h',
    });
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      avatar: this.avatar
    };
  }
}
