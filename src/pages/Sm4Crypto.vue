<template>
  <div class="main-content">
    <el-backtop
      target=".main-content"
      :visibility-height="150"
      :bottom="60"
      :right="20"
    ></el-backtop>
    <el-card class="introduction-card">
      <span>SM4：对称加密，加解密同一密钥。</span>
    </el-card>
    <el-card class="crypto-card" :body-style="{ width: 'calc(100vw - 80px)' }">
      <div class="crypto-button">
        <div>
          <el-button type="primary" @click="handleEncryptClick">加密</el-button>
          <el-button type="primary" @click="handleDecryptClick">解密</el-button>
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
        <el-input v-model="sm4Key" placeholder="SM4密钥" clearable />
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
import { encryptForSM4, decryptForSM4 } from '@/utils/sm4';
import isEmpty from 'lodash/isEmpty';
import useClipboard from 'vue-clipboard3';

import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/src/message.scss';

import { useJsonParseStore } from '@/store/jsonParse';

const jsonParseStore = useJsonParseStore();
const { changeJsonStringStore } = jsonParseStore;

const { toClipboard } = useClipboard();

const sm4Key = ref('0bc3456119abcde11ed20a98765431ab');

const ciphertext = ref('');
const plaintext = ref('');
const handleEncryptClick = () => {
  if (isEmpty(sm4Key.value)) {
    ElMessage.error('请输入SM4秘钥！');
    return;
  }

  if (isEmpty(plaintext.value)) {
    ElMessage.error('请输入明文！');
    return;
  }

  try {
    ciphertext.value = encryptForSM4(plaintext.value, sm4Key.value);
  } catch (error) {
    console.log(error);
    ElMessage.error(error as string);
  }
};
const handleDecryptClick = () => {
  if (isEmpty(sm4Key.value)) {
    ElMessage.error('请输入SM4秘钥！');
    return;
  }

  if (isEmpty(ciphertext.value)) {
    ElMessage.error('请输入密文！');
    return;
  }

  try {
    plaintext.value = decryptForSM4(ciphertext.value, sm4Key.value);
    changeJsonStringStore(plaintext.value);
    ElMessage.success('已解密，请去JSON菜单查看。');
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
  padding: 20px;
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
