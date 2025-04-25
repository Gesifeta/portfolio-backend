import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate token
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};
// verify token
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};
// generate salt
export const generateSalt = () => {
  return bcrypt.genSaltSync(10);
};
// hash password
export const hashPassword = (password, salt) => {
  return bcrypt.hashSync(password, salt);
};
// compare password
export const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
