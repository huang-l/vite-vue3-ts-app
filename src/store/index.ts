import { defineStore } from 'pinia';
import { reactive } from 'vue';

// 名称同时以 use 开头且以 Store 结尾 (比如 `useUserStore`，`useCartStore`，`useProductStore`)
export const usePlayListStore = defineStore(
  'main',
  () => {
    const state = reactive({
      playList: [
        {
          al: {
            id: 90525175,
            name: '生活限定手册',
            pic: 109951165050432620,
            picUrl:
              'https://p2.music.126.net/Z47IFngOl_t1pVCh1PHL_w==/109951165050432631.jpg',
            pic_str: '109951165050432631',
          },
          id: 1455273374,
        },
      ],
      playIndex: 0,
      isPlay: false,
    });

    return { state };
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
