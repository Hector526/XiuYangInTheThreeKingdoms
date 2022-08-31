import { sm4 } from 'sm-crypto';

export const encryptForSM4 = (plainText: string, key: string) => {
  return sm4.encrypt(plainText, key);
};

export const decryptForSM4 = (cipherText: string, key: string) => {
  return sm4.decrypt(cipherText, key);
};
