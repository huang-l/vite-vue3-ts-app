// 格式化数字
export const formatNumber = (number: number) => {
  if (number > 100000000) {
    return (number / 100000000).toFixed(1) + '亿';
  }
  if (number > 10000) {
    return (number / 10000).toFixed(1) + '万';
  }
  return number;
};
