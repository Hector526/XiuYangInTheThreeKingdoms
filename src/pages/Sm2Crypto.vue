<template>
  <div class="main-content">
    <el-backtop
      target=".main-content"
      :visibility-height="150"
      :bottom="60"
      :right="20"
    ></el-backtop>
    <el-card class="introduction-card">
      <span>SM2：非对称加密，公钥加密，私钥解密。</span>
    </el-card>
    <el-card class="crypto-card" :body-style="{ width: 'calc(100vw - 80px)' }">
      <div class="crypto-button">
        <div>
          <el-button type="primary" @click="handleEncryptClick">加密</el-button>
          <el-button type="primary" @click="handleDecryptClick">解密</el-button>
          <el-button type="primary" plain @click="handleGenerateKeyClick"
            >生成秘钥对</el-button
          >
        </div>
        <div>
          <el-button type="primary" plain @click="handleCopyCiphertext"
            >复制密文到剪切板</el-button
          >
          <el-button type="primary" @click="handleCopyPlaintext"
            >复制明文到剪切板</el-button
          >
        </div>
      </div>
      <div class="crypto-key">
        <el-input v-model="sm2PublicKey" placeholder="SM2公钥" clearable />
        <el-input
          class="crypto-key-last"
          v-model="sm2PrivateKey"
          placeholder="SM2私钥"
          clearable
        />
      </div>
      <div class="crypto-ciphertext">
        <el-input
          v-model="ciphertext"
          :autosize="{ minRows: 6 }"
          type="textarea"
          placeholder="密文"
        />
      </div>
      <div class="crypto-plaintext">
        <el-input
          v-model="plaintext"
          :autosize="{ minRows: 6 }"
          type="textarea"
          placeholder="明文"
        />
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { encryptForSM2, decryptForSM2, generateKeyForSM2 } from '@/utils/sm2';
import isEmpty from 'lodash/isEmpty';
import useClipboard from 'vue-clipboard3';

import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/src/message.scss';

import { useJsonParseStore } from '@/store/jsonParse';

const jsonParseStore = useJsonParseStore();
const { changeJsonStringStore } = jsonParseStore;

const { toClipboard } = useClipboard();

const sm2PublicKey = ref(
  '044da05a540aeedb74407089353643068330ed29b579a051fda68ee534b030b05474a0f008404c6c758614724d194b1eb278738296f759a5302e156222069dea85'
);
const sm2PrivateKey = ref(
  'ac8f3b4b0efb905844115cfeb98d1cec6160648ac2a254c15e30de4c7bdba0e3'
);

const ciphertext = ref('');
const plaintext = ref('');
const handleEncryptClick = () => {
  if (isEmpty(sm2PublicKey.value)) {
    ElMessage.error('请输入SM2公钥！');
    return;
  }

  if (isEmpty(plaintext.value)) {
    ElMessage.error('请输入明文！');
    return;
  }

  try {
    ciphertext.value = encryptForSM2(plaintext.value, sm2PublicKey.value);
  } catch (error) {
    console.log(error);
    ElMessage.error(error as string);
  }
};
const handleDecryptClick = () => {
  if (isEmpty(sm2PrivateKey.value)) {
    ElMessage.error('请输入SM4秘钥！');
    return;
  }

  if (isEmpty(ciphertext.value)) {
    ElMessage.error('请输入密文！');
    return;
  }

  try {
    plaintext.value = decryptForSM2(ciphertext.value, sm2PrivateKey.value);
    changeJsonStringStore(plaintext.value);
    ElMessage.success('已解密，请去JSON菜单查看。');
  } catch (error) {
    console.log(error);
    ElMessage.error(error as string);
  }
};
const handleGenerateKeyClick = () => {
  try {
    const keypair = generateKeyForSM2();
    sm2PublicKey.value = keypair.publicKey;
    sm2PrivateKey.value = keypair.privateKey;
  } catch (error) {
    console.log(error);
    ElMessage.error(error as string);
  }
};
const handleCopyCiphertext = async () => {
  if (isEmpty(ciphertext.value)) {
    return;
  }
  try {
    await toClipboard(ciphertext.value);
    ElMessage.success('复制密文成功!');
  } catch (e) {
    console.log(e);
  }
};
const handleCopyPlaintext = async () => {
  if (isEmpty(plaintext.value)) {
    return;
  }
  try {
    await toClipboard(plaintext.value);
    ElMessage.success('复制明文成功!');
  } catch (e) {
    console.log(e);
  }
};
</script>
<style lang="scss" scoped>
.main-content {
  margin-top: 60px;
  height: calc(100vh - 100px);
  padding: 20px;
  // overflow: hidden;
  overflow: auto;

  .crypto-card {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .crypto-button {
      width: 100%;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
    }
    .crypto-key {
      padding-top: 20px;

      .crypto-key-last {
        margin-top: 20px;
      }
    }

    .crypto-ciphertext {
      padding-top: 20px;
    }

    .crypto-plaintext {
      padding-top: 20px;
    }
  }
}
</style>
