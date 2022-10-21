<template>
  <div class="main-content">
    <el-card class="sm-crypto-introduction">
      <div>
        使用sm-crypto库实现加解密。该库存在JAVA版本和小程序版本，通用性强，方便前后端对接。
        <el-link type="primary" href="https://github.com/JuneAndGreen/sm-crypto"
          >sm-crypto教程</el-link
        >
      </div>
    </el-card>
    <el-card class="my-introduction">
      <div>注意事项：</div>
      <ol>
        <li>
          所有密钥，密文，明文均为字符串（string）形式，JSON对象形式需要先JSON.stringify，再传入。
        </li>
        <li>SM2加解密默认是C1C2C3。</li>
      </ol>
    </el-card>
    <el-card class="logic-introduction">
      <div>使用教程</div>
      <ul>
        <li>
          在SM2，SM3，SM4页面进行国密算法操作，可以进行基本加解密。并可以将明文，密文复制到剪切板。
        </li>
        <li>在SM2，SM3，SM4页面解密出明文后，直接进入JSON页面，明文会自动代入。</li>
        <li>在JSON页面点击JSON格式化按钮，可以JSON格式化。右侧一键复制按钮，可将格式化之后的JSON复制到剪切板。</li>
      </ul>
      <!-- <div class="title">安装sm-crypto库：</div>
      <div>yarn add sm-crypto</div>
      <div>yarn add @types/sm-crypto --dev</div>
      <div class="title">调用逻辑(以SM2为例)：</div>
      <div>import { sm2 } from 'sm-crypto';</div>
      <div>export const generateKeyForSM2 = () => {</div>
      <div>&nbsp;&nbsp;return sm2.generateKeyPairHex();</div>
      <div>};</div>
      <div>
        export const encryptForSM2 = (plainText: string, key: string) => {
      </div>
      <div>&nbsp;&nbsp;const cipherMode = 1;</div>
      <div>&nbsp;&nbsp;return sm2.doEncrypt(plainText, key, cipherMode);</div>
      <div>};</div>
      <div>
        export const decryptForSM2 = (cipherText: string, key: string) => {
      </div>
      <div>&nbsp;&nbsp;const cipherMode = 1;</div>
      <div>&nbsp;&nbsp; return sm2.doDecrypt(cipherText, key, cipherMode);</div>
      <div>};</div> -->
    </el-card>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.main-content {
  margin-top: 60px;
  padding: 20px;
  height: calc(100vh - 100px);
  padding: 20px;
  overflow: hidden;
  overflow-y: auto;
  .my-introduction {
    margin-top: 20px;
  }

  .logic-introduction {
    margin-top: 20px;

    .title {
      padding: 10px 0px;
      font-size: 18px;
    }
  }
}
</style>
