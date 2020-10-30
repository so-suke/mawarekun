import { useState } from "react";
import styled from "styled-components";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, FormControl, Button, ListGroup } from "react-bootstrap";

const ShrinkNameButton = styled(Button)`
  font-size: 0.4rem;
`;

function App() {
  const [rotationNumberInputed, setRotationNumberInputed] = useState("0");
  const [rotations, setRotations] = useState([]);
  const [sampleNumber, setSampleNumber] = useState(0);

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

  function changeRotationNumberInputed(event) {
    setRotationNumberInputed(event.target.value);
  }

  function _isResetStarted() {
    return rotations.length !== 0 && rotations[0].type === rotationType.resetStart;
  }

  function clearRotationNumberInputed() {
    setRotationNumberInputed("");
  }

  function _calcInvestmentCnt() {
    let investmentCnt = 0;
    rotations.forEach((rotation) => {
      if (rotation.type !== rotationType.normal) return;

      investmentCnt++;
    });

    return investmentCnt;
  }

  function _getTotalRotationNumber() {
    let totalRotationNumber = 0;
    let rotationNumberLast = 0;
    rotations.forEach((rotation) => {
      if (rotation.type !== rotationType.normal) {
        rotationNumberLast = Number(rotation.rotationNumber);
      }

      totalRotationNumber += Number(rotation.rotationNumber) - rotationNumberLast;
      rotationNumberLast = Number(rotation.rotationNumber);
    });

    return totalRotationNumber;
  }

  function rotation() {
    if (_isResetStarted() === false) {
      alert(`リセットスタートをしましょう`);
      return;
    }

    const rotationNumberLast = rotations[rotations.length - 1].rotationNumber;

    const rotationNumberDiffFromLast = rotationNumberInputed - rotationNumberLast;
    const rotationRateMostRecent = (rotationNumberDiffFromLast * ratioOfReplenishmentAmountToThousandYen).toFixed(1);

    const investmentCnt = _calcInvestmentCnt() + 1;
    const ratioOfTotalInvestmentAmountToThousandYen = 1000 / (replenishmentAmount * investmentCnt);

    const totalRotationNumber = _getTotalRotationNumber() + rotationNumberDiffFromLast;
    const rotationRate = (totalRotationNumber * ratioOfTotalInvestmentAmountToThousandYen).toFixed(1);

    setRotations(
      rotations.concat({
        type: rotationType.normal,
        rotationRateMostRecent,
        rotationRate,
        rotationNumber: rotationNumberInputed,
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
        rotationNumber: rotationNumberInputed,
      })
    );

    clearRotationNumberInputed();
  }

  function resetStart() {
    if (rotationNumberInputed === "") {
      alert(`回転数を入力しましょう`);
      return;
    }
    setRotations(
      rotations.concat({
        type: rotationType.resetStart,
        rotationNumber: rotationNumberInputed,
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
              回転単価：<span></span>
            </p>
            <p className="mb-0">
              総回転数：<span>{_getTotalRotationNumber()}</span>
            </p>
            <p className="mb-0">
              仕事量：<span></span>
            </p>
            <Button variant="primary">1行削除</Button>
            <FormControl id="rotationNumberInput" value={rotationNumberInputed} onChange={changeRotationNumberInputed} placeholder="回転数入力" />

            <Row>
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
          </Col>
          <Col>
            <ListGroup>{$rotations}</ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
