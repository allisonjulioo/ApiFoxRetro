import { config } from 'dotenv';
config();
export const generateCode = (length: number): number => {
  let code = '';
  const numbers = '1234567890';
  const numbersLength = numbers.length;
  for (let i = 0; i < length; i++) {
    code += numbers.charAt(Math.floor(Math.random() * numbersLength));
  }
  return parseInt(code, 0);
};
