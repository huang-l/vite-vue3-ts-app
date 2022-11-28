<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';
import { getSongDetail } from '@/api/modules/songDetail';
import DetailTop from './DetailTop.vue';
const state = reactive({
  playList: {},
});
onMounted(() => {
  const { id } = useRoute().query;
  if (!id) return;
  getSongDetail(id as string).then((res: any) => {
    if (!res?.playlist) return;
    state.playList = res.playlist;
  });
});
</script>

<template>
  <DetailTop :playList="state.playList" />
</template>

<style></style>
