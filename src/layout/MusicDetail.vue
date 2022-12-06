<script setup lang="ts">
import { defineProps } from "vue";
import { usePlayListStore } from "@/store";
defineProps(["playInfo", "play", "isPlay"]);
const store = usePlayListStore();
const hideDetail = () => {
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
          <div>{{ playInfo.name }}</div>
          <span class="auth">{{ playInfo.auth }}<van-icon name="arrow" /></span>
        </div>
      </div>
      <div class="top-right"><van-icon name="link-o" /></div>
    </div>
    <div class="detail-content">
      <img :src="playInfo.picUrl" />
    </div>
    <div class="detail-footer">
      <div class="footer-top">
        <van-icon name="like-o" /><van-icon name="down" />
        <van-icon name="service-o" />
        <van-icon name="comment-o" /><van-icon name="exchange" />
      </div>
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
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
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
  }
}
</style>
