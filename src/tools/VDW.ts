const mu = 9; // 粘性体粘度[kNs/m2]
const div = 2000;
const vMax = 25; // [kine]

// 簡易式
export function VDWParam(
  f0: number,  // [mm]
  h: number,  // [mm]
  w: number,  // [mm]
  type: 'single' | 'double',
  dy: number,  // [mm]
  t: number,
): [number[], number[]] {
  h = h / 1000;
  w = w / 1000;
  dy = dy / 10;

  const cType = type === 'single' ? 2 : 4;
  const hole = (Math.ceil(w / 0.59) - 1) * Math.ceil((h - 0.57) / 0.5);
  const aw = ((w - 0.2) * (h - 0.37) - (0.055 ** 2 * Math.PI + 0.08 * 0.11) * hole) * cType;
  const ar = h / w;
  const alpha = 1 - 0.0935 * f0 * ar;
  const cw = mu * Math.exp(-0.055 * (t - 30)) * Math.exp(-0.876 * f0 ** 0.5) * Math.exp(0.0178 * f0 * (t - 30)) * aw / dy * alpha;
  const dv = Math.fround(2 * Math.PI * f0 * 7);
  const velocity = new Array(div).fill(0).map((_, i) => Math.round(dv / 2000 * i * 1000) / 1000).filter(v => v <= vMax);
  const force = velocity.map(v => cw * v ** ((0.942 + 0.574 * f0 - 0.413 * f0 ** 2) - (0.228 - 0.114 * f0) * Math.log(v)));

  return [velocity, force];
}

export const vb = [0, 1.5, 3, 5, 7.5, 10, 20];

// 増分式
export function VDWParam2(
  f0: number,  // [mm]
  h: number,  // [mm]
  w: number,  // [mm]
  type: 'single' | 'double',
  dy: number,  // [mm]
  t: number,
): [number[], number[], number[], number[], number] {
  h = h / 1000;
  w = w / 1000;
  dy = dy / 10;

  const cType = type === 'single' ? 2 : 4;
  const hole = (Math.ceil(w / 0.59) - 1) * Math.ceil((h - 0.57) / 0.5);
  const aw = ((w - 0.2) * (h - 0.37) - (0.055 ** 2 * Math.PI + 0.08 * 0.11) * hole) * cType;
  const ar = h / w;
  const alpha = 1 - 0.0935 * f0 * ar;
  const mu2 = mu * Math.exp(1) ** (-0.055 * (t - 30) - 0.876 * Math.sqrt(f0) + 0.0178 * f0 * (t - 30));
  const cw = alpha * mu2 * aw / dy;
  const dv = Math.fround(2 * Math.PI * f0 * 7);
  const velocity = new Array(div).fill(0).map((_, i) => Math.round(dv / 2000 * i * 1000) / 1000).filter(v => v <= vMax);
  const baseVelocityIndex = velocity.map(v => {
    if (v < vb[1]) {
      return 0;
    } else if (v < vb[2]) {
      return 1;
    } else if (v < vb[3]) {
      return 2;
    } else if (v < vb[4]) {
      return 3;
    } else if (v < vb[5]) {
      return 4;
    } else if (v < vb[6]) {
      return 5;
    } else {
      return 6;
    }
  });
  const q = [];
  const kappa = [];
  const c = [];
  const ca = [];
  for (let i = 0; i < vb.length; i++) {
    const v = vb[i];

    const qi = i === 0 ? 0 : c[i-1]*v**kappa[i-1]+c[i-1]*vb[i-1]**kappa[i-1]-q[i-1];
    const kappai = 1 - 0.05 * v / f0 ** 0.82 < 0 ? 0 : 1 - 0.05 * v / f0 ** 0.82;
    const cai = i === 0 ? 1 : ca[i -1] * v ** (kappa[i - 1] - kappai);
    q.push(qi);
    kappa.push(kappai);
    ca.push(cai);
    c.push(cai * cw);
  }
  const d = baseVelocityIndex.map((vi, i) => {
    if (i === 0) return 0;
    if (i === 1) return c[vi];
    const pvi = baseVelocityIndex[i - 1];
    return c[pvi] * kappa[pvi] * velocity[i - 1] ** (kappa[pvi] - 1);
  });

  const force = [];
  for (let i = 0; i < d.length; i++) {
    force.push(i === 0 ? 0 : force[i - 1] + d[i] * (velocity[i] - velocity[i - 1]));    
  }

  return [velocity, force, c, q, aw];
}

const steelSG = 7.85;
const viscousElementSG = 1;
const outerWallThickness = 0.9;
const innerWallThickness = 1.2;
const sideWallThickness = 1.6;
const innerWallFBThickness = 1.6;
const dy = 0.4;

export function VDWWeight(
  type: 'single' | 'double',
  h: number,  // [mm]
  w: number,  // [mm]
  a: number,  // [mm]
  b: number,  // [mm]
  c: number,  // [mm]
  d: number,  // [mm]
  fPlLength: number,  // [mm]
  fPlWidth: number,  // [mm]
  fPlThicknessUpper: number,  // [mm]
  fPlThicknessLower: number,  // [mm]
  sideWallWidth: number,  // [mm]
  libPlNumber: number,
  cChanNumber: number,
  intervalKeeperThicknessSide: number,  // [mm]
  intervalKeeperThicknessLower: number,  // [mm]
): [number, number, number] {
  h = h / 1000;  // [m]
  w = w / 1000;  // [m]
  a = a / 10;  // [cm]
  b = b / 10;  // [cm]
  c = c / 1000;  // [m]
  d = d / 10;  // [cm]
  fPlLength = fPlLength / 1000;  // [m]
  fPlWidth = fPlWidth / 1000;  // [m]
  fPlThicknessUpper = fPlThicknessUpper / 10;  // [cm]
  fPlThicknessLower = fPlThicknessLower / 10;  // [cm]
  sideWallWidth = sideWallWidth / 10;  // [cm]
  intervalKeeperThicknessSide = intervalKeeperThicknessSide / 10;  // [cm]
  intervalKeeperThicknessLower = intervalKeeperThicknessLower / 10;  // [cm]

  const single = type === "single";
  const typeFactor = single ? 1 : 2;
  const ab = (a + b) / 100;
  const eHeight = h - ab;
  const eWidth = w - c * 2;
  const notchNumber = (Math.ceil(w / 0.59) - 1) * Math.ceil((h - 0.57) / 0.5);
  const notchArea = (5.5 ** 2 * Math.PI) + ((19 - 11) * 11);

  // 上部フランジPL uf
  const ufL = fPlLength * 100; // [cm]
  const ufW = fPlWidth * 100; // [cm]
  const ufT = fPlThicknessUpper; // [cm]
  const ufV = ufL * ufW * ufT; // [cm3]
  const ufWeight = ufV * steelSG / 1000; // [kg]

  // 側壁/枚 sw
  const swHeight = (h * 100) - (a - 8.7) - fPlThicknessLower; // [cm]
  const swWidth = sideWallWidth; // [cm]
  const swThickness = sideWallThickness; // [cm]
  const swVolume = swHeight * swWidth * swThickness; // [cm3]
  const swUnitWeight = swVolume * steelSG / 1000; // [kg]
  const swWeight = swUnitWeight * 2; // [kg]

  // 内壁/枚 iw
  const iwHeight = (h * 100) - fPlThicknessUpper - b; // [cm]
  const iwWidth = eWidth * 100 + 0.2 * 2; // [cm]
  const iwThickness = innerWallThickness; // [cm]
  const iwVolume = (iwHeight * iwWidth) * iwThickness; // [cm3]
  const iwUnitWeight = iwVolume * steelSG / 1000; // [kg]
  const iwWeight = iwUnitWeight * typeFactor; // [kg]

  // 外壁/枚(液溜りアングル除く) ow
  const owHeight = (h * 100) - (a + 1.3) - fPlThicknessLower; // [cm]
  const owWidth = (w * 100) - sideWallThickness - sideWallThickness; // [cm]
  const owThickness = outerWallThickness; // [cm]
  const owVolume = owHeight * owWidth * owThickness; // [cm3]
  const owUnitWeight = owVolume * steelSG / 1000; // [kg]
  const owWeight = owUnitWeight * 2; // [kg]

  // 中板 ip
  const ipHeight = (h * 100) - fPlThicknessLower - a + 2; // [cm]
  const ipWidth = (w * 100) - sideWallThickness - sideWallThickness; // [cm]
  const ipThickness = innerWallThickness; // [cm]
  const ipVolume = ipHeight * ipWidth * ipThickness; // [cm3]
  const ipWeight = ipVolume * steelSG / 1000; // [kg]

  // 粘性体(切欠考慮) ve
  const veDyVolume = dy * (eHeight * 100) * (eWidth * 100 + 0.2 * 2) * 2 * typeFactor; // [cm3]
  const veUpperPool = ((4.5 * 4.7 - 1 ** 2 + 1 ** 2 * Math.PI / 4) * (eWidth * 100 + 0.2 * 2) * 2) +
    (single ? 0 : ((dy * 4.7 * (eWidth * 100 + 0.2 * 2) * 2) + (innerWallThickness * 1 * (eWidth * 100 + 0.2 * 2)))); // [cm3]

  const veLowerPool = (b - fPlThicknessLower - intervalKeeperThicknessLower) * (dy + innerWallThickness + dy) * (eWidth * 100 + 0.2 * 2) * typeFactor; // [cm3]
  const veNotch = (notchArea * innerWallThickness * notchNumber) * typeFactor; // [cm3]
  // eslint-disable-next-line max-len
  const veMovingPart = ((c * 100 - 0.2) - sideWallThickness) * (dy + innerWallThickness + dy) * (h * 100 - fPlThicknessLower - a) * 2 * typeFactor + ((4.5 * 2 + innerWallThickness + (single ? 0 : dy + innerWallThickness + dy + innerWallThickness)) * 4.7 * (c * 100 - 0.2 - sideWallThickness)) * 2; // [cm3]
  const veVolume = veDyVolume + veUpperPool + veLowerPool + veNotch + veMovingPart; // [cm3]
  const veWeight = veVolume * viscousElementSG / 1000; // [kg]

  // 液溜りアングル(L100×100×13(加工))/個 pa
  const paUnitWeightPerLength = 191; // (JIS G 3192) [g/cm]
  const paWidth = (w * 100) - sideWallThickness - sideWallThickness; // [cm]
  const paUnitWeight = paUnitWeightPerLength * paWidth / 1000; // [kg]
  const paWeight = paUnitWeight * 2; // [kg]

  // Cチャンネル(C150×75×9×12.5)/個 cc
  const ccWeightPerLength = 240; // [g/cm] (JIS G 3192)
  const ccWidth = (w * 100) - sideWallThickness - sideWallThickness; // [cm]
  const ccUnitWeight = ccWeightPerLength * ccWidth / 1000; // [kg]
  const ccWeight = ccUnitWeight * cChanNumber; // [kg]

  // 上部リブPL/枚(面取含まず) ul
  const ulHeight = 10; // [cm]
  const ulWidth = (fPlWidth * 100 / 2) - (innerWallThickness / 2) - dy - innerWallThickness - d; // [cm]
  const ulThickness = 1.6; // [cm]
  const ulUnitVolume = ulHeight * ulWidth * ulThickness; // [cm3]
  const ulUnitWeight = ulUnitVolume * steelSG / 1000; // [kg]
  const ulWeight = ulUnitWeight * libPlNumber; // [kg]

  // 下部リブPL/枚(面取含まず) ll
  const llHeight = 10; //[cm]
  const llWidth = (fPlWidth * 100 / 2) - (innerWallThickness / 2) - dy - innerWallThickness - dy - outerWallThickness - d; // [cm]
  const llThickness = 1.6; // [cm]
  const llUnitVolume = llHeight * llWidth * llThickness; // [cm3]
  const llUnitWeight = llUnitVolume * steelSG / 1000; // [kg]
  const llWeight = llUnitWeight * libPlNumber; // [kg]

  // FB fb
  const fbUpper = innerWallFBThickness * (innerWallThickness + dy + dy) * (eWidth * 100 + 0.2 * 2); // [cm3]
  // eslint-disable-next-line max-len
  const fbLower = single ? (intervalKeeperThicknessLower * (dy + innerWallThickness + dy) * ((w * 100) - sideWallThickness - sideWallThickness)) * 2 : (intervalKeeperThicknessLower * (dy + innerWallThickness + dy) * ((w * 100) - sideWallThickness - sideWallThickness)) + (intervalKeeperThicknessLower * (dy + innerWallThickness + dy - 0.5) * ((w * 100) - sideWallThickness - sideWallThickness)); // [cm3]
  const fbSide = intervalKeeperThicknessSide * (dy + innerWallThickness + dy) * ((h * 100) - a + 8.7 - fPlThicknessLower) * 4; // [cm3]
  const fbVolume = fbLower + fbSide + (single ? 0 : fbUpper); // [cm3]
  const fbWeight = fbVolume * steelSG / 1000; // [kg]

  // 下部フランジPL lf
  const lfLength = fPlLength * 100; // [cm]
  const lfWidth = fPlWidth * 100; // [cm]
  const lfThickness = fPlThicknessLower; // [cm]
  const lfVolume = lfLength * lfWidth * lfThickness; // [cm3]
  const lfWeight = lfVolume * steelSG / 1000; // [kg]

  // 総重量
  const steelWeight = ufWeight + swWeight + iwWeight + owWeight + paWeight + ccWeight + ulWeight + llWeight + fbWeight + lfWeight + (single ? 0 : ipWeight); // [kg]
  const weight = steelWeight + veWeight; // [kg]

  return [steelWeight, veWeight, weight];
}
