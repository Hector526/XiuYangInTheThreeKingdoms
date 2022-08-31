<script setup lang="ts"></script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="el-fade-in-linear">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background: #edf9fa;
  cursor: default;
}

#app {
  font-family: 'SourceHanSans-Regular', 'SourceHanSans-Bold',
    'SourceHanSans-Medium', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #313131;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 5px;
}
</style>
