<script setup lang="ts">
import TopNav from './TopNav.vue';
import { getBanner, getSongList } from '@/api/modules/home';
import { reactive, onMounted } from 'vue';
import { formatNumber } from '@/util/common';
const state = reactive({
  images: [],
  songList: <
    Array<{ id: number; playCount: number; name: string; src: string }>
  >[],
});
const list = reactive([
  { name: 'good-job-o', label: '每日推荐' },
  { name: 'video-o', label: '私人FM' },
  { name: 'service-o', label: '歌单' },
  { name: 'bar-chart-o', label: '排行榜' },
]);
onMounted(() => {
  getBanner().then((res: any) => {
    if (!res?.banners?.length) return;
    state.images = res.banners.map((item: any) => item.pic);
  });
  getSongList().then((res: any) => {
    if (!res?.result?.length) return;
    state.songList = res.result.map((item: any) => ({
      id: item.id,
      playCount: item.playCount,
      name: item.name,
      src: item.picUrl,
    }));
  });
});
</script>

<template>
  <TopNav />
  <div class="home-wrapper">
    <div class="swiper-image">
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in state.images" :key="image">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="list">
      <div class="list-item" v-for="item in list" :key="item.name">
        <van-icon class="icon" :name="item.name" />
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div class="song-list">
      <div class="list-header">
        <span class="header-title">发现好歌单</span>
        <van-button size="small">查看更多</van-button>
      </div>
      <div class="list-content">
        <van-swipe :loop="false" :width="150" :show-indicators="false">
          <van-swipe-item v-for="item in state.songList" :key="item.id">
            <router-link :to="`/songDetail?id=${item.id}`">
              <img :src="item.src" />
              <span class="play-count">
                <van-icon name="play" />{{ formatNumber(item.playCount) }}
              </span>
              <span class="song-name">{{ item.name }}</span>
            </router-link>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home-wrapper {
  padding: 10px;
  .swiper-image {
    height: 200px;
    margin-bottom: 10px;
    .van-swipe {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .list {
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .list-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon {
        font-size: 40px;
      }
    }
  }
  .song-list {
    padding-top: 30px;
    .list-header {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-title {
        font-size: 20px;
        font-weight: bold;
      }
    }
    .list-content {
      height: 100px;
      .van-swipe {
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .play-count {
          position: absolute;
          right: 2px;
          top: 2px;
          color: #ccc;
        }
        .song-name {
          font-size: 12px;
          color: #000;
        }
      }
    }
  }
}
</style>
