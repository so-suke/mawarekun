import { TypeErrorMsg } from "../types";

// TITLES
export const SELECT_STORE_TITLE: string = "店名を選択して下さい。";
// 通常の交換率
export const EXCHANGE_RATE_NORMAL: number = 4;
// ワンプッシュ当たりの金額
export const AMOUNT_ONE_PUSH = 500;
// スプレッドシートREST_URL
export const REST_URL_SPREADSHEET = "https://script.google.com/macros/s/AKfycbwAEFQ6VWnrJ67EjQiYd8WeEv0D2ogBpV2GYDgxucx9C5gf1Dmd/exec";
export const REPLENISHMENT_AMOUNT = 500;
// 直近の回転率計算に用いる。
export const REPLENISHMENT_AMOUNT_RATIO = 1000 / REPLENISHMENT_AMOUNT;

export const ROTATION_MODE: { [key: string]: string } = {
  normal: "normal",
  continueStart: "continueStart",
  resetStart: "resetStart",
};

export const ERROR_MSG: TypeErrorMsg = {
  resetStart: "リセットスタートをしましょう",
  resetStartedAlready: "既にリセットスタートされています",
  rotaionNumberEmpty: "回転数を入力しましょう",
  selectStore: "店名を選択して下さい。",
};
