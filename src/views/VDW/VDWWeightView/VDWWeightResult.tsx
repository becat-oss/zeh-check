import React from "react";
import Typography from "@material-ui/core/Typography";
import { VDWWeight } from "src/tools/VDW";
import { useVDWWeightViewContext } from "./VDWWeightViewContext";


let steelWeight = 0;
let veWeight = 0;
let weight = 0;

export default function VDWWeightResult() {
  const {
    type,
    h,
    w,
    a,
    b,
    c,
    d,
    fPlLength,
    fPlWidth,
    fPlThicknessUpper,
    fPlThicknessLower,
    sideWallWidth,
    libPlNumber,
    cChanNumber,
    intervalKeeperThicknessSide,
    intervalKeeperThicknessLower,
  } = useVDWWeightViewContext();

  if (
    h &&
    w &&
    a &&
    b &&
    c &&
    d &&
    fPlLength &&
    fPlWidth &&
    fPlThicknessUpper &&
    fPlThicknessLower &&
    sideWallWidth &&
    libPlNumber &&
    cChanNumber &&
    intervalKeeperThicknessSide &&
    intervalKeeperThicknessLower) {
    [steelWeight, veWeight, weight] = VDWWeight(
      type,
      h,
      w,
      a,
      b,
      c,
      d,
      fPlLength,
      fPlWidth,
      fPlThicknessUpper,
      fPlThicknessLower,
      sideWallWidth,
      libPlNumber,
      cChanNumber,
      intervalKeeperThicknessSide,
      intervalKeeperThicknessLower,
    );
  }

  return (
    <>
      <Typography>鋼材重量：{steelWeight.toFixed(0)}[kg]</Typography>
      <Typography>粘性体重量：{veWeight.toFixed(0)}[kg]</Typography>
      <Typography>総重量：{weight.toFixed(0)}[kg]</Typography>
    </>
  );
}
