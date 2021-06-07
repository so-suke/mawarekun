export type TypeRotation = {
  type: string;
  rotationNumber: number;
  rotationRateMostRecent: number;
  rotationRate: number;
};

export type TypeStoreName = string;

export type TypeErrorMsg = {
  resetStart: string;
  resetStartedAlready: string;
  rotaionNumberEmpty: string;
  selectStore: string;
  notExpectedStoreName: string;
  bigHitBallNumberBeforeBigThanAfter: string;
};
