import { sm2 } from 'sm-crypto';

export const encryptForSM2 = (plainText: string, key: string) => {
  const cipherMode = 1;
  return sm2.doEncrypt(plainText, key, cipherMode);
};

export const decryptForSM2 = (cipherText: string, key: string) => {
  const cipherMode = 1;
  return sm2.doDecrypt(cipherText, key, cipherMode);
};
