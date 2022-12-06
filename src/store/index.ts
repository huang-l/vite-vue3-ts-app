import { getSongLyric } from "@/api/modules/songDetail";
import { defineStore } from "pinia";
import { reactive } from "vue";

// 名称同时以 use 开头且以 Store 结尾 (比如 `useUserStore`，`useCartStore`，`useProductStore`)
export const usePlayListStore = defineStore(
  "main",
  () => {
    const state = reactive({
      playList: [
        {
          id: 527354000,
          auth: "十指流玉",
          name: "春风再美也比不上你的笑,没见过你的人自然不会明了。(Demo)",
          picUrl:
            "https://p2.music.126.net/3bs7NZugy1tMOuM-R-Adpg==/109951163096544864.jpg",
        },
      ],
      playIndex: 0,
      isPlay: false,
      isShowDetail: false,
      lyric: "[99:00.00]纯音乐，请欣赏",
    });

    const changePlayList = (newList: any) => (state.playList = newList);

    const changePlayIndex = (index: number) => {
      index !== state.playIndex && (state.playIndex = index);
    };

    const changeIsPlay = (isPlay: boolean) => {
      isPlay !== state.isPlay && (state.isPlay = isPlay);
    };

    const changeDetailShow = (isShowDetail: boolean) => {
      isShowDetail !== state.isShowDetail &&
        (state.isShowDetail = isShowDetail);
    };

    const getLyric = async (id: number) => {
      const res: any = await getSongLyric(id);
      state.lyric = res.lrc.lyric;
    };

    return {
      state,
      changePlayList,
      changePlayIndex,
      changeIsPlay,
      changeDetailShow,
      getLyric,
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          storage: localStorage, //默认是sessionStorage
          // paths: ['count'], //不写存储全部 写了只存储内部变量
        },
      ],
    },
  }
);
