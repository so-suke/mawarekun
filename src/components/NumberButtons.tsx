import React from "react";
import { Button } from "react-bootstrap";

export function NumberButtons(props: { setRotationNumberInputed: Function; rotationNumberInputed: string }) {
  const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
  return (
    <>
      {numbers.map((number) => (
        <Button key={number} variant="primary" className="col-4" onClick={() => props.setRotationNumberInputed(props.rotationNumberInputed + number)}>
          {number}
        </Button>
      ))}
    </>
  );
}
