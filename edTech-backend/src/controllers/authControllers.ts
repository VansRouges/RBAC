import { account, ID } from '../config/appwrite';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string; // Ensure this is set in your .env file

// Sign-up Controller
export const signUp = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  try {
    const user = await account.create(ID.unique(), email, password, name);
     // Generate JWT
     const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '8h' });
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      });

    res.status(201).json({ success: true, user, token });
  } catch (error: any) {
    console.error('Sign-up Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login Controller
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const session = await account.createEmailPasswordSession(email, password);

    // Generate JWT without role
    const token = jwt.sign(
      { userId: session.userId, email }, // No role included
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    res.status(200).json({ success: true, token, session });
  } catch (error: any) {
    console.error('Login Error:', error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// Logout Controller
export const logout = async (req: Request, res: Response) => {
  try {
    await account.deleteSession('Current Session ID');
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error: any) {
    console.error('Logout Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
