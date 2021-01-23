import React, { useState, useRef, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, FormControl, Form, Button, ListGroup, InputGroup } from "react-bootstrap";
import { format } from "date-fns";
// 型定義インポート
import { TypeRotation } from "./types";
// 定数定義インポート
import {
  STORE_NAMES,
  STORE_NAMES_EXCHANGE_RATES_MAP,
  EXCHANGE_RATE_NORMAL,
  AMOUNT_ONE_PUSH,
  REST_URL_SPREADSHEET,
  REPLENISHMENT_AMOUNT,
  REPLENISHMENT_AMOUNT_RATIO,
  ROTATION_MODE,
  ERROR_MSG,
} from "./constants";

import { ContinueStartButton } from "./components/ContinueStartButton";
import { ResetStartButton } from "./components/ResetStartButton";
import { NumberButtons } from "./components/NumberButtons";
import { Rotations } from "./components/Rotations";
import { StoreNames } from "./components/StoreNames";

const axios = require("axios").default;

function App() {
  // useState定義
  const [rotationNumberInputed, setRotationNumberInputed] = useState<string>("");
  const [rotations, setRotations] = useState<TypeRotation[]>([]);
  const [rotationRate, setRotationRate] = useState(0);
  const [investmentCnt, setInvestmentCnt] = useState(0);
  const [rotationNumberTotal, setRotationNumberTotal] = useState(0);
  const [border, setBorder] = useState<string>("18.0");
  const [storeName, setStoreName] = useState("");
  const [machineName, setMachineName] = useState("");
  const [ballNumberComfirm, setBallNumberComfirm] = useState("");
  const [remarks, setRemarks] = useState("");
  const [exchangeRate, setExchangeRate] = useState<string>("");
  // useRef定義
  const rotationListRef = useRef<HTMLDivElement>(null);
  const selectStoreRef = useRef<HTMLSelectElement>(document.createElement("select"));

  // 初回描画時に実行
  useEffect(() => {
    // ローカルストレージから各値を取得。
    const investmentCntLocal: string = localStorage.getItem("investmentCnt") || "0";
    const rotationsParsed: TypeRotation[] = JSON.parse(localStorage.getItem("rotations") || "[]");
    const storeNameLocal: string = localStorage.getItem("storeName") || "";
    const machineNameLocal: string = localStorage.getItem("machineName") || "";
    const ballNumberComfirmLocal: string = localStorage.getItem("ballNumberComfirm") || "";
    const borderLocal: string = localStorage.getItem("border") || "";
    const remarksLocal: string = localStorage.getItem("remarks") || "";

    setInvestmentCnt(Number(investmentCntLocal));
    setStoreName(storeNameLocal);
    setRotations(rotationsParsed);
    setMachineName(machineNameLocal);
    setBallNumberComfirm(ballNumberComfirmLocal);
    setBorder(borderLocal);
    setRemarks(remarksLocal);
    setRotationRate(calcRotationRate(rotationsParsed));
    setRotationNumberTotal(calcRotationNumberTotal(rotationsParsed));
  }, []);

  useEffect(() => {
    (rotationListRef as any).current.scrollTop = (rotationListRef as any).current.scrollHeight;
    localStorage.setItem("rotations", JSON.stringify(rotations));
  }, [rotations]);

  useEffect(() => {
    localStorage.setItem("investmentCnt", "" + investmentCnt);
  }, [investmentCnt]);

  useEffect(() => {
    localStorage.setItem("border", border);
  }, [border]);

  useEffect(() => {
    localStorage.setItem("ballNumberComfirm", ballNumberComfirm);
  }, [ballNumberComfirm]);

  useEffect(() => {
    localStorage.setItem("remarks", remarks);
  }, [remarks]);

  useEffect(() => {
    // 選択肢の店名が変更されたら、対応した交換率へ変更する。
    const storeExchangeRate = STORE_NAMES_EXCHANGE_RATES_MAP.get(storeName);
    setExchangeRate(String(storeExchangeRate));

    localStorage.setItem("storeName", storeName);
  }, [storeName]);

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
    localStorage.setItem("machineName", machineName);
  }

  // 備考の変更
  function changeRemarks(event: React.ChangeEvent<HTMLInputElement>) {
    const remarksInputed = event.target.value;
    setRemarks(remarksInputed);
  }

  // 回転数入力ミス防止用玉数の変更
  function changeBallNumberComfirm(event: React.ChangeEvent<HTMLInputElement>) {
    const ballNumberComfirm = event.target.value;
    setBallNumberComfirm(ballNumberComfirm);
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
  function getBallNumberOnePush(storeName: string): number {
    const exchangeRateDefault = "4";
    const ballNumberOnePushDefault = 125;
    try {
      if (!STORE_NAMES_EXCHANGE_RATES_MAP.has(storeName)) {
        throw new Error(ERROR_MSG.notExpectedStoreName);
      }
      const storeExchangeRate: string = STORE_NAMES_EXCHANGE_RATES_MAP.get(storeName) || exchangeRateDefault;
      return Number((AMOUNT_ONE_PUSH / Number(storeExchangeRate)).toFixed());
    } catch (error) {
      alert(error);
      return ballNumberOnePushDefault;
    }
  }

  //　回転配列を1行削除する。
  function deleteOneRotation() {
    const rotationsLength = rotations.length;

    if (rotationsLength === 0) return;

    // 投資回数の調整
    const lastRotation = rotations[rotations.length - 1];
    if (lastRotation.type === ROTATION_MODE.normal) {
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
      setRotationRate(rotationsDeleted[rotationsDeleted.length - 1].rotationRate);
    }

    // 総回転数の更新
    if (lastRotation.type === ROTATION_MODE.normal && rotationsDeleted.length > 0) {
      const rotationNumberDiffShouldSub =
        rotations[rotations.length - 1].rotationNumber - rotationsDeleted[rotationsDeleted.length - 1].rotationNumber;
      setRotationNumberTotal(rotationNumberTotal - rotationNumberDiffShouldSub);
    }

    setRotations(rotationsDeleted);

    // 確認用玉数を計算
    setBallNumberComfirm(String(Number(ballNumberComfirm) + getBallNumberOnePush(storeName)));
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
    return rotations[rotations.length - 1].rotationRate;
  }

  function deleteAllRotation() {
    if (window.confirm("全行削除してもいいですか？")) {
      setRotations([]);
      setRotationRate(0);
      setInvestmentCnt(0);
      setRotationNumberTotal(0);
      setBallNumberComfirm("");
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

  // 回転数の短縮入力の判別
  function shouldShortInput() {
    return String(rotationNumberInputed).length < 3 && String(rotations[rotations.length - 1].rotationNumber).length > 1;
  }

  // 回転数の短縮入力：回転数が4桁以下の場合のみ対応（5桁以上は不必要のため、未検証）
  function getRotationNumberByShortInputIfNeeded(): number {
    let rotationNumberInputedClone: number = Number(rotationNumberInputed);
    if (shouldShortInput()) {
      // 最後の回転数の桁数
      const digitsLastRotation = String(rotations[rotations.length - 1].rotationNumber).length;
      // 短縮判定の際に比較する桁数（2なので10の位まで）
      // 99なら99, 101なら1, 199なら99, 1010なら10
      const digitsCompare = 2;
      const numberBeCompared: number = Number(
        String(rotations[rotations.length - 1].rotationNumber).slice(digitsLastRotation - digitsCompare, digitsLastRotation)
      );
      // ベースとなる数を作成する。（ベースとは、100倍して・・・）
      const baseNumberSourceMayBeMovedUp = String(rotations[rotations.length - 1].rotationNumber).slice(0, digitsLastRotation - digitsCompare);
      const baseNumberSource: number =
        rotationNumberInputedClone > numberBeCompared ? Number(baseNumberSourceMayBeMovedUp) : Number(baseNumberSourceMayBeMovedUp) + 1;

      // 入力回転数にベース数（100倍されたもの）を足す。
      const multipleBaseNumber = 100;
      const baseNumber: number = baseNumberSource * multipleBaseNumber;
      rotationNumberInputedClone += baseNumber;
    }

    return rotationNumberInputedClone;
  }

  // 通常回転（回転ボタン押下時の処理）
  function rotation() {
    try {
      if (isResetStarted() === false) {
        throw ERROR_MSG.resetStart;
      }

      // 投資回数の計算
      const investmentCntNow = investmentCnt + 1;
      // 必要であれば短縮入力を効かせる。
      const rotationNumberInputedClone = getRotationNumberByShortInputIfNeeded();
      const rotationNumberDiffFromLast = Number(rotationNumberInputedClone) - rotations[rotations.length - 1].rotationNumber;
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
      setBallNumberComfirm(String(Number(ballNumberComfirm) - getBallNumberOnePush(storeName)));
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="App">
      <Container className="pt-3">
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

            <Row>
              <Button className="mb-1" variant="primary" onClick={() => deleteOneRotation()}>
                1行削除
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
                <FormControl value={ballNumberComfirm} onChange={changeBallNumberComfirm} type="number" />
              </InputGroup>
            </Row>
            <Row>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>ボーダー</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl value={border} onChange={changeBorder} />
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
