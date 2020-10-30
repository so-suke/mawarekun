import { useState } from "react";
import styled from "styled-components";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, FormControl, Button, ListGroup } from "react-bootstrap";

const ShrinkNameButton = styled(Button)`
  font-size: 0.4rem;
`;

function App() {
  const [rotationNumberInputed, setRotationNumberInputed] = useState("0");
  const [investmentCnt, setInvestmentCnt] = useState(0);

  const [rotations, setRotations] = useState([]);

  const replenishmentAmount = 500;
  const diffBetweenReplenishmentAmountAndThousandYen = 1000 / replenishmentAmount;

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
      content = `${rotation.rotationNumber} > start`;
    } else if (rotation.type === rotationType.normal) {
      content = `${rotation.rotationNumber} 18.0 21.0`;
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

  function rotation() {
    if (_isResetStarted() === false) {
      alert(`リセットスタートをしましょう`);
      return;
    }

    setInvestmentCnt(investmentCnt + 1);

    const rotationNumberLast = rotations[rotations.length - 1].rotationNumber;

    const rotationNumberDiffFromLast = rotationNumberInputed - rotationNumberLast;

    const ratioOfTotalInvestmentAmountToThousandYen = 1000 / (replenishmentAmount * investmentCnt);

    setRotations(
      rotations.concat({
        type: rotationType.normal,
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
              総回転数：<span></span>
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
              <ShrinkNameButton variant="primary" className="col-4">
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
