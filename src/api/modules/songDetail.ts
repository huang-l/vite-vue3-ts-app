import axios from '../axios';

export const getSongDetail = (id: string) =>
  axios({
    method: 'get',
    url: `/playList/detail?id=${id}`,
  });
