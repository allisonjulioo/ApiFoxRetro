import { verify } from 'jsonwebtoken';
export const isValidToken = (token: string | string[]): boolean => {
  let isValid: boolean = false;
  verify(String(token), String(process.env.SECRET), (err, decoded: any) => {
    if (decoded?.id) {
      isValid = true;
    } else {
      isValid = false;
    }
  });
  return isValid;
};
