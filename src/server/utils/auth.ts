import bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
