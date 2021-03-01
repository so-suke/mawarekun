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
import { last } from "./utils";
// 各コンポーネントをインポート
import { ContinueStartButton } from "./components/ContinueStartButton";
import { ResetStartButton } from "./components/ResetStartButton";
import { NumberButtons } from "./components/NumberButtons";
import { Rotations } from "./components/Rotations";
import { StoreNames } from "./components/StoreNames";
// css modulesインポート
import styles from "./cssModules/App.module.css";

const axios = require("axios").default;

function App() {
  // useState定義
  const [pageIndex, setPageIndex] = useState(0);
  const [rotationNumberInputed, setRotationNumberInputed] = useState<string>("");
  const [rotations, setRotations] = useState<TypeRotation[]>([]);
  const [rotationRate, setRotationRate] = useState(0);
  const [investmentCnt, setInvestmentCnt] = useState(0);
  const [rotationNumberTotal, setRotationNumberTotal] = useState(0);
  const [border, setBorder] = useState<string>("");
  const [storeName, setStoreName] = useState("");
  const [machineName, setMachineName] = useState("");
  const [ballNumberConfirm, setBallNumberConfirm] = useState("");
  const [remarks, setRemarks] = useState("");
  const [exchangeRate, setExchangeRate] = useState<string>("");
  const [isCorrectBallNumberConfirm, setIsCorrectBallNumberConfirm] = useState(true);

  // useRef定義
  const rotationListRef = useRef<HTMLDivElement>(null);
  const selectStoreRef = useRef<HTMLSelectElement>(document.createElement("select"));

  const setItemLocalStorage = useCallback(
    (keyName: string, setted: string) => {
      localStorage.setItem(`${keyName}_${pageIndex}`, setted);
    },
    [pageIndex]
  );
  const getItemLocalStorage = useCallback(
    (keyName: string, init: string) => {
      const result = localStorage.getItem(`${keyName}_${pageIndex}`) || init;
      return result;
    },
    [pageIndex]
  );

  // 初回描画時に実行
  useEffect(() => {
    // ローカルストレージから各値を取得。
    const investmentCntLocal: string = getItemLocalStorage("investmentCnt", "0");
    const rotationsParsed: TypeRotation[] = JSON.parse(getItemLocalStorage("rotations", "[]"));
    const storeNameLocal: string = getItemLocalStorage("storeName", "");
    const machineNameLocal: string = getItemLocalStorage("machineName", "");
    const ballNumberConfirmLocal: string = getItemLocalStorage("ballNumberConfirm", "");
    const borderLocal: string = getItemLocalStorage("border", "18.0");
    const remarksLocal: string = getItemLocalStorage("remarks", "");

    setInvestmentCnt(Number(investmentCntLocal));
    setStoreName(storeNameLocal);
    setRotations(rotationsParsed);
    setMachineName(machineNameLocal);
    setBallNumberConfirm(ballNumberConfirmLocal);
    setBorder(borderLocal);
    setRemarks(remarksLocal);
    setRotationRate(calcRotationRate(rotationsParsed));
    setRotationNumberTotal(calcRotationNumberTotal(rotationsParsed));
  }, [getItemLocalStorage]);

  useEffect(() => {
    (rotationListRef as any).current.scrollTop = (rotationListRef as any).current.scrollHeight;
    setItemLocalStorage("rotations", JSON.stringify(rotations));
  }, [rotations, setItemLocalStorage]);

  useEffect(() => {
    setItemLocalStorage("investmentCnt", "" + investmentCnt);
  }, [investmentCnt, setItemLocalStorage]);

  useEffect(() => {
    setItemLocalStorage("border", border);
  }, [border, setItemLocalStorage]);

  useEffect(() => {
    setItemLocalStorage("ballNumberConfirm", ballNumberConfirm);
  }, [ballNumberConfirm, setItemLocalStorage]);

  useEffect(() => {
    setItemLocalStorage("remarks", remarks);
  }, [remarks, setItemLocalStorage]);

  useEffect(() => {
    // 選択肢の店名が変更されたら、対応した交換率へ変更する。
    const storeExchangeRate = STORE_NAMES_EXCHANGE_RATES_MAP.get(storeName);
    setExchangeRate(String(storeExchangeRate));

    setItemLocalStorage("storeName", storeName);
  }, [storeName, setItemLocalStorage]);

  // ■useMemo系
  // 「回転単価」が「ボーダーまたは回転率」に対する「導出項目」のため。
  const rotationUnitPrice = useMemo<number>(() => {
    if (rotationRate === 0) return 0;
    return Number((1000 / Number(border) - 1000 / rotationRate).toFixed(1));
  }, [border, rotationRate]);

  // ■change系
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
    setItemLocalStorage("machineName", machineName);
  }

  // 備考の変更
  function changeRemarks(event: React.ChangeEvent<HTMLInputElement>) {
    const remarksInputed = event.target.value;
    setRemarks(remarksInputed);
  }

  // 回転数入力ミス防止用玉数の変更
  function changeBallNumberConfirm(event: React.ChangeEvent<HTMLInputElement>) {
    const ballNumberConfirm = event.target.value;
    setBallNumberConfirm(ballNumberConfirm);
  }

  function changeRotationNumberInputed(event: React.ChangeEvent<HTMLInputElement>) {
    setRotationNumberInputed(event.target.value);
  }

  // ■通常関数定義
  function isResetStarted() {
    return rotations.length > 0 && rotations[0].type === ROTATION_MODE.resetStart;
  }

  function clearRotationNumberInputed() {
    setRotationNumberInputed("");
  }

  function getWorkAmount() {
    return (rotationUnitPrice * rotationNumberTotal).toFixed(0);
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
    setPageIndex(pageIndex - 1);
  }
  // 次のページへ移動
  function toNextPage() {
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

  function deleteAllRotation() {
    if (window.confirm("全行削除してもいいですか？")) {
      setRotations([]);
      setRotationRate(0);
      setInvestmentCnt(0);
      setRotationNumberTotal(0);
      setBallNumberConfirm("");
      setMachineName("");
      setRemarks("");
    }
  }

  // 最後の結果書込処理（全行削除も行う）
  function writeWorkResultAndDeleteAllRotation() {
    const now = new Date();
    const date = format(now, "yyyy/MM/dd");
    const timeStart = localStorage.getItem("startTime");
    const timeEnd = format(now, "HH:mm");

    const params = new URLSearchParams();
    params.append("date", `${date}`);
    params.append("timeStart", `${timeStart}`);
    params.append("timeEnd", `${timeEnd}`);
    params.append("border", `${border}`);
    params.append("rotationRate", `${rotationRate}`);
    params.append("rotationUnitPrice", `${rotationUnitPrice}`);
    params.append("rotationNumberTotal", `${rotationNumberTotal}`);
    params.append("workAmount", `${getWorkAmount()}`);
    params.append("machineName", `${machineName}`);
    params.append("storeName", `${storeName}`);
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
      <Container className={`pt-3 ${isCorrectBallNumberConfirm ? "" : styles.bg_warning}`}>
        <Row>
          <Col>
            <p className="mb-0">
              回転単価：<span>{rotationUnitPrice}</span>
            </p>
            <p className="mb-0">
              総回転数：<span>{rotationNumberTotal}</span>
            </p>
            <p className="mb-0">
              仕事量：<span>{getWorkAmount()}</span>
            </p>

            <Row></Row>
            <Row>
              <Button className="mb-1" variant="primary" onClick={() => deleteOneRotation()}>
                1行削除
              </Button>
              <Button className="mb-1" variant="primary" onClick={() => toPrevPage()}>
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

            <Row className="m-0 mb-2">
              <NumberButtons setRotationNumberInputed={setRotationNumberInputed} rotationNumberInputed={rotationNumberInputed} />
              <Button variant="primary" className="col-4" onClick={() => clearRotationNumberInputed()}>
                C
              </Button>
              <Button variant="primary" className="col-4"></Button>
              <Button variant="primary" className="col-4" onClick={() => rotation()}>
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
              />
            </Row>

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
                <InputGroup.Prepend>
                  <InputGroup.Text>ボーダー</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl value={border} data-testid="border" onChange={changeBorder} type="number" />
              </InputGroup>
            </Row>
            <Row>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>店名</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="select" value={storeName} onChange={changeStoreNamesSelect} ref={selectStoreRef}>
                  <StoreNames storeNames={STORE_NAMES} />
                </Form.Control>
              </InputGroup>
            </Row>
            <Row>
              <div className="mr-2">交換率:</div>
              <div>{exchangeRate}</div>
            </Row>
            <Row>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>機種名</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl value={machineName} onChange={changeMachineName} />
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
            <ListGroup className="rotationList" ref={rotationListRef}>
              <Rotations rotations={rotations} />
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
