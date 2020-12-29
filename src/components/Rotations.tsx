import React from "react";
import { TypeRotation } from "../types";
import { ROTATION_MODE } from "../constants/main";
import { ListGroup } from "react-bootstrap";

export function Rotations(props: { rotations: TypeRotation[] }) {
  return (
    <>
      {props.rotations.map((rotation, index) => {
        let content = "";
        if (rotation.type === ROTATION_MODE.resetStart) {
          content = `${rotation.rotationNumber} --start--`;
        } else if (rotation.type === ROTATION_MODE.continueStart) {
          content = `${rotation.rotationNumber} > start`;
        } else if (rotation.type === ROTATION_MODE.normal) {
          content = `${rotation.rotationNumber} ${rotation.rotationRateMostRecent} ${rotation.rotationRate}`;
        }
        return <ListGroup.Item key={index}>{content}</ListGroup.Item>;
      })}
    </>
  );
}
