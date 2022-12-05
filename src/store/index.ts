import { defineStore } from "pinia";
import { reactive } from "vue";

// 名称同时以 use 开头且以 Store 结尾 (比如 `useUserStore`，`useCartStore`，`useProductStore`)
export const usePlayListStore = defineStore(
  "main",
  () => {
    const state = reactive({
      playList: [
        {
          id: 1455273374,
          name: "生活限定手册",
          picUrl:
            "https://p2.music.126.net/Z47IFngOl_t1pVCh1PHL_w==/109951165050432631.jpg",
        },
      ],
      playIndex: 0,
      isPlay: false,
    });

    const changePlayList = (newList: any) => (state.playList = newList);

    const changePlayIndex = (index: number) => {
      index !== state.playIndex && (state.playIndex = index);
    };

    const changeIsPlay = (isPlay: boolean) => {
      isPlay !== state.isPlay && (state.isPlay = isPlay);
    };

    return { state, changePlayList, changePlayIndex, changeIsPlay };
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
