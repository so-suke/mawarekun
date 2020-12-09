import React, { useState, useRef, useEffect, useMemo } from "react";
import styled from "styled-components";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, FormControl, Form, Button, ListGroup, InputGroup } from "react-bootstrap";
import { format } from "date-fns";

const ShrinkNameButton = styled(Button)`
  font-size: 0.4rem;
`;

// TITLES
const SELECT_STORE_TITLE: string = "店名を選択して下さい。";

// 交換率
const EXCHANGE_RATE_BASE = 4;

type RotationType = {
  type: string;
  rotationNumber: number;
  rotationRateMostRecent: number;
  rotationRate: number;
};

function App() {
  const [rotationNumberInputed, setRotationNumberInputed] = useState<string>("");
  const [rotations, setRotations] = useState<RotationType[]>([]);
  const [rotationRate, setRotationRate] = useState(0);
  const [investmentCnt, setInvestmentCnt] = useState(0);
  const [totalRotationNumber, setTotalRotationNumber] = useState(0);
  const [border, setBorder] = useState<string>("18.0");
  const [storeNames, setStoreNames] = useState<string[]>([]);
  const [storeNameSelected, setStoreNameSelected] = useState("");
  const [machineName, setMachineName] = useState("");

  const [storeNamesExchangeRatesMap, setStoreNamesExchangeRatesMap] = useState(new Map());
  const [exchangeRate, setExchangeRate] = useState<string>("");

  const rotationListRef = useRef<HTMLDivElement>(null);
  const selectStoreRef = useRef<HTMLSelectElement>(document.createElement("select"));

  const replenishmentAmount = 500;
  const ratioOfReplenishmentAmountToThousandYen = 1000 / replenishmentAmount;

  const rotationType = {
    normal: "normal",
    continueStart: "continueStart",
    resetStart: "resetStart",
  };

  // 初期値として、それぞれの「店名と交換率」を設定する。
  const initStoreNamesExchangeRates = () => {
    const storeNamesInit = ["DoruNakano", "LiNakano", "NtNakano"];
    setStoreNames(storeNamesInit);
    setStoreNamesExchangeRatesMap(storeNamesExchangeRatesMap.set(storeNamesInit[0], 4.38));
    setStoreNamesExchangeRatesMap(storeNamesExchangeRatesMap.set(storeNamesInit[1], 4));
    setStoreNamesExchangeRatesMap(storeNamesExchangeRatesMap.set(storeNamesInit[2], 4));
  };

  // 初回描画時に実行
  useEffect(() => {
    // 初期値として、それぞれの「店名と交換率」を設定する。
    initStoreNamesExchangeRates();

    // ローカルストレージから各値を取得。
    const storeNameSelectedGettedFromLocalStorage = localStorage.getItem("storeNameSelected");
    const machineNameSelectedGettedFromLocalStorage = localStorage.getItem("machineName");
    const investmentCntGettedFromLocalStorage = localStorage.getItem("investmentCnt");
    const rotationsGettedFromLocalStorage = localStorage.getItem("rotations");
    const borderGettedFromLocalStorage = localStorage.getItem("border");

    if (storeNameSelectedGettedFromLocalStorage === null) return;
    if (machineNameSelectedGettedFromLocalStorage === null) return;
    if (investmentCntGettedFromLocalStorage === null) return;
    if (rotationsGettedFromLocalStorage === null) return;
    if (borderGettedFromLocalStorage === null) return;

    setStoreNameSelected(storeNameSelectedGettedFromLocalStorage);
    setMachineName(machineNameSelectedGettedFromLocalStorage)

    const rotationsParsed = JSON.parse(rotationsGettedFromLocalStorage);

    // 存在する場合
    // 回転配列から回転率と総回転数を求める

    const rotationRateCalculatted = calcRotationRateFromRotations(rotationsParsed);
    const rotationNumberTotalCalculatted = calcTotalRotationNumberFromRotations(rotationsParsed);

    setRotationRate(rotationRateCalculatted);
    setTotalRotationNumber(rotationNumberTotalCalculatted);
    setInvestmentCnt(Number(investmentCntGettedFromLocalStorage));
    setRotations(rotationsParsed);
    setBorder(borderGettedFromLocalStorage);

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
    // 選択肢の店名が変更されたら、対応した交換率へ変更する。
    const storeExchangeRate = storeNamesExchangeRatesMap.get(storeNameSelected);
    setExchangeRate(storeExchangeRate);

    // ページ再読込に対応するため
    localStorage.setItem("storeNameSelected", storeNameSelected);
  }, [storeNameSelected]);

  function isResetStarted() {
    return rotations.length > 0 && rotations[0].type === rotationType.resetStart;
  }

  // change系
  function changeStoreNamesSelect(event: React.ChangeEvent<HTMLInputElement>) {
    setStoreNameSelected(event.target.value);
  }

  function changeBorder(event: React.ChangeEvent<HTMLInputElement>) {
    setBorder(event.target.value);
  }

  // 機種名の変更
  function changeMachineName(event: React.ChangeEvent<HTMLInputElement>) {
    const machineName = event.target.value
    setMachineName(machineName);
    localStorage.setItem("machineName", machineName);
  }

  function changeExchangeRate(event: React.ChangeEvent<HTMLInputElement>) {
    setExchangeRate(event.target.value);
  }

  function changeRotationNumberInputed(event: React.ChangeEvent<HTMLInputElement>) {
    setRotationNumberInputed(event.target.value);
  }

  function _isResetStarted() {
    return rotations.length !== 0 && rotations[0].type === rotationType.resetStart;
  }

  function clearRotationNumberInputed() {
    setRotationNumberInputed("");
  }

  function _getWorkAmount() {
    return (rotationUnitPrice * totalRotationNumber).toFixed(0);
  }

  const rotationUnitPrice = useMemo<number>(() => {
    if (rotationRate === 0) return 0;
    return Number((1000 / Number(border) - 1000 / rotationRate).toFixed(1));
  }, [border, rotationRate]);

  //　回転配列を1行削除する。
  function deleteOneRotation() {
    const rotationsLength = rotations.length;

    if (rotationsLength === 0) return;

    // 投資回数の調整
    const lastRotation = rotations[rotations.length - 1];
    if (lastRotation.type === rotationType.normal) {
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
    if (lastRotation.type === rotationType.normal && rotationsDeleted.length > 0) {
      const rotationNumberDiffShouldSub =
        rotations[rotations.length - 1].rotationNumber - rotationsDeleted[rotationsDeleted.length - 1].rotationNumber;
      setTotalRotationNumber(totalRotationNumber - rotationNumberDiffShouldSub);
    }

    setRotations(rotationsDeleted);
  }

  function calcRotationRateFromRotations(rotations: RotationType[]) {
    if (rotations.length === 0) return 0;
    return rotations[rotations.length - 1].rotationRate;
  }

  function deleteAllRotation() {
    if (window.confirm("全行削除してもいいですか？")) {
      setRotations([]);
      setRotationRate(0);
      setInvestmentCnt(0);
      setTotalRotationNumber(0);
    }
  }

  // 回転配列から総回転数を求める。
  function calcTotalRotationNumberFromRotations(rotations: RotationType[]) {
    let totalRotationNumberCalculatted = 0;
    rotations.forEach((rotation, idx) => {
      if (rotation.type === rotationType.resetStart || rotation.type === rotationType.continueStart) return;
      totalRotationNumberCalculatted += rotation.rotationNumber - rotations[idx - 1].rotationNumber;
    });
    return totalRotationNumberCalculatted;
  }

  function rotation() {
    if (_isResetStarted() === false) {
      alert(`リセットスタートをしましょう`);
      return;
    }

    const investmentCntNow = investmentCnt + 1;
    setInvestmentCnt(investmentCntNow);
    const magnificationForExchangeRate: number = Number(exchangeRate) / EXCHANGE_RATE_BASE;

    const rotationNumberLast = rotations[rotations.length - 1].rotationNumber;

    let rotationNumberInputedClone: number = Number(rotationNumberInputed);

    // 回転数の短縮入力：ひとまず回転数が3桁以下の場合のみ対応
    if (String(rotationNumberInputedClone).length < 3 && String(rotations[rotations.length - 1].rotationNumber).length > 1) {
      const convertToThreeDigits: string = ("000" + rotations[rotations.length - 1].rotationNumber).slice(-3);
      const lastTwoDigits: number = Number(String(rotations[rotations.length - 1].rotationNumber).slice(1, 3));
      const baseNumberOfHundreds: number =
        rotationNumberInputedClone > lastTwoDigits ? Number(convertToThreeDigits[0]) : Number(convertToThreeDigits[0]) + 1;

      const baseNumber: number = baseNumberOfHundreds * 100;
      rotationNumberInputedClone += baseNumber;
    }

    const rotationNumberDiffFromLast = Number(rotationNumberInputedClone) - rotationNumberLast;
    const rotationRateMostRecent = Number(
      (rotationNumberDiffFromLast * ratioOfReplenishmentAmountToThousandYen * magnificationForExchangeRate).toFixed(1)
    );

    const totalRotationNumberNow = totalRotationNumber + rotationNumberDiffFromLast;
    setTotalRotationNumber(totalRotationNumberNow);

    const ratioOfTotalInvestmentAmountToThousandYen = 1000 / (replenishmentAmount * investmentCntNow);
    const rotationRateNow = Number((totalRotationNumberNow * ratioOfTotalInvestmentAmountToThousandYen * magnificationForExchangeRate).toFixed(1));
    setRotationRate(rotationRateNow);

    setRotations(
      rotations.concat({
        type: rotationType.normal,
        rotationNumber: Number(rotationNumberInputedClone),
        rotationRateMostRecent,
        rotationRate: rotationRateNow,
      })
    );
    clearRotationNumberInputed();
  }

  function continueStart() {
    if (rotationNumberInputed === "") {
      alert(`回転数を入力しましょう`);
      return;
    }

    setRotations(
      rotations.concat({
        type: rotationType.continueStart,
        rotationNumber: Number(rotationNumberInputed),
        rotationRateMostRecent: 0,
        rotationRate,
      })
    );

    clearRotationNumberInputed();
  }

  // スプレッドシートへのペースト用テキストを取得。
  function getWorkRecordForSpreadSheet(): string {
    const now = new Date();
    const dateFormattedStart = format(now, "yyyy/MM/dd");
    const timeFormattedStart = localStorage.getItem("startTime");
    const timeFormattedNow = format(now, "HH:mm");

    const delimiter = "	";
    // 下記でも動くようであれば、後々こちらに変更する。
    // const delimiter = "\t";

    return [
      `${dateFormattedStart} ${timeFormattedStart}〜${timeFormattedNow}`,
      `ボーダー：${border}`,
      `回転率：${rotationRate}`,
      `回転単価：${rotationUnitPrice}`,
      `総回転数：${totalRotationNumber}`,
      `${_getWorkAmount()}`,
      `${machineName}`,
      `${storeNameSelected}`,
    ].join(delimiter);
  }

  // 稼働記録をコピー
  function copyWorkRecord() {
    navigator.clipboard.writeText(getWorkRecordForSpreadSheet());
  }

  function resetStart() {
    if (isResetStarted()) {
      alert("既にリセットスタートされています");
      return;
    }

    if (rotationNumberInputed === "") {
      alert(`回転数を入力しましょう`);
      return;
    }

    // 選択肢：店名の値が初期値の場合、警告を出す。
    if (selectStoreRef.current.value === "") {
      alert(`店名を選択して下さい。`);
      return;
    }

    setRotations(
      rotations.concat({
        type: rotationType.resetStart,
        rotationNumber: Number(rotationNumberInputed),
        rotationRateMostRecent: 0,
        rotationRate: 0,
      })
    );

    clearRotationNumberInputed();

    localStorage.setItem("startTime", format(new Date(), "HH:mm"));
  }

  // DOMの定義

  // 店名の選択肢
  const $storeNames = (() => {
    const $doms = [
      <option key={"defaultValue"} value="" disabled hidden>
        {SELECT_STORE_TITLE}
      </option>,
    ];
    const $storeNames = storeNames.map((store) => {
      return (
        <option key={store} value={store}>
          {store}
        </option>
      );
    });

    const $domsConcated = [$doms, ...$storeNames];
    return $domsConcated;
  })();

  const $numberButtons = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"].map((number) => (
    <Button key={number} variant="primary" className="col-4" onClick={() => setRotationNumberInputed(rotationNumberInputed + number)}>
      {number}
    </Button>
  ));

  const $rotations = rotations.map((rotation, index) => {
    let content = "";
    if (rotation.type === rotationType.resetStart) {
      content = `${rotation.rotationNumber} --start--`;
    } else if (rotation.type === rotationType.continueStart) {
      content = `${rotation.rotationNumber} > start`;
    } else if (rotation.type === rotationType.normal) {
      content = `${rotation.rotationNumber} ${rotation.rotationRateMostRecent} ${rotation.rotationRate}`;
    }
    return <ListGroup.Item key={index}>{content}</ListGroup.Item>;
  });

  return (
    <div className="App">
      <Container className="pt-3">
        <Row>
          <Col>
            <p className="mb-0">
              回転単価：<span>{rotationUnitPrice}</span>
            </p>
            <p className="mb-0">
              総回転数：<span>{totalRotationNumber}</span>
            </p>
            <p className="mb-0">
              仕事量：<span>{_getWorkAmount()}</span>
            </p>

            <Row>
              <Button className="mr-1 mb-1" variant="primary" onClick={() => copyWorkRecord()}>
                コピー
              </Button>
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
              {$numberButtons}
              <Button variant="primary" className="col-4" onClick={() => clearRotationNumberInputed()}>
                C
              </Button>
              <Button variant="primary" className="col-4"></Button>
              <Button variant="primary" className="col-4" onClick={() => rotation()}>
                回転
              </Button>
              <ShrinkNameButton variant="primary" className="col-4" onClick={() => continueStart()}>
                継続スタート
              </ShrinkNameButton>
              <ShrinkNameButton id="resetStartButton" variant="primary" className="col-4" onClick={() => resetStart()}>
                リセットスタート
              </ShrinkNameButton>
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
                <Form.Control as="select" value={storeNameSelected} onChange={changeStoreNamesSelect} ref={selectStoreRef}>
                  {$storeNames}
                </Form.Control>
              </InputGroup>
            </Row>
            <Row>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>交換率</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl value={exchangeRate} onChange={changeExchangeRate} />
              </InputGroup>
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
              <Button className="allDeteleBtn" variant="primary" onClick={() => deleteAllRotation()}>
                全行削除
              </Button>
            </Row>
          </Col>
          <Col>
            <ListGroup className="rotationList" ref={rotationListRef}>
              {$rotations}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
