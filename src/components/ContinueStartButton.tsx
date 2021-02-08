import React from "react";
import { ShrinkNameButton } from "../styledComponents/ShrinkNameButton";
import { TypeRotation } from "../types";
import { ERROR_MSG, ROTATION_MODE } from "../constants";

export function ContinueStartButton(props: {
  rotationNumberInputed: string;
  rotationRate: number;
  rotations: TypeRotation[];
  clearRotationNumberInputed: Function;
  setRotations: Function;
  setIsCorrectBallNumberConfirm: Function;
}) {
  // 継続スタート
  const continueStart = () => {
    try {
      if (props.rotationNumberInputed === "") {
        throw ERROR_MSG.rotaionNumberEmpty;
      }

      props.setIsCorrectBallNumberConfirm(false);

      props.setRotations(
        props.rotations.concat({
          type: ROTATION_MODE.continueStart,
          rotationNumber: Number(props.rotationNumberInputed),
          rotationRateMostRecent: 0,
          rotationRate: props.rotationRate,
        })
      );

      props.clearRotationNumberInputed();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <ShrinkNameButton variant="primary" className="col-4" onClick={() => continueStart()}>
        継続スタート
      </ShrinkNameButton>{" "}
    </>
  );
}
