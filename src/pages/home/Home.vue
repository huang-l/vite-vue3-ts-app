<script setup lang="ts">
import { useCountStore } from '../../store';
const store = useCountStore();
const increase = () => {
  // store.count++;
  store.$patch({
    count: store.count + 1,
  });
};
</script>

<template>
  <div class="home-wrapper">
    首页{{ store.count }}<button @click="increase">按钮</button>
  </div>
</template>

<style scoped>
.home-wrapper {
  height: 20px;
  font-size: 20px;
}
</style>
