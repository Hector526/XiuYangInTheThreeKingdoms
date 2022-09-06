<template>
  <div class="main-content">
    <el-card class="introduction-card">
      <span>SM3：哈希。</span>
    </el-card>
    <el-card class="crypto-card" :body-style="{ width: 'calc(100vw - 80px)' }">
      <div class="crypto-button">
        <el-button type="primary" @click="handleEncryptClick">哈希</el-button>
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
import encryptForSM3 from '@/utils/sm3';
import isEmpty from 'lodash/isEmpty';

import { ElMessage, ElLoading } from 'element-plus';
import 'element-plus/theme-chalk/src/message.scss';
import 'element-plus/theme-chalk/src/loading.scss';

const ciphertext = ref('');
const plaintext = ref('');
const handleEncryptClick = () => {
  if (isEmpty(plaintext.value)) {
    ElMessage.error('请输入明文！');
    return;
  }

  try {
    ciphertext.value = encryptForSM3(plaintext.value);
  } catch (error) {
    console.log(error);
    ElMessage.error(error as string);
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
