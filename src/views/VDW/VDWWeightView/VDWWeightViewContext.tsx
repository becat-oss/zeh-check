import React, { useState, useContext, useMemo } from 'react';
import { VDWTypes, VDWType, VDWConnectionStructures, VDWConnectionStructure } from "src/types";

interface VDWWeightViewState {
  type: VDWType;
  setType: (type: VDWType) => void;
  structure: VDWConnectionStructure;
  setStructure: (structure: VDWConnectionStructure) => void;
  h: number | '';
  setH: (h: number | '') => void;
  w: number | '';
  setW: (w: number | '') => void;
  a: number | '';
  aError: string;
  setA: (a: number | '') => void;
  b: number | '';
  bError: string;
  setB: (b: number | '') => void;
  c: number | '';
  cError: string;
  setC: (c: number | '') => void;
  d: number | '';
  dError: string;
  setD: (d: number | '') => void;
  fPlLength: number | '';
  fPlLengthError: string;
  setFPlLength: (fPlLength: number | '') => void;
  fPlWidth: number | '';
  fPlWidthError: string;
  setFPlWidth: (fPlWidth: number | '') => void;
  fPlThicknessUpper: number | '';
  fPlThicknessUpperError: string;
  setFPlThicknessUpper: (fPlThicknessUpper: number | '') => void;
  fPlThicknessLower: number | '';
  fPlThicknessLowerError: string;
  setFPlThicknessLower: (fPlThicknessLower: number | '') => void;
  sideWallWidth: number | '';
  sideWallWidthError: string;
  setSideWallWidth: (sideWallWidth: number | '') => void;
  libPlNumber: number | '';
  libPlNumberError: string;
  setLibPlNumber: (libPlNumber: number | '') => void;
  cChanNumber: number | '';
  cChanNumberError: string;
  setCChanNumber: (cChanNumber: number | '') => void;
  intervalKeeperThicknessSide: number | '';
  intervalKeeperThicknessSideError: string;
  setIntervalKeeperThicknessSide: (intervalKeeperThickness: number | '') => void;
  intervalKeeperThicknessLower: number | '';
  intervalKeeperThicknessLowerError: string;
  setIntervalKeeperThicknessLower: (intervalKeeperThickness: number | '') => void;
  arError: string;
  maxSizeError: string;
  error: boolean;
}

const initialState: VDWWeightViewState = {
  type: VDWTypes[0],
  setType: () => {},
  structure: VDWConnectionStructures[0],
  setStructure: () => {},
  h: 2500,
  setH: () => {},
  w: 2500,
  setW: () => {},
  a: 280,
  aError: '',
  setA: () => {},
  b: 90,
  bError: '',
  setB: () => {},
  c: 100,
  cError: '',
  setC: () => {},
  d: 40,
  dError: '',
  setD: () => {},
  fPlLength: 2440,
  fPlLengthError: '',
  setFPlLength: () => {},
  fPlWidth: 440,
  fPlWidthError: '',
  setFPlWidth: () => {},
  fPlThicknessUpper: 45,
  fPlThicknessUpperError: '',
  setFPlThicknessUpper: () => {},
  fPlThicknessLower: 40,
  fPlThicknessLowerError: '',
  setFPlThicknessLower: () => {},
  sideWallWidth: 260,
  sideWallWidthError: '',
  setSideWallWidth: () => {},
  libPlNumber: 4,
  libPlNumberError: '',
  setLibPlNumber: () => {},
  cChanNumber: 4,
  cChanNumberError: '',
  setCChanNumber: () => {},
  intervalKeeperThicknessSide: 9,
  intervalKeeperThicknessSideError: '',
  setIntervalKeeperThicknessSide: () => {},
  intervalKeeperThicknessLower: 12,
  intervalKeeperThicknessLowerError: '',
  setIntervalKeeperThicknessLower: () => {},
  arError: "",
  maxSizeError: "",
  error: false,
};

export const VDWWeightViewContext = React.createContext<VDWWeightViewState>(initialState);

interface VDWWeightViewProviderProps {
  children: React.ReactNode;
}

export function VDWWeightViewProvider({ children }: VDWWeightViewProviderProps): React.ReactElement {
  const [type, setType] = useState(initialState.type);
  const [structure, setStructure] = useState(initialState.structure);
  const [h, setH] = useState(initialState.h);
  const [w, setW] = useState(initialState.w);
  const [a, setA] = useState(initialState.a);
  const [b, setB] = useState(initialState.b);
  const [c, setC] = useState(initialState.c);
  const [d, setD] = useState(initialState.d);
  const [fPlLength, setFPlLength] = useState(initialState.fPlLength);
  const [fPlWidth, setFPlWidth] = useState(initialState.fPlWidth);
  const [fPlThicknessUpper, setFPlThicknessUpper] = useState(initialState.fPlThicknessUpper);
  const [fPlThicknessLower, setFPlThicknessLower] = useState(initialState.fPlThicknessLower);
  const [sideWallWidth, setSideWallWidth] = useState(initialState.sideWallWidth);
  const [libPlNumber, setLibPlNumber] = useState(initialState.libPlNumber);
  const [cChanNumber, setCChanNumber] = useState(initialState.cChanNumber);
  const [intervalKeeperThicknessSide, setIntervalKeeperThicknessSide] = useState(initialState.intervalKeeperThicknessSide);
  const [intervalKeeperThicknessLower, setIntervalKeeperThicknessLower] = useState(initialState.intervalKeeperThicknessLower);
  const ar = h && w ? h / w : 0;
  const arError = ar < 0 || 1.5 < ar ? `アスペクト比（H/W）が0~1.5の範囲で指定してください。アスペクト比: ${ar}` : "";
  const   aError = "";
  const   bError = "";
  const   cError = "";
  const   dError = "";
  const   fPlLengthError = "";
  const   fPlWidthError = "";
  const   fPlThicknessUpperError = "";
  const   fPlThicknessLowerError = "";
  const   sideWallWidthError = "";
  const   libPlNumberError = "";
  const   cChanNumberError = "";
  const   intervalKeeperThicknessSideError = "";
  const   intervalKeeperThicknessLowerError = "";
  const maxSizeError = (h > 2550 && w > 2450) ? "W2450xH3300またはW4500xH2550を超えるとコストアップの可能性があります" : "";
  const error = !!(arError);

  const VDWWeightViewState = useMemo(() => {
    return {
      type,
      setType,
      structure,
      setStructure,
      h,
      setH,
      w,
      setW,
      a,
      aError,
      setA,
      b,
      bError,
      setB,
      c,
      cError,
      setC,
      d,
      dError,
      setD,
      fPlLength,
      fPlLengthError,
      setFPlLength,
      fPlWidth,
      fPlWidthError,
      setFPlWidth,
      fPlThicknessUpper,
      fPlThicknessUpperError,
      setFPlThicknessUpper,
      fPlThicknessLower,
      fPlThicknessLowerError,
      setFPlThicknessLower,
      sideWallWidth,
      sideWallWidthError,
      setSideWallWidth,
      libPlNumber,
      libPlNumberError,
      setLibPlNumber,
      cChanNumber,
      cChanNumberError,
      setCChanNumber,
      intervalKeeperThicknessSide,
      intervalKeeperThicknessSideError,
      setIntervalKeeperThicknessSide,
      intervalKeeperThicknessLower,
      intervalKeeperThicknessLowerError,
      setIntervalKeeperThicknessLower,
      arError,
      maxSizeError,
      error,
    };
  }, [type, structure, h, w, a, b, c, d, fPlLength, fPlWidth, fPlThicknessUpper, fPlThicknessLower, sideWallWidth, libPlNumber, cChanNumber, intervalKeeperThicknessSide, intervalKeeperThicknessLower, arError, maxSizeError, error]);

  return <VDWWeightViewContext.Provider value={VDWWeightViewState}>{children}</VDWWeightViewContext.Provider>;
}

export function useVDWWeightViewContext(): VDWWeightViewState {
  return useContext(VDWWeightViewContext);
}
