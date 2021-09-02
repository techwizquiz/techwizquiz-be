import jwt from 'jsonwebtoken';

export default function(req, res, next) {
  const { session } = req.cookies;
  const user = jwt.verify(session, process.env.APP_SECRET);
  req.user = user;
  next();
}
