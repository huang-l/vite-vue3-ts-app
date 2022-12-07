import axios from "../axios";

// 获取首页轮播图
export const getBanner = () =>
  axios({
    method: "get",
    url: "/banner?type=2",
  });

// 获取推荐歌单
export const getSongList = () =>
  axios({
    method: "get",
    url: "/personalized?limit=10",
  });
