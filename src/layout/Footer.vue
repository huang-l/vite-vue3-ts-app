<script setup lang="ts">
import { usePlayListStore } from '@/store';
import { ref } from 'vue';
const store = usePlayListStore();
const playInfo = store.state.playList[store.state.playIndex];
const audio: any = ref(null);
const startPlay = () => {
  if (audio.value) {
    if (audio.value.paused) {
      audio.value.play();
      store.state.isPlay = true;
    } else {
      audio.value.pause();
      store.state.isPlay = false;
    }
  }
};
</script>

<template>
  <div class="footer">
    <div class="footer-left">
      <img class="footer-img" :src="playInfo.al.picUrl" />
      <div class="song-info">
        <div class="name">{{ playInfo.al.name }}</div>
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
      :src="`https://music.163.com/song/media/outer/url?id=${playInfo.id}.mp3`"
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
