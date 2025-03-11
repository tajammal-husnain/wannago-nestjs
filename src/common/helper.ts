import * as bcrypt from 'bcrypt';
const hashPassword = async (plainPassword: string) => {
  return await bcrypt.hash(plainPassword, 10);
};

export { hashPassword };
