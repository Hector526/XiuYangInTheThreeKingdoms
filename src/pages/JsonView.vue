<template>
  <div class="main-content">
    <el-card class="crypto-card" :body-style="{ width: 'calc(100vw - 80px)' }">
      <div>
        <el-input
          v-model="originalText"
          :autosize="{ minRows: 3 }"
          type="textarea"
          placeholder="原文"
        />
      </div>
    </el-card>
    <el-card class="crypto-card" :body-style="{ width: 'calc(100vw - 80px)' }">
      <div>
        <el-button type="primary" @click="handleFormatClick"
          >JSON格式化</el-button
        >
        <el-button type="primary" @click="handleStringClick" plain
          >JSON字符串化</el-button
        >
      </div>
      <div class="json-viewer">
        <json-viewer
          :value="jsonData"
          :expand-depth="5"
          copyable
          boxed
        ></json-viewer>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import JsonViewer from 'vue-json-viewer';
import isEmpty from 'lodash/isEmpty';

import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/src/message.scss';

import { useJsonParseStore } from '@/store/jsonParse';

const jsonParseStore = useJsonParseStore();
const { jsonString } = storeToRefs(jsonParseStore);

const originalText = ref('');
originalText.value = jsonString.value;

const jsonData = ref<any>({
  total: 25,
  limit: 10,
  skip: 0,
  links: {
    previous: undefined,
    next: function () {},
  },
  data: [
    {
      id: '5968fcad629fa84ab65a5247',
      firstname: 'Ada',
      lastname: 'Lovelace',
      awards: null,
      known: ['mathematics', 'computing'],
      position: {
        lat: 44.563836,
        lng: 6.495139,
      },
      description: `Augusta Ada King, Countess of Lovelace (née Byron; 10 December 1815 – 27 November 1852) was an English mathematician and writer,
            chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer,
            the Analytical Engine. She was the first to recognise that the machine had applications beyond pure calculation,
            and published the first algorithm intended to be carried out by such a machine.
            As a result, she is sometimes regarded as the first to recognise the full potential of a "computing machine" and the first computer programmer.`,
      bornAt: '1815-12-10T00:00:00.000Z',
      diedAt: '1852-11-27T00:00:00.000Z',
    },
    {
      id: '5968fcad629fa84ab65a5246',
      firstname: 'Grace',
      lastname: 'Hopper',
      awards: [
        'Defense Distinguished Service Medal',
        'Legion of Merit',
        'Meritorious Service Medal',
        'American Campaign Medal',
        'World War II Victory Medal',
        'National Defense Service Medal',
        'Armed Forces Reserve Medal',
        'Naval Reserve Medal',
        'Presidential Medal of Freedom',
      ],
      known: null,
      position: {
        lat: 43.614624,
        lng: 3.879995,
      },
      description: `Grace Brewster Murray Hopper (née Murray; December 9, 1906 – January 1, 1992)
            was an American computer scientist and United States Navy rear admiral.
            One of the first programmers of the Harvard Mark I computer,
            she was a pioneer of computer programming who invented one of the first compiler related tools.
            She popularized the idea of machine-independent programming languages, which led to the development of COBOL,
            an early high-level programming language still in use today.`,
      bornAt: '1815-12-10T00:00:00.000Z',
      diedAt: '1852-11-27T00:00:00.000Z',
    },
  ],
});
const handleFormatClick = () => {
  if (isEmpty(originalText.value)) {
    ElMessage.error('请输入原文！');
    return;
  }

  try {
    jsonData.value = JSON.parse(originalText.value);
  } catch (error) {
    ElMessage.error('JSON.parse失败！');
  }
  return;
};
const handleStringClick = () => {
  if (isEmpty(jsonData.value)) {
    ElMessage.error('请输入JSON对象！');
    return;
  }

  try {
    originalText.value = JSON.stringify(jsonData.value);
  } catch (error) {
    ElMessage.error('JSON.stringify失败！');
  }
  return;
};
</script>
<style lang="scss" scoped>
.main-content {
  margin-top: 60px;
  padding: 20px;

  .crypto-card {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .json-viewer {
      padding-top: 10px;
    }
  }

  .crypto-card:last-child {
    margin-top: 20px;
  }
}
</style>
