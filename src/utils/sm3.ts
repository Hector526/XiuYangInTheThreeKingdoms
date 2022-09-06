import { sm3 } from 'sm-crypto';

const encryptForSM3 = (plainText: string) => {
  return sm3(plainText);
};

export default encryptForSM3;
