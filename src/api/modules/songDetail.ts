import axios from "../axios";

// 获取歌单详情
export const getSongDetail = (id: string) =>
  axios({
    method: "get",
    url: `/playList/detail?id=${id}`,
  });

// 获取歌单内歌曲列表
export const getSongList = (params: {
  id: string;
  limit: number;
  offset: number;
}) =>
  axios({
    method: "get",
    url: "/playList/track/all",
    params,
  });
// 获取歌单内歌曲歌词
export const getSongLyric = (id: number) =>
  axios({
    method: "get",
    url: `/lyric?id=${id}`,
  });
