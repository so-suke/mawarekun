import React from "react";
import { format } from "date-fns";
import { ShrinkNameButton } from "../styledComponents/ShrinkNameButton";
import { TypeRotation } from "../types";
import { ERROR_MSG, ROTATION_MODE } from "../constants";

export function ResetStartButton(props: {
  rotationNumberInputed: string;
  rotations: TypeRotation[];
  selectStoreRef: React.MutableRefObject<HTMLSelectElement>;
  isResetStarted: Function;
  clearRotationNumberInputed: Function;
  setRotations: Function;
  setRemarks: Function;
}) {
  const resetStart = () => {
    try {
      if (props.isResetStarted()) {
        throw ERROR_MSG.resetStartedAlready;
      }
      if (props.rotationNumberInputed === "") {
        throw ERROR_MSG.rotaionNumberEmpty;
      }
      if (props.selectStoreRef.current.value === "") {
        throw ERROR_MSG.selectStore;
      }

      props.setRotations(
        props.rotations.concat({
          type: ROTATION_MODE.resetStart,
          rotationNumber: Number(props.rotationNumberInputed),
          rotationRateMostRecent: 0,
          rotationRate: 0,
        })
      );

      props.clearRotationNumberInputed();

      // 備考に稼働開始時間を書込
      const now = new Date();
      const startTime = format(now, "HH:mm");
      props.setRemarks((remarksNow: string) => {
        const delimiter = remarksNow === "" ? "" : "\n";
        props.setRemarks(`${remarksNow}${delimiter}開始時間：${startTime}`);
      });
      localStorage.setItem("startTime", startTime);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <ShrinkNameButton id="resetStartButton" variant="primary" className="col-4" onClick={() => resetStart()}>
        リセットスタート
      </ShrinkNameButton>
    </>
  );
}
