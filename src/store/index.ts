import { defineStore } from 'pinia';
import { ref } from 'vue';

// 名称同时以 use 开头且以 Store 结尾 (比如 `useUserStore`，`useCartStore`，`useProductStore`)
export const useCountStore = defineStore(
  'main',
  () => {
    const count = ref(0);
    function increment() {
      count.value++;
    }

    return { count, increment };
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
