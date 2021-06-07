import React from "react";
import { Button } from "react-bootstrap";
import styles from "../cssModules/NumberButtons.module.css";

export function NumberButtons(props: { setRotationNumberInputed: Function; rotationNumberInputed: string; getStyleSizeTenKey: Function }) {
  const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];

  return (
    <>
      {numbers.map((number) => (
        <Button
          key={number}
          className={`col-4 ${styles.font_button}`}
          onClick={() => props.setRotationNumberInputed(props.rotationNumberInputed + number)}
          style={props.getStyleSizeTenKey()}
        >
          {number}
        </Button>
      ))}
    </>
  );
}
