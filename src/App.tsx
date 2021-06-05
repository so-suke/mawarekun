import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, FormControl, Form, Button, ListGroup, InputGroup } from "react-bootstrap";
import { format } from "date-fns";
// 型定義インポート
import { TypeRotation } from "./types";
// 定数定義インポート
import {
  STORE_NAMES,
  STORE_NAMES_EXCHANGE_RATES_MAP,
  STORE_NAME_BALL_NUMBER_LENT,
  EXCHANGE_RATE_NORMAL,
  REST_URL_SPREADSHEET,
  REPLENISHMENT_AMOUNT,
  REPLENISHMENT_AMOUNT_RATIO,
  ROTATION_MODE,
  ERROR_MSG,
} from "./constants";
// 便利系関数インポート
import { last, sleep } from "./utils";
// 各コンポーネントをインポート
import { ContinueStartButton } from "./components/ContinueStartButton";
import { ResetStartButton } from "./components/ResetStartButton";
import { NumberButtons } from "./components/NumberButtons";
import { Rotations } from "./components/Rotations";
import { StoreNames } from "./components/StoreNames";
import { useSwipeable } from "react-swipeable";
// css modulesインポート
import styles from "./cssModules/App.module.css";

const axios = require("axios").default;

const config = { delta: 100 };

function App() {
  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => toNextPage(),
    onSwipedRight: (eventData) => toPrevPage(),
    ...config,
  });
  // useState定義
  const [pageIndex, setPageIndex] = useState(0);
  const [sizeTenKey, setSizeTenKey] = useState("12");
  const [rotationNumberInputed, setRotationNumberInputed] = useState<string>("");
  const [rotations, setRotations] = useState<TypeRotation[]>([]);
  const [rotationRate, setRotationRate] = useState(0);
  const [investmentCnt, setInvestmentCnt] = useState(0);
  const [rotationNumberTotal, setRotationNumberTotal] = useState(0);
  const [border, setBorder] = useState<string>("");
  const [storeName, setStoreName] = useState("");
  const [machineName, setMachineName] = useState("");
  const [ballNumberConfirm, setBallNumberConfirm] = useState("");
  const [ballNumberAutoRotation, setBallNumberAutoRotation] = useState("");
  const [rotationNumberAutoRotation, setRotationNumberAutoRotation] = useState("");
  const [remarks, setRemarks] = useState("");
  const [exchangeRate, setExchangeRate] = useState<string>("");
  const [isCorrectBallNumberConfirm, setIsCorrectBallNumberConfirm] = useState(true);
  const [ballNumberBigHitBefore, setBallNumberBigHitBefore] = useState("");
  const [ballNumberBigHitAfter, setBallNumberBigHitAfter] = useState("");
  const [roundBase, setRoundBase] = useState(0);
  const [roundRecord, setRoundRecord] = useState("");
  const [wonBallNumberRecord, setWonBallNumberRecord] = useState("");
  const [roundTotal, setRoundTotal] = useState(0);
  const [wonBallNumberTotal, setWonBallNumberTotal] = useState(0);
  const [spreadSheetId, setSpreadSheetId] = useState("");
  const [machineNumberInStore, setMachineNumberInStore] = useState("");

  // useRef定義
  const rotationListRef = useRef<HTMLDivElement>(null);
  const selectStoreRef = useRef<HTMLSelectElement>(document.createElement("select"));
  const rotationButtonRef = useRef<HTMLButtonElement>(document.createElement("button"));

  const setItemLocalStoragePageIndex = useCallback(
    (keyName: string, setted: string) => {
      localStorage.setItem(`${keyName}_${pageIndex}`, setted);
    },
    [pageIndex]
  );
  const getItemLocalStoragePageIndex = useCallback(
    (keyName: string, init: string) => {
      const result = localStorage.getItem(`${keyName}_${pageIndex}`) || init;
      return result;
    },
    [pageIndex]
  );
  const getStyleSizeTenKey: Function = useCallback(() => {
    return { paddingTop: `${sizeTenKey}px`, paddingBottom: `${sizeTenKey}px` };
  }, [sizeTenKey]);

  // 初回描画時に実行
  useEffect(() => {
    const pageIndexLocal: number = Number(localStorage.getItem("pageIndex") || "0");
    setPageIndex(pageIndexLocal);
  }, []);

  useEffect(() => {
    // ローカルストレージから各値を取得。
    const machineNumberInStoreLocal: string = localStorage.getItem("machineNumberInStore") || "0";
    const spreadSheetIdLocal: string = localStorage.getItem("spreadSheetId") || "";
    const sizeTenKeyLocal: string = localStorage.getItem("sizeTenKey") || "10";
    const investmentCntLocal: string = getItemLocalStoragePageIndex("investmentCnt", "0");
    const rotationsParsed: TypeRotation[] = JSON.parse(getItemLocalStoragePageIndex("rotations", "[]"));
    const storeNameLocal: string = getItemLocalStoragePageIndex("storeName", "");
    const machineNameLocal: string = getItemLocalStoragePageIndex("machineName", "");
    const ballNumberConfirmLocal: string = getItemLocalStoragePageIndex("ballNumberConfirm", "");
    const borderLocal: string = getItemLocalStoragePageIndex("border", "18.0");
    const remarksLocal: string = getItemLocalStoragePageIndex("remarks", "");
    const ballNumberBigHitBeforeLocal: string = getItemLocalStoragePageIndex("ballNumberBigHitBefore", "0");
    const ballNumberBigHitAfterLocal: string = getItemLocalStoragePageIndex("ballNumberBigHitAfter", "0");
    const roundBaseLocal: number = Number(getItemLocalStoragePageIndex("roundBase", ""));
    const roundRecordLocal: string = getItemLocalStoragePageIndex("roundRecord", "");
    const wonBallNumberRecordLocal: string = getItemLocalStoragePageIndex("wonBallNumberRecord", "");

    setMachineNumberInStore(machineNumberInStoreLocal);
    setSpreadSheetId(spreadSheetIdLocal);
    setSizeTenKey(sizeTenKeyLocal);
    setInvestmentCnt(Number(investmentCntLocal));
    setRotations(rotationsParsed);
    setRotationRate(calcRotationRate(rotationsParsed));
    setRotationNumberTotal(calcRotationNumberTotal(rotationsParsed));
    setStoreName(storeNameLocal);
    setMachineName(machineNameLocal);
    setBallNumberConfirm(ballNumberConfirmLocal);
    setBorder(borderLocal);
    setRemarks(remarksLocal);
    setBallNumberBigHitBefore(ballNumberBigHitBeforeLocal);
    setBallNumberBigHitAfter(ballNumberBigHitAfterLocal);
    setRoundBase(roundBaseLocal);
    setRoundRecord(roundRecordLocal);
    setWonBallNumberRecord(wonBallNumberRecordLocal);
  }, [getItemLocalStoragePageIndex]);

  const sumRoundBaseRecords = (record: string) => {
    const regexSplit = /[\n.,]/;
    const records = record.split(regexSplit).map((record) => Number(record));
    const recordsTotal = records.reduce((prev, curr) => {
      return prev + curr;
    }, 0);

    return recordsTotal;
  };

  useEffect(() => {
    localStorage.setItem("machineNumberInStore", machineNumberInStore);
  }, [machineNumberInStore]);

  useEffect(() => {
    localStorage.setItem("spreadSheetId", spreadSheetId);
  }, [spreadSheetId]);

  useEffect(() => {
    localStorage.setItem("sizeTenKey", sizeTenKey);
  }, [sizeTenKey]);

  useEffect(() => {
    setItemLocalStoragePageIndex("wonBallNumberRecord", wonBallNumberRecord);
    const recordsTotal = sumRoundBaseRecords(wonBallNumberRecord);
    setWonBallNumberTotal(recordsTotal);
  }, [wonBallNumberRecord, setItemLocalStoragePageIndex]);

  useEffect(() => {
    setItemLocalStoragePageIndex("roundRecord", roundRecord);
    const recordsTotal = sumRoundBaseRecords(roundRecord);
    setRoundTotal(recordsTotal);
  }, [roundRecord, setItemLocalStoragePageIndex]);

  useEffect(() => {
    const roundBase = Number((wonBallNumberTotal / roundTotal).toFixed(1));
    setRoundBase(roundBase);
    setItemLocalStoragePageIndex("roundBase", "" + roundBase);
  }, [roundTotal, wonBallNumberTotal, setItemLocalStoragePageIndex]);

  useEffect(() => {
    (rotationListRef as any).current.scrollTop = (rotationListRef as any).current.scrollHeight;
    setItemLocalStoragePageIndex("rotations", JSON.stringify(rotations));
  }, [rotations, setItemLocalStoragePageIndex]);

  useEffect(() => {
    setItemLocalStoragePageIndex("investmentCnt", "" + investmentCnt);
  }, [investmentCnt, setItemLocalStoragePageIndex]);

  useEffect(() => {
    setItemLocalStoragePageIndex("border", border);
  }, [border, setItemLocalStoragePageIndex]);

  useEffect(() => {
    setItemLocalStoragePageIndex("ballNumberConfirm", ballNumberConfirm);
  }, [ballNumberConfirm, setItemLocalStoragePageIndex]);

  useEffect(() => {
    setItemLocalStoragePageIndex("remarks", remarks);
  }, [remarks, setItemLocalStoragePageIndex]);

  useEffect(() => {
    setItemLocalStoragePageIndex("machineName", machineName);
  }, [machineName, setItemLocalStoragePageIndex]);

  useEffect(() => {
    // 選択肢の店名が変更されたら、対応した交換率へ変更する。
    const storeExchangeRate = STORE_NAMES_EXCHANGE_RATES_MAP.get(storeName);
    setExchangeRate(String(storeExchangeRate));

    setItemLocalStoragePageIndex("storeName", storeName);
  }, [storeName, setItemLocalStoragePageIndex]);

  // ■useMemo系
  // 「回転単価」が「ボーダーまたは回転率」に対する「導出項目」のため。
  const rotationUnitPrice = useMemo<number>(() => {
    if (rotationRate === 0) return 0;
    return Number((1000 / Number(border) - 1000 / rotationRate).toFixed(1));
  }, [border, rotationRate]);

  // ■change系
  function changeMachineNumberInStore(event: React.ChangeEvent<HTMLInputElement>) {
    setMachineNumberInStore(event.target.value);
  }

  function changeSpreadSheetId(event: React.ChangeEvent<HTMLInputElement>) {
    setSpreadSheetId(event.target.value);
  }

  function changeSizeButton(event: React.ChangeEvent<HTMLInputElement>) {
    setSizeTenKey(event.target.value);
  }

  function changeStoreNamesSelect(event: React.ChangeEvent<HTMLInputElement>) {
    setStoreName(event.target.value);
  }

  function changeBorder(event: React.ChangeEvent<HTMLInputElement>) {
    setBorder(event.target.value);
  }

  // 機種名の変更
  function changeMachineName(event: React.ChangeEvent<HTMLInputElement>) {
    const machineName = event.target.value;
    setMachineName(machineName);
  }

  // 備考の変更
  function changeRemarks(event: React.ChangeEvent<HTMLInputElement>) {
    const remarksInputed = event.target.value;
    setRemarks(remarksInputed);
  }

  // 大当前玉数の変更
  function changeBallNumberBigHitBefore(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;
    setItemLocalStoragePageIndex("ballNumberBigHitBefore", input);
    setBallNumberBigHitBefore(input);
  }

  // 大当後玉数の変更
  function changeBallNumberBigHitAfter(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;
    setItemLocalStoragePageIndex("ballNumberBigHitAfter", input);
    setBallNumberBigHitAfter(input);
  }

  // 獲得玉数記録の変更
  function changeWonBallNumberRecord(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;
    setWonBallNumberRecord(input);
  }

  // ラウンド記録の変更
  function changeRoundRecord(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;
    setRoundRecord(input);
  }

  // 回転数入力ミス防止用玉数の変更
  function changeBallNumberConfirm(event: React.ChangeEvent<HTMLInputElement>) {
    const ballNumberConfirm = event.target.value;
    setBallNumberConfirm(ballNumberConfirm);
  }

  // 自動回転に使用する玉数
  function changeBallNumberAutoRotation(event: React.ChangeEvent<HTMLInputElement>) {
    const ballNumberAutoRotation = event.target.value;
    setBallNumberAutoRotation(ballNumberAutoRotation);
  }

  // 自動回転に使用する回転数
  function changeRotationNumberAutoRotation(event: React.ChangeEvent<HTMLInputElement>) {
    const rotationNumberAutoRotation = event.target.value;
    setRotationNumberAutoRotation(rotationNumberAutoRotation);
  }

  function changeRotationNumberInputed(event: React.ChangeEvent<HTMLInputElement>) {
    setRotationNumberInputed(event.target.value);
  }

  // ■通常関数定義
  function isResetStarted() {
    return rotations.length > 0 && rotations[0].type === ROTATION_MODE.resetStart;
  }

  // 今選択している店舗が大当たり出玉計数機能を付けているかどうか
  function hasCountFunctionBigHitBallNumber() {
    return storeName === "NtNakano";
  }

  function clearRotationNumberInputed() {
    setRotationNumberInputed("");
  }

  function getWorkAmount() {
    return (rotationUnitPrice * rotationNumberTotal).toFixed(0);
  }

  // 獲得玉数の計算
  function calculateWonBallNumber() {
    try {
      if (window.confirm("獲得玉数の計算、入力を行います")) {
        // 大当たり後 ー 大当たり前　で　獲得玉数を計算
        const wonBallNumberCalculated = Number(ballNumberBigHitAfter) - Number(ballNumberBigHitBefore);
        // 大当たり前の玉数が大当たり後より大きければエラー
        if (wonBallNumberCalculated < 0) {
          throw ERROR_MSG.bigHitBallNumberBeforeBigThanAfter;
        }
        // 改行するかどうか？初回書き込み時は改行しない。
        const lineBreakIf = wonBallNumberRecord === "" ? "" : "\n";
        setWonBallNumberRecord(`${wonBallNumberRecord}${lineBreakIf}${wonBallNumberCalculated},`);
      }
    } catch (error) {
      alert(error);
    }
  }

  // 一回の貸出ボタン玉数
  function getBallNumberLent(storeName: string): number {
    const ballNumberLentDefault = 125;
    try {
      if (!STORE_NAME_BALL_NUMBER_LENT.hasOwnProperty(storeName)) {
        throw new Error(ERROR_MSG.notExpectedStoreName);
      }
      return STORE_NAME_BALL_NUMBER_LENT[storeName];
    } catch (error) {
      alert(error);
      return ballNumberLentDefault;
    }
  }

  // 前のページへ移動
  function toPrevPage() {
    // ページが0未満に行かないようにする。
    if (pageIndex === 0) return;
    localStorage.setItem("pageIndex", "" + (pageIndex - 1));
    setPageIndex(pageIndex - 1);
  }
  // 次のページへ移動
  function toNextPage() {
    // ページが10より上に行かないようにする。
    if (pageIndex === 10) return;
    localStorage.setItem("pageIndex", "" + (pageIndex + 1));
    setPageIndex(pageIndex + 1);
  }

  //　回転配列を1行削除する。
  function deleteOneRotation() {
    const rotationsLength = rotations.length;

    if (rotationsLength === 0) return;

    // 削除時は、一律で正しいことにする。
    setIsCorrectBallNumberConfirm(true);

    // 投資回数の調整
    if (last(rotations).type === ROTATION_MODE.normal) {
      setInvestmentCnt(investmentCnt - 1);
    }

    const rotationsDeleted = rotations.filter((rotation, index) => {
      return index !== rotationsLength - 1;
    });

    // 回転率の更新
    // 長さが1の時、必ずリセットスタートなので、回転率は0に設定してあります。
    if (rotationsDeleted.length === 1 || rotationsDeleted.length === 0) {
      setRotationRate(0);
    } else {
      setRotationRate(last(rotationsDeleted).rotationRate);
    }

    // 総回転数の更新
    if (last(rotations).type === ROTATION_MODE.normal && rotationsDeleted.length > 0) {
      const rotationNumberDiffShouldSub = last(rotations).rotationNumber - last(rotationsDeleted).rotationNumber;
      setRotationNumberTotal(rotationNumberTotal - rotationNumberDiffShouldSub);
    }

    setRotations(rotationsDeleted);

    // 確認用玉数を計算
    setBallNumberConfirm(String(Number(ballNumberConfirm) + getBallNumberLent(storeName)));
  }

  // 画面の初期読込時に使用
  function calcRotationNumberTotal(rotations: TypeRotation[]) {
    let totalRotationNumberCalculatted = 0;
    rotations.forEach((rotation, idx) => {
      if (rotation.type === ROTATION_MODE.resetStart || rotation.type === ROTATION_MODE.continueStart) return;
      totalRotationNumberCalculatted += rotation.rotationNumber - rotations[idx - 1].rotationNumber;
    });
    return totalRotationNumberCalculatted;
  }

  // 画面の初期読込時に使用
  function calcRotationRate(rotations: TypeRotation[]) {
    if (rotations.length === 0) return 0;
    return last(rotations).rotationRate;
  }

  // 「回転配列の全行削除」と「初期化するべきデータの初期化」
  function deleteAllRotation() {
    if (window.confirm("全行削除してもいいですか？")) {
      setRotations([]);
      setRotationRate(0);
      setInvestmentCnt(0);
      setRotationNumberTotal(0);
      setBallNumberConfirm("");
      setMachineName("");
      setRemarks("");
      setRoundRecord("");
      setWonBallNumberRecord("");
      setMachineNumberInStore("");
      if (hasCountFunctionBigHitBallNumber()) {
        setBallNumberBigHitBefore("");
        setBallNumberBigHitAfter("");
      }
    }
  }

  // 最後の結果書込処理（全行削除も行う）
  function writeWorkResultAndDeleteAllRotation() {
    const now = new Date();
    const date = format(now, "yyyy/MM/dd");
    const timeStart = localStorage.getItem("startTime");
    const timeEnd = format(now, "HH:mm");

    if (spreadSheetId === "") {
      alert("ssidを入力して下さい。");
      return;
    }

    const params = new URLSearchParams();
    params.append("spreadsheetId", `${spreadSheetId}`);
    params.append("date", `${date}`);
    params.append("timeStart", `${timeStart}`);
    params.append("timeEnd", `${timeEnd}`);
    params.append("border", `${border}`);
    params.append("rotationRate", `${rotationRate}`);
    params.append("rotationUnitPrice", `${rotationUnitPrice}`);
    params.append("rotationNumberTotal", `${rotationNumberTotal}`);
    params.append("roundBase", `${roundBase}`);
    params.append("workAmount", `${getWorkAmount()}`);
    params.append("machineName", `${machineName}`);
    params.append("storeName", `${storeName}`);
    params.append("machineNumberInStore", `${machineNumberInStore}`);
    params.append("remarks", `${remarks}`);

    axios
      .post(REST_URL_SPREADSHEET, params)
      .then(function (response: any) {
        alert("書込が成功しました。");
        deleteAllRotation();
      })
      .catch(function (error: any) {
        alert(error);
      });
  }

  // 回転数の短縮入力の判別（返り値は、回転数）
  function shouldShortInput() {
    return String(rotationNumberInputed).length < 3 && String(last(rotations).rotationNumber).length > 1;
  }

  // 短縮入力された「回転数を返す」
  function getRotationNumberShortInputed(): number {
    const digitsHowMuch = 2;
    const rotationNumberLast: string = String(last(rotations).rotationNumber);
    const isMoveUp = (beCompared: number, rotationNumberInputed: number) => beCompared > rotationNumberInputed;
    const createBefore = (): number => {
      // 分解パート
      const numberBeMovedUpIfNeed = Number(rotationNumberLast.slice(0, -digitsHowMuch));
      const numberBeCompared = Number(rotationNumberLast.slice(-digitsHowMuch));
      // 「比較パート」と「繰上げパート」
      const before = isMoveUp(numberBeCompared, Number(rotationNumberInputed)) ? numberBeMovedUpIfNeed + 1 : numberBeMovedUpIfNeed;

      return before;
    };

    const before = createBefore();
    const after = ("00" + rotationNumberInputed).slice(-digitsHowMuch);
    // 連結パート
    return Number(before + after);
  }

  // 自動回転
  async function autoRotation() {
    if (ballNumberAutoRotation === "" || rotationNumberAutoRotation === "") {
      alert("玉数または回転数を指定しましょう");
      return;
    }

    // 玉数の差から投資回数を算出
    const diffBallNumber = Number(ballNumberConfirm) - Number(ballNumberAutoRotation);
    if (diffBallNumber < 0) {
      alert("自動回転の玉数は、確認用玉数より大きい値を指定しましょう。");
      return;
    }

    // 回転ボタンを非同期でクリックするために作成。
    const clickRotation = () => {
      return sleep(1).then(() => rotationButtonRef.current.click());
    };

    let countInvestment = diffBallNumber / getBallNumberLent(storeName);
    // 丁度いい回転数を自動入力するために算出
    let diffRotationNumber = Number(rotationNumberAutoRotation) - last(rotations).rotationNumber;
    // 投資回数が整数でない場合は、考えないことにしています。
    if (!Number.isInteger(countInvestment)) {
      if (!window.confirm("投資回数が整数ではありません。\n半端を除いて計算してもいいですか？")) return;
      // 回転数の小数部分
      const countInvestmentDecimal = countInvestment - parseInt(String(countInvestment));
      // 投資回数を整数に修正
      countInvestment -= countInvestmentDecimal;
      // 余分な回転数を総回転数から引く
      const rotationNumberExtra = Math.round(diffRotationNumber * countInvestmentDecimal);
      diffRotationNumber -= rotationNumberExtra;
    }
    // 一回の投資ごとの回転数。ユーザへの確認に用います。厳密にやらずに、小数点は無視します。
    const rotationNumberPerInvestment = Math.floor(diffRotationNumber / countInvestment);

    // 自動回転の実施を確認します。
    if (!window.confirm(`自動回転してもいいですか？\n投資回数：${countInvestment}回\n平均回転数：${rotationNumberPerInvestment}`)) return;
    // 投資回数分、回転数を自動入力していきます。
    for (let index = 0; index < countInvestment; index++) {
      const rotationNumber = Number(rotationNumberAutoRotation) - rotationNumberPerInvestment * (countInvestment - 1 - index);
      setRotationNumberInputed(String(rotationNumber));
      await clickRotation();
    }
  }

  // 通常回転（回転ボタン押下時の処理）
  function rotation() {
    try {
      if (isResetStarted() === false) {
        throw ERROR_MSG.resetStart;
      }
      // 以下の場合に、「確認用玉数チェック」をfalseにする。
      // マイナスに突入しそうな場合、未入力の場合（Numberで変換すると0になるので特別記入しなくていい）
      if (Number(ballNumberConfirm) < getBallNumberLent(storeName)) {
        setIsCorrectBallNumberConfirm(false);
      } else {
        setIsCorrectBallNumberConfirm(true);
      }

      // 投資回数の計算
      const investmentCntNow = investmentCnt + 1;
      // 必要であれば短縮入力を効かせる。
      const rotationNumberInputedClone = shouldShortInput() ? getRotationNumberShortInputed() : Number(rotationNumberInputed);
      const rotationNumberDiffFromLast = Number(rotationNumberInputedClone) - last(rotations).rotationNumber;
      //　交換率の比：通常交換率'4'と実交換率の比。回転率計算に用いる。
      const exchangeRateRatio: number = Number(exchangeRate) / EXCHANGE_RATE_NORMAL;
      const rotationRateMostRecent = Number((rotationNumberDiffFromLast * REPLENISHMENT_AMOUNT_RATIO * exchangeRateRatio).toFixed(1));

      const rotationNumberTotalNow = rotationNumberTotal + rotationNumberDiffFromLast;

      // 投資金額の比（todo:もう少し分かりやすく出来るかも？）
      const investmentAmountRatio = 1000 / (REPLENISHMENT_AMOUNT * investmentCntNow);
      const rotationRateNow = Number((rotationNumberTotalNow * investmentAmountRatio * exchangeRateRatio).toFixed(1));

      clearRotationNumberInputed();

      // 各種set
      setInvestmentCnt(investmentCntNow);
      setRotationNumberTotal(rotationNumberTotalNow);
      setRotationRate(rotationRateNow);
      setRotations(
        rotations.concat({
          type: ROTATION_MODE.normal,
          rotationNumber: Number(rotationNumberInputedClone),
          rotationRateMostRecent,
          rotationRate: rotationRateNow,
        })
      );
      // 確認用玉数を計算
      setBallNumberConfirm(String(Number(ballNumberConfirm) - getBallNumberLent(storeName)));
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="App">
      <Container className={`pt-3 ${isCorrectBallNumberConfirm ? "" : styles.bg_warning}`} {...handlers}>
        <Row>
          <Col>
            <p className="mb-0">
              <span>{pageIndex}ページ目</span>
            </p>

            <p className="mb-0">
              <span>{rotationUnitPrice}</span> * <span>{rotationNumberTotal}</span> = <span data-testid="work-amount">{getWorkAmount()}</span>
            </p>

            <Row className="justify-content-between">
              <Button className="mb-1" variant="primary" onClick={() => deleteOneRotation()}>
                1行削除
              </Button>
              <Button className={`mb-1 ${pageIndex === 0 ? "d-none" : ""}`} variant="primary" onClick={() => toPrevPage()}>
                前
              </Button>
              <Button className="mb-1" variant="primary" onClick={() => toNextPage()}>
                次
              </Button>
            </Row>

            <FormControl
              className="mb-1"
              id="rotationNumberInput"
              value={rotationNumberInputed}
              onChange={changeRotationNumberInputed}
              placeholder="回転数入力"
            />

            <Row className="mb-2">
              <NumberButtons
                setRotationNumberInputed={setRotationNumberInputed}
                rotationNumberInputed={rotationNumberInputed}
                getStyleSizeTenKey={getStyleSizeTenKey}
              />
              <Button variant="primary" className={`col-4 ${styles.font_button}`} onClick={() => clearRotationNumberInputed()}>
                C
              </Button>
              <Button variant="primary" className="col-4"></Button>

              <Button variant="primary" className="col-4" style={getStyleSizeTenKey()} ref={rotationButtonRef} onClick={() => rotation()}>
                回転
              </Button>

              <ContinueStartButton
                rotationNumberInputed={rotationNumberInputed}
                rotationRate={rotationRate}
                rotations={rotations}
                clearRotationNumberInputed={clearRotationNumberInputed}
                setRotations={setRotations}
                setIsCorrectBallNumberConfirm={setIsCorrectBallNumberConfirm}
              />

              <ResetStartButton
                rotationNumberInputed={rotationNumberInputed}
                rotations={rotations}
                selectStoreRef={selectStoreRef}
                isResetStarted={isResetStarted}
                clearRotationNumberInputed={clearRotationNumberInputed}
                setRotations={setRotations}
                setRemarks={setRemarks}
              />
            </Row>
          </Col>
          <Col>
            <ListGroup className="rotationList" ref={rotationListRef}>
              <Rotations rotations={rotations} />
            </ListGroup>

            <div className="mt-2">
              <div className={`mb-2 ${hasCountFunctionBigHitBallNumber() ? "" : "d-none"}`}>
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <InputGroup.Text>大当前玉数</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl type="number" value={ballNumberBigHitBefore} onChange={changeBallNumberBigHitBefore} />
                </InputGroup>
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <InputGroup.Text>大当後玉数</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl type="number" value={ballNumberBigHitAfter} onChange={changeBallNumberBigHitAfter} />
                </InputGroup>
                <Button variant="primary" size="sm" onClick={() => calculateWonBallNumber()}>
                  獲得玉数計算
                </Button>
              </div>
              <span className="mb-0">獲得玉数</span>
              <InputGroup>
                <FormControl
                  as="textarea"
                  rows={2}
                  placeholder="獲得玉数"
                  inputMode="numeric"
                  value={wonBallNumberRecord}
                  onChange={changeWonBallNumberRecord}
                />
              </InputGroup>
              <span className="mb-0">ラウンド数</span>
              <InputGroup>
                <FormControl as="textarea" rows={2} placeholder="ラウンド" inputMode="numeric" value={roundRecord} onChange={changeRoundRecord} />
              </InputGroup>
              <p className="mb-0">rb: {roundBase}</p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <Row>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>確認用玉数</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl value={ballNumberConfirm} data-testid="ball-number-confirm" onChange={changeBallNumberConfirm} type="number" />
              </InputGroup>
            </Row>
            <Row>
              <InputGroup size="sm">
                <FormControl
                  value={ballNumberAutoRotation}
                  data-testid="ball-number-auto-rotation"
                  onChange={changeBallNumberAutoRotation}
                  type="number"
                  placeholder="玉数"
                />
                <FormControl
                  value={rotationNumberAutoRotation}
                  data-testid="ball-number-auto-rotation"
                  onChange={changeRotationNumberAutoRotation}
                  type="number"
                  placeholder="回転数"
                />
                <InputGroup.Append>
                  <Button variant="outline-primary" onClick={() => autoRotation()}>
                    自回
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Row>

            <Row>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>ボーダー</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl value={border} data-testid="border" onChange={changeBorder} type="number" />
              </InputGroup>
            </Row>

            <Row>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>台番</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl value={machineNumberInStore} data-testid="machineNumberInStore" onChange={changeMachineNumberInStore} type="number" />
              </InputGroup>
            </Row>

            <Row>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>備考</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="textarea" rows={2} value={remarks} onChange={changeRemarks} />
              </InputGroup>
            </Row>

            <Row>
              <Button className="mt-5" variant="primary" onClick={() => writeWorkResultAndDeleteAllRotation()}>
                表書込＆全削
              </Button>
            </Row>

            <Row>
              <Button className="allDeteleBtn" variant="primary" onClick={() => deleteAllRotation()}>
                全行削除
              </Button>
            </Row>
          </Col>

          <Col>
            <div>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>店名</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="select" value={storeName} onChange={changeStoreNamesSelect} ref={selectStoreRef}>
                  <StoreNames storeNames={STORE_NAMES} />
                </Form.Control>
              </InputGroup>
            </div>
            <div>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>機種名</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl value={machineName} onChange={changeMachineName} />
              </InputGroup>
            </div>
            <div>
              <div className="mr-2">交換率:{exchangeRate}</div>
            </div>
            <InputGroup size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text>ボタン大きさ</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl value={sizeTenKey} min="1" max="30" onChange={changeSizeButton} type="number" />
            </InputGroup>

            <InputGroup size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text>ssid</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl value={spreadSheetId} onChange={changeSpreadSheetId} />
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
