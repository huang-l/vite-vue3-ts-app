<script setup lang="ts">
import { ref } from 'vue';
const activeKey = ref('my');
</script>

<template>
  <div class="top-nav">
    <van-icon name="wap-nav" />
    <div class="top-center">
      <div :class="activeKey === 'my' ? 'active' : ''">我的</div>
      <div :class="activeKey === 'find' ? 'active' : ''">发现</div>
      <div :class="activeKey === 'cloud' ? 'active' : ''">云村</div>
      <div :class="activeKey === 'video' ? 'active' : ''">视频</div>
    </div>
    <van-icon name="search" />
  </div>
</template>

<style lang="less" scoped>
.top-nav {
  height: 50px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
  .top-center {
    width: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 18px;
  }
  .active {
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
