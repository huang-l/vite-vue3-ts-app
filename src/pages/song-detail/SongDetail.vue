<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';
import { getSongDetail, getSongList } from '@/api/modules/songDetail';
import DetailTop from './DetailTop.vue';
const state = reactive({
  playList: { subscribedCount: 0 },
  songList: <
    Array<{ name: string; mv: number; ar: Array<{ name: string }> }>
  >[],
});
onMounted(() => {
  const { id } = useRoute().query;
  if (!id) return;
  getSongDetail(id as string).then((res: any) => {
    if (!res?.playlist) return;
    state.playList = res.playlist;
  });
  const params = { id: id as string, limit: 30, offset: 0 };
  getSongList(params).then((res: any) => {
    if (!res?.songs?.length) return;
    state.songList = res.songs.map((item: any) => ({
      name: item.name,
      mv: item.mv,
      ar: item.ar,
    }));
  });
});
</script>

<template>
  <DetailTop :playList="state.playList" />
  <div class="detail-content">
    <div class="detail-content-header">
      <span>
        <van-icon name="play-circle-o" />
        <span class="head-text"
          >播放全部<span class="song-num"
            >(共{{ state.songList.length }}首)</span
          ></span
        >
      </span>
      <div class="detail-subscribe">
        +收藏({{ state.playList.subscribedCount }})
      </div>
    </div>
    <div class="song-list">
      <div
        class="list-item"
        v-for="(item, index) in state.songList"
        :key="index"
      >
        <div class="item-left">
          <span class="order">{{ index + 1 }}</span>
          <div class="item-info">
            <div class="item-name">{{ item.name }}</div>
            <span v-for="(ite, i) in item.ar" :key="i">{{ ite.name }}</span>
          </div>
        </div>
        <div class="item-right">
          <van-icon class="video" v-if="!item.mv" name="video-o" /><van-icon
            name="wap-nav"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.detail-content {
  background: #fff;
  border-radius: 10px 10px 0 0;
  padding: 10px 10px 50px 10px;
  .detail-content-header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    .head-text {
      margin-left: 10px;
      color: #000;
      .song-num {
        color: #ccc;
      }
    }
    .detail-subscribe {
      background: red;
      border-radius: 20px;
      padding: 5px;
      color: #fff;
    }
  }
  .song-list {
    .list-item {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item-left {
        width: 80%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .item-info {
          margin-left: 10px;
          color: #ccc;
          font-size: 14px;
          .item-name {
            color: #000;
            font-weight: bold;
          }
        }
      }
      .item-right {
        width: 20%;
        display: flex;
        justify-content: flex-end;
        font-size: 30px;
        .video {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
