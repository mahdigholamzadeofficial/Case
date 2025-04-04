export const trimTitle = (title: string, maxLength: number = 15): string => {
  return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
};
