import React, { useState, useContext, useMemo } from 'react';
import { iRDTOptParam } from 'src/tools/iRDT';

interface IRDTViewState {
  t0: number | '';
  t0Error: string;
  setT0: (t0: number | '') => void;
  m: number | '';
  mError: string;
  setM: (m: number | '') => void;
  md: number | '';
  mdError: string;
  setMd: (md: number | '') => void;
  nd: number | '';
  ndError: string;
  setNd: (nd: number | '') => void;
  mu: number;
  cdOpt: number;
  kbOpt: number;
  error: boolean;
}

const initialT0 = 1;
const initialM = 100000;
const initialMd = 1000;
const initialNd = 5;

const initialState: IRDTViewState = {
  t0: initialT0,
  t0Error: "",
  setT0: () => {},
  m: initialM,
  mError: "",
  setM: () => {},
  md: initialMd,
  mdError: "",
  setMd: () => {},
  nd: initialNd,
  ndError: "",
  setNd: () => {},
  mu: 0,
  cdOpt: 0,
  kbOpt: 0,
  error: false,
};

export const IRDTViewContext = React.createContext<IRDTViewState>(initialState);

interface IRDTViewProviderProps {
  children: React.ReactNode;
}

let mu;
let cdOpt;
let kbOpt;

export function IRDTViewProvider({ children }: IRDTViewProviderProps): React.ReactElement {
  const [t0, setT0] = useState(initialState.t0);
  const [m, setM] = useState(initialState.m);
  const [md, setMd] = useState(initialState.md);
  const [nd, setNd] = useState(initialState.nd);
  const t0Error = t0 <= 0 || 10 < t0 ? "0~10の範囲で指定してください。" : "";
  const mError = m <= 0 || 1000000 < m ? "0~1000000の範囲で指定してください。" : "";
  const mdError = md <= 0 || 10000 < md ? "0~10000の範囲で指定してください。" : "";
  const ndError = nd <= 0 || 1000 < nd ? "0~1000の範囲で指定してください。" : "";
  const error = !!(t0Error || mError || mdError || ndError);

  if (t0 && m && md && nd) {
    [mu, cdOpt, kbOpt] = iRDTOptParam(t0, m, md, nd);
  }

  const IRDTViewState = useMemo(() => {
    return {
      t0,
      t0Error,
      setT0,
      m,
      mError,
      setM,
      md,
      mdError,
      setMd,
      nd,
      ndError,
      setNd,
      mu,
      cdOpt,
      kbOpt,
      error,
    };
  }, [error, m, mError, md, mdError, nd, ndError, t0, t0Error]);

  return <IRDTViewContext.Provider value={IRDTViewState}>{children}</IRDTViewContext.Provider>;
}

export function useIRDTViewContext(): IRDTViewState {
  return useContext(IRDTViewContext);
}
