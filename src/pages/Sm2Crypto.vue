<template>
  <div class="main-content">
    <el-card class="introduction-card">
      <span>SM2：非对称加密，公钥加密，私钥解密。</span>
    </el-card>
    <el-card class="crypto-card" :body-style="{ width: 'calc(100vw - 80px)' }">
      <div class="crypto-button">
        <el-button type="primary" @click="handleEncryptClick">加密</el-button>
        <el-button type="primary" @click="handleDecryptClick">解密</el-button>
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
import { encryptForSM2, decryptForSM2 } from '@/utils/sm2';
// import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';

import { ElMessage, ElLoading } from 'element-plus';
import 'element-plus/theme-chalk/src/message.scss';
import 'element-plus/theme-chalk/src/loading.scss';

const sm2PublicKey = ref('');
const sm2PrivateKey = ref('');
// const sm4Key = ref('');

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
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="scss" scoped>
.main-content {
  margin-top: 60px;
  padding: 20px;

  .crypto-card {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

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
