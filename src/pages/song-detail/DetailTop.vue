<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { formatNumber } from '@/util/common';
defineProps(['playList']);
const router = useRouter();
const backTo = () => {
  router.back();
};
</script>

<template>
  <div class="detail-top">
    <img class="top-img" :src="playList.coverImgUrl" />
    <div class="top-left">
      <van-icon name="revoke" @click="backTo" />
      <span>歌单</span>
    </div>
    <div class="top-right">
      <van-icon name="search" />
      <van-icon name="wap-nav" />
    </div>
  </div>
  <div class="detail-top-content">
    <div class="content-left">
      <img class="left-img" :src="playList.coverImgUrl" />
      <span class="play-count">
        <van-icon name="play" />{{ formatNumber(playList.playCount) }}
      </span>
    </div>
    <div class="content-right">
      <div class="right-title">{{ playList.name }}</div>
      <div class="right-img" v-if="playList.creator">
        <img class="img" :src="playList.creator.backgroundUrl" />
        <span>{{ playList.creator.nickname }}<van-icon name="arrow" /></span>
      </div>
      <div class="right-des">
        <span class="ellipsis description">{{ playList.description }}</span
        ><van-icon name="arrow" />
      </div>
    </div>
  </div>
  <div class="detail-top-footer">
    <div class="list-item">
      <van-icon class="icon" name="chat-o" /><span>{{
        playList.commentCount
      }}</span>
    </div>
    <div class="list-item">
      <van-icon class="icon" name="link-o" /><span>{{
        playList.shareCount
      }}</span>
    </div>
    <div class="list-item">
      <van-icon class="icon" name="down" /><span>下载</span>
    </div>
    <div class="list-item">
      <van-icon class="icon" name="passed" /><span>多选</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.detail-top {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  color: #fff;
  position: relative;
  .top-left,
  .top-right {
    width: 25%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .top-img {
    width: 100%;
    height: 600px;
    position: fixed;
    z-index: -1;
    filter: blur(30px);
  }
}
.detail-top-content {
  height: 150px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .content-left {
    width: 30%;
    position: relative;
    .left-img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
    .play-count {
      position: absolute;
      right: 2px;
      top: 2px;
      color: #ccc;
    }
  }
  .content-right {
    width: 60%;
    font-size: 14px;
    color: #ccc;
    .right-title {
      color: #fff;
      font-weight: bold;
      font-size: 16px;
    }
    .right-img {
      height: 30px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    .right-des {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .description {
        display: inline-block;
        width: 90%;
      }
    }
  }
}
.detail-top-footer {
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .list-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    .icon {
      font-size: 30px;
    }
  }
}
</style>
