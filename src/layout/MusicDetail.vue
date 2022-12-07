<script setup lang="ts">
import { reactive, computed, watch, ref } from "vue";
import { usePlayListStore } from "@/store";
defineProps(["playInfo", "play", "isPlay"]);
const store = usePlayListStore();
const state = reactive({
  isShowLyric: false,
  lyricList: [],
});
const lyricRef: any = ref(null);
const lyricList = computed(() => {
  const arr = store.state.lyric.split(/[(\r\n)\r\n]+/).map((item) => {
    const min = item.slice(1, 3);
    const sec = item.slice(4, 6);
    let mill = item.slice(7, 10);
    let lyric = item.slice(11, item.length);
    if (Number.isNaN(Number(mill))) {
      mill = item.slice(7, 9);
      lyric = item.slice(10, item.length);
    }
    const time = Number(min) * 60 * 1000 + Number(sec) * 1000 + Number(mill);
    return { min, sec, mill, lyric, time, nextTime: 100000 };
  });
  arr.forEach((item, index) => {
    if (index !== arr.length - 1) {
      item.nextTime = arr[index + 1].time;
    }
  });
  return arr;
});
watch(
  () => store.state.currentTime,
  () => {
    const activeItem: any = document.querySelector(".active-item");
    if (activeItem) {
      if (activeItem.offsetTop > 300) {
        lyricRef.value.scrollTop = activeItem.offsetTop - 300;
      }
    }
  }
);
const hideDetail = () => {
  state.isShowLyric = false;
  store.changeDetailShow(false);
};
</script>

<template>
  <img class="bg-img" :src="playInfo.picUrl" />
  <div class="detail">
    <div class="detail-top">
      <div class="top-left">
        <van-icon name="arrow-left" @click="hideDetail" />
        <div class="top-info">
          <marquee>{{ playInfo.name }}</marquee>
          <span class="auth">{{ playInfo.auth }}<van-icon name="arrow" /></span>
        </div>
      </div>
      <div class="top-right"><van-icon name="link-o" /></div>
    </div>
    <div class="detail-content" v-show="!state.isShowLyric">
      <img :src="playInfo.picUrl" @click="state.isShowLyric = true" />
    </div>
    <div ref="lyricRef" class="detail-lyric" v-show="state.isShowLyric">
      <div
        :class="{
          'lyric-item': true,
          'active-item':
            store.state.currentTime * 1000 >= item.time &&
            store.state.currentTime * 1000 < item.nextTime,
        }"
        v-for="(item, index) in lyricList"
        :key="index"
      >
        {{ item.lyric }}
      </div>
    </div>
    <div class="detail-footer">
      <div class="footer-top">
        <van-icon name="like-o" /><van-icon name="down" />
        <van-icon name="service-o" />
        <van-icon name="comment-o" /><van-icon name="exchange" />
      </div>
      <input
        type="range"
        class="range"
        min="0"
        step="0.05"
        :max="store.state.duration"
        v-model="store.state.currentTime"
      />
      <div class="footer-bottom">
        <van-icon name="certificate" /><van-icon name="arrow-left" />
        <van-icon name="play-circle-o" @click="play" v-if="!isPlay" />
        <van-icon name="pause-circle-o" @click="play" v-else />
        <van-icon name="arrow" /><van-icon class="bars" name="bars" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bg-img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(70px);
}
.detail {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  .detail-top {
    height: 50px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    .top-left {
      width: 50%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .top-info {
        width: 100px;
        font-size: 14px;
        .auth {
          color: #999;
        }
      }
    }
  }
  .detail-content {
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
  }
  .detail-lyric {
    height: 450px;
    overflow: auto;
    color: #999;
    .lyric-item {
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .active-item {
      color: #fff;
      font-size: 30px;
    }
  }
  .detail-footer {
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .footer-top,
    .footer-bottom {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 30px;
    }
    .range {
      width: 100%;
      height: 3px;
    }
  }
}
</style>
