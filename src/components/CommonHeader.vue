<template>
  <el-header v-menus:right="menus" height="60px" class="header">
    <el-avatar shape="circle" :size="48" fit="fill" :src="logo" alt="" />
    <span class="header-title">国密算法JS版加解密工具</span>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      background-color="#2a598a"
      text-color="#fff"
      active-text-color="#66b1ff"
      @select="handleSelect"
    >
      <el-menu-item index="Sm2Crypto">SM2</el-menu-item>
      <el-menu-item index="Sm4Crypto">SM4</el-menu-item>
      <el-menu-item index="Sm3Crypto">SM3</el-menu-item>
      <el-menu-item index="JsonView">JSON</el-menu-item>
      <el-menu-item index="About">关于</el-menu-item>
    </el-menu>
  </el-header>
</template>
<script setup lang="ts">
import logo from '@/assets/header-logo.jpg';
import { directive as vMenus } from 'vue3-menus';
import { invoke } from '@tauri-apps/api';

const route = useRoute();
const router = useRouter();

const activeIndex = ref(route.name as string);
const handleSelect = (key: string) => {
  router.push({
    path: `/${key}`,
  });
};

const closeThisProgram = () => {
  invoke('exit_program');
};
const menus = shallowRef({
  menus: [
    {
      label: '关闭程序',
      click: closeThisProgram,
    },
  ],
});
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: #2a598a;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  user-select: none;

  .header-title {
    margin-left: 20px;
    font-size: 26px;
    color: #ffffff;
    line-height: 60px;
  }
  .el-menu-demo {
    margin-left: 20px;
  }
  .header-button {
    align-self: flex-end;
    margin-right: 20px;
  }
}
</style>
