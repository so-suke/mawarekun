export const last = (array: any[]) => {
  return array[array.length - 1];
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
