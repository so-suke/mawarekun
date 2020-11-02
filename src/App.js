import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, FormControl, Button, ListGroup, InputGroup } from "react-bootstrap";

const ShrinkNameButton = styled(Button)`
  font-size: 0.4rem;
`;

function App() {
  const [border, setBorder] = useState(18.0);

  const [rotationNumberInputed, setRotationNumberInputed] = useState("");
  const [rotations, setRotations] = useState([]);
  const [rotationUnitPrice, setRotationUnitPrice] = useState(0);
  const [rotationRate, setRotationRate] = useState(0);
  const [totalRotationNumber, setTotalRotationNumber] = useState(0);

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

  useEffect(() => {
    setRotationNumberInputed("0");
    const $resetStartButton = document.getElementById("resetStartButton");
    setTimeout(() => {
      $resetStartButton.click();
    }, 1);
  }, []);

  function changeBorder(event) {
    setBorder(event.target.value);
    setRotationUnitPrice(_calcRotationUnitPrice({ border: event.target.value, rotationRate }));
  }
  function changeRotationNumberInputed(event) {
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

  const _calcRotationUnitPrice = ({ border, rotationRate }) => {
    if (rotationRate === 0) return 0;
    return (1000 / border - 1000 / rotationRate).toFixed(1);
  };

  function deleteOneRotation() {
    const rotationsLength = rotations.length;

    const rotationsDeletedOne = rotations.filter((rotation, index) => {
      return index !== rotationsLength - 1;
    });

    if (rotationsDeletedOne.length > 0) {
      const rotationNumberDiffShouldSub =
        rotations[rotations.length - 1].rotationNumber - rotationsDeletedOne[rotationsDeletedOne.length - 1].rotationNumber;
      setTotalRotationNumber(totalRotationNumber - rotationNumberDiffShouldSub);
      const rotationRateNow = rotationsDeletedOne[rotationsDeletedOne.length - 1].rotationRate;
      setRotationRate(rotationRateNow);
      setRotationUnitPrice(_calcRotationUnitPrice({ border, rotationRate: rotationRateNow }));
    }

    setRotations(rotationsDeletedOne);
  }

  function _calcInvestmentCnt() {
    let investmentCnt = 0;
    rotations.forEach((rotation) => {
      if (rotation.type !== rotationType.normal) return;

      investmentCnt++;
    });

    return investmentCnt;
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

    const totalRotationNumberPrev = totalRotationNumber;
    const totalRotationNumberNow = totalRotationNumberPrev + rotationNumberDiffFromLast;
    setTotalRotationNumber(totalRotationNumberNow);
    const rotationRateNow = (totalRotationNumberNow * ratioOfTotalInvestmentAmountToThousandYen).toFixed(1);

    setRotationRate(rotationRateNow);
    setRotationUnitPrice(_calcRotationUnitPrice({ border, rotationRate: rotationRateNow }));

    setRotations(
      rotations.concat({
        type: rotationType.normal,
        rotationRateMostRecent,
        rotationRate: rotationRateNow,
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
        rotationRate,
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
        rotationRate: 0,
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
            <InputGroup size="sm" className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>ボーダー</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl value={border} onChange={changeBorder} />
            </InputGroup>

            <p className="mb-0">
              回転単価：<span>{rotationUnitPrice}</span>
            </p>
            <p className="mb-0">
              総回転数：<span>{totalRotationNumber}</span>
            </p>
            <p className="mb-0">
              仕事量：<span>{_getWorkAmount()}</span>
            </p>

            <Button className="mb-1" variant="primary" onClick={() => deleteOneRotation()}>
              1行削除
            </Button>

            <FormControl
              className="mb-1"
              id="rotationNumberInput"
              value={rotationNumberInputed}
              onChange={changeRotationNumberInputed}
              placeholder="回転数入力"
            />

            <Row className="m-0">
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
