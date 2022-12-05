<script setup lang="ts">
import { usePlayListStore } from "@/store";
import { reactive, ref, watch, onMounted } from "vue";
const store = usePlayListStore();
const state = reactive({
  playInfo: <{ id: number; name: string; picUrl: string }>{},
});
const audio: any = ref(null);
watch(
  [() => store.state.playList, () => store.state.playIndex],
  ([newList, newIndex]) => {
    state.playInfo = newList[newIndex];
    if (audio.value) {
      if (audio.value.paused) {
        audio.value.play();
        store.changeIsPlay(true);
      }
      audio.value.currentTime = 0;
      audio.value.autoplay = true;
    }
  },
  { immediate: true, deep: true }
);
onMounted(() => {
  store.changeIsPlay(false);
  if (audio.value) {
    audio.value.addEventListener("ended", () => {
      const index =
        store.state.playIndex === store.state.playList.length - 1
          ? 0
          : store.state.playIndex + 1;
      store.changePlayIndex(index);
    });
  }
});
const startPlay = () => {
  if (audio.value) {
    if (audio.value.paused) {
      audio.value.play();
      store.changeIsPlay(true);
    } else {
      audio.value.pause();
      store.changeIsPlay(false);
    }
  }
};
</script>

<template>
  <div class="footer" v-if="state.playInfo">
    <div class="footer-left">
      <img class="footer-img" :src="state.playInfo.picUrl" />
      <div class="song-info">
        <div class="name">{{ state.playInfo.name }}</div>
        <span>横滑切换上下首哦</span>
      </div>
    </div>
    <div class="footer-right">
      <van-icon
        @click="startPlay"
        name="play-circle-o"
        v-if="!store.state.isPlay"
      />
      <van-icon @click="startPlay" name="pause-circle-o" v-else />
      <van-icon class="bars" name="bars" />
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${state.playInfo.id}.mp3`"
    ></audio>
  </div>
</template>

<style lang="less" scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  box-shadow: 0 -1px 1px #ccc;
  background: #fff;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .footer-left {
    width: 80%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    color: #999;
    .footer-img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  .footer-right {
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 30px;
    .bars {
      margin-left: 10px;
    }
  }
}
</style>
