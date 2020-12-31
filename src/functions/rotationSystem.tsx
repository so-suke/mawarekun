import { TypeRotation } from "../types";
import { ERROR_MSG, ROTATION_MODE } from "../constants/main";

// 継続スタート
export function continueStart(
  rotationNumberInputed: string,
  rotationRate: number,
  rotations: TypeRotation[],
  setRotations: Function,
  clearRotationNumberInputed: Function
) {
  try {
    if (rotationNumberInputed === "") {
      throw ERROR_MSG.rotaionNumberEmpty;
    }

    setRotations(
      rotations.concat({
        type: ROTATION_MODE.continueStart,
        rotationNumber: Number(rotationNumberInputed),
        rotationRateMostRecent: 0,
        rotationRate,
      })
    );

    clearRotationNumberInputed();
  } catch (error) {
    alert(error);
  }
}
