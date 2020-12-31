import { TypeErrorMsg } from "../types";

// 店名に関するもの
export const STORE_NAMES = ["DoruNakano", "LiNakano", "NtNakano"];
export const STORE_NAMES_EXCHANGE_RATES_MAP = new Map([
  [STORE_NAMES[0], "4.38"],
  [STORE_NAMES[1], "4"],
  [STORE_NAMES[2], "4"],
]);
// 選択肢：店名の初期タイトル
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

// エラーメッセージ
export const ERROR_MSG: TypeErrorMsg = {
  resetStart: "リセットスタートをしましょう",
  resetStartedAlready: "既にリセットスタートされています",
  rotaionNumberEmpty: "回転数を入力しましょう",
  selectStore: "店名を選択して下さい。",
  notExpectedStoreName: "エラー可能性。存在しない店名が渡されました。",
};
