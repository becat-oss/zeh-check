import React, { useState, useContext, useMemo } from 'react';
import { VDWParam, VDWParam2 } from "src/tools/VDW";


interface VDWForceViewState {
  f0: number | '';
  f0Error: string;
  setF0: (F0: number | '') => void;
  h: number | '';
  hError: string;
  setH: (h: number | '') => void;
  w: number | '';
  wError: string;
  setW: (w: number | '') => void;
  type: 'single' | 'double';
  setType: (type: 'single' | 'double') => void;
  dy: 4 | 5;
  setDy: (dy: 4 | 5) => void;
  t: number | '';
  tError: string;
  setT: (t: number | '') => void;
  velocity: number[];
  force: number[];
  force2: number[];
  c: number[];
  q: number[];
  aw: number;
  arError: string;
  maxSizeError: string;
  error: boolean;
}

const initialState: VDWForceViewState = {
  f0: 0.5,
  f0Error: "",
  setF0: () => {},
  h: 2000,
  hError: "",
  setH: () => {},
  w: 2000,
  wError: "",
  setW: () => {},
  type: 'double',
  setType: () => {},
  dy: 4,
  setDy: () => {},
  t: 20,
  tError: "",
  setT: () => {},
  velocity: [],
  force: [],
  force2: [],
  c: [],
  q: [],
  aw: 0,
  arError: "",
  maxSizeError: "",
  error: false,
};

let velocity: number[] = [];
let force: number[] = [];
let force2: number[] = [];
let c: number[] = [];
let q: number[] = [];
let aw = 0;

export const VDWForceViewContext = React.createContext<VDWForceViewState>(initialState);

interface VDWForceViewProviderProps {
  children: React.ReactNode;
}

export function VDWForceViewProvider({ children }: VDWForceViewProviderProps): React.ReactElement {
  const [f0, setF0] = useState(initialState.f0);
  const [h, setH] = useState(initialState.h);
  const [w, setW] = useState(initialState.w);
  const [type, setType] = useState(initialState.type);
  const [dy, setDy] = useState(initialState.dy);
  const [t, setT] = useState(initialState.t);

  const f0Error = f0 < 0.2 || 1 < f0 ? "0.2~1.0の範囲で指定してください。" : "";
  const hError = h < 500 || 5000 < h ? "500~5000の範囲で指定してください。" : "";
  const wError = w < 500 || 5000 < w ? "500~5000の範囲で指定してください。" : "";
  const tError = t < 10 || 35 < t ? "10~35の範囲で指定してください。" : "";
  const ar = h && w ? h / w : 0;
  const arError = ar < 0 || 1.5 < ar ? `アスペクト比（H/W）が0~1.5の範囲で指定してください。アスペクト比: ${ar.toFixed(2)}` : "";
  const maxSizeError = (h > 2550 && w > 2450) ? "W2450xH3300またはW4500xH2550を超えるとコストアップの可能性があります" : "";
  const error = !!(f0Error || hError || wError || tError || arError);

  if (f0 && h && w && t) {
    [velocity, force] = VDWParam(f0, h, w, type, dy, t);
    [, force2, c, q, aw] = VDWParam2(f0, h, w, type, dy, t);
  }

  const VDWForceViewState = useMemo(() => {
    return {
      f0,
      f0Error,
      setF0,
      h,
      hError,
      setH,
      w,
      wError,
      setW,
      type,
      setType,
      dy,
      setDy,
      t,
      tError,
      setT,
      velocity,
      force,
      force2,
      c,
      q,
      aw,
      arError,
      maxSizeError,
      error,
    };
  }, [f0, f0Error, h, hError, w, wError, type, dy, t, tError, arError, maxSizeError, error]);

  return <VDWForceViewContext.Provider value={VDWForceViewState}>{children}</VDWForceViewContext.Provider>;
}

export function useVDWForceViewContext(): VDWForceViewState {
  return useContext(VDWForceViewContext);
}
