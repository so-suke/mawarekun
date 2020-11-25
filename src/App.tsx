import React, { useState, useRef, useEffect, useMemo } from "react";
import styled from "styled-components";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, FormControl, Button, ListGroup, InputGroup } from "react-bootstrap";
import { format } from "date-fns";

import { getdoubleDigestNumber } from "./utils/number";

const ShrinkNameButton = styled(Button)`
  font-size: 0.4rem;
`;

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
  const [exchangeRate, setExchangeRate] = useState<string>("4");

  const rotationListRef = useRef<HTMLDivElement>(null);

  const replenishmentAmount = 500;
  const ratioOfReplenishmentAmountToThousandYen = 1000 / replenishmentAmount;

  const rotationType = {
    normal: "normal",
    continueStart: "continueStart",
    resetStart: "resetStart",
  };

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

  // 初回描画時に実行
  useEffect(() => {
    // ローカルストレージに「回転配列」があるか確認
    const investmentCntGettedFromLocalStorage = localStorage.getItem("investmentCnt");
    const rotationsGettedFromLocalStorage = localStorage.getItem("rotations");
    if (investmentCntGettedFromLocalStorage === null) return;
    if (rotationsGettedFromLocalStorage === null) return;

    const rotationsParsed = JSON.parse(rotationsGettedFromLocalStorage);

    // 存在する場合
    // 回転配列から回転率と総回転数を求める

    const rotationRateCalculatted = calcRotationRateFromRotations(rotationsParsed);
    const rotationNumberTotalCalculatted = calcTotalRotationNumberFromRotations(rotationsParsed);

    setRotationRate(rotationRateCalculatted);
    setTotalRotationNumber(rotationNumberTotalCalculatted);
    setInvestmentCnt(Number(investmentCntGettedFromLocalStorage));
    setRotations(rotationsParsed);
  }, []);

  useEffect(() => {
    (rotationListRef as any).current.scrollTop = (rotationListRef as any).current.scrollHeight;
    localStorage.setItem("rotations", JSON.stringify(rotations));
  }, [rotations]);

  useEffect(() => {
    localStorage.setItem("investmentCnt", "" + investmentCnt);
  }, [investmentCnt]);

  function isResetStarted() {
    return rotations.length > 0 && rotations[0].type === rotationType.resetStart;
  }

  // change系
  function changeBorder(event: React.ChangeEvent<HTMLInputElement>) {
    setBorder(event.target.value);
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

    let rotationNumberInputedClone = rotationNumberInputed;

    // 入力された回転数が3桁未満の場合かつ前回の回転数が3桁のとき
    if (rotationNumberInputedClone.length < 3 && String(rotations[rotations.length - 1].rotationNumber).length === 3) {
      // 前回の回転数を百の位の数とそれ以外に分ける
      const numberOfHundreds = String(rotations[rotations.length - 1].rotationNumber).slice(0, 1);
      const lastTwoDigits = String(rotations[rotations.length - 1].rotationNumber).slice(1, 3);
      // 下2桁よりも回転数が大きければ、百の位の数+回転数としたものを回転数とする。
      if (Number(rotationNumberInputedClone) > Number(lastTwoDigits)) {
        rotationNumberInputedClone = numberOfHundreds + getdoubleDigestNumber(Number(rotationNumberInputedClone));
      } else {
        rotationNumberInputedClone = String(Number(numberOfHundreds) + 1) + getdoubleDigestNumber(Number(rotationNumberInputedClone));
      }
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

  function getRotationsTextForCopyToClickboard() {
    const dateNowFormated = format(new Date(), "yyyy/MM/dd HH:mm");
    const text = `${dateNowFormated}
回転率：${rotationRate}, 仕事量：${rotationUnitPrice}円×${totalRotationNumber}回(${_getWorkAmount()}円)`;
    return text;
  }

  function setClipboard() {
    const text = getRotationsTextForCopyToClickboard();
    navigator.clipboard.writeText(text);
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
    setRotations(
      rotations.concat({
        type: rotationType.resetStart,
        rotationNumber: Number(rotationNumberInputed),
        rotationRateMostRecent: 0,
        rotationRate: 0,
      })
    );

    clearRotationNumberInputed();
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
              総回転数：<span>{totalRotationNumber}</span>
            </p>
            <p className="mb-0">
              仕事量：<span>{_getWorkAmount()}</span>
            </p>

            <Row>
              <Button className="mr-1 mb-1" variant="primary" onClick={() => setClipboard()}>
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
                  <InputGroup.Text>交換率</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl value={exchangeRate} onChange={changeExchangeRate} />
              </InputGroup>
            </Row>

            <Row>
              <Button className="mt-5" variant="primary" onClick={() => deleteAllRotation()}>
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
