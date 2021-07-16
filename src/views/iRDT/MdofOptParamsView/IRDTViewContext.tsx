import React, { useState, useContext, useMemo, useCallback, useEffect } from 'react';
import * as math from 'mathjs';
import { eigen, trimNumberArray } from 'src/tools/matrix';
import { iRDTOptParamMdof } from 'src/tools/iRDT';

interface IRDTViewState {
  mu: number | "";
  setMu: (mu: number | "") => void;
  gamma: number | "";
  setGamma: (gamma: number | "") => void;
  h: number | "";
  setH: (h: number | "") => void;
  m: (number | null)[];
  mError: string;
  setM: (m: (number | null)[]) => void;
  k: (number | null)[];
  kError: string;
  setK: (k: (number | null)[]) => void;
  md: (number | null)[];
  mdError: string;
  setMd: (md: (number | null)[]) => void;
  cd: (number | null)[];
  cdError: string;
  setCd: (cd: (number | null)[]) => void;
  kb: (number | null)[];
  kbError: string;
  setKb: (kb: (number | null)[]) => void;
  values: math.MathArray | math.Matrix;
  valuesError: string;
  setValues: (m: number[][]) => void;
  vectors: math.MathArray | math.Matrix;
  vectorsError: string;
  setVectors: (k: number[][]) => void;
}

const initialM = [50000, 50000];
const initialK = [20000000, 20000000];
const initialMd = [25000, 25000];

const initialState: IRDTViewState = {
  mu: 0,
  setMu: () => {},
  gamma: 0,
  setGamma: () => {},
  h: 0,
  setH: () => {},
  m: initialM,
  mError: "",
  setM: () => {},
  k: initialK,
  kError: "",
  setK: () => {},
  md: initialMd,
  mdError: "",
  setMd: () => {},
  cd: initialMd,
  cdError: "",
  setCd: () => {},
  kb: initialMd,
  kbError: "",
  setKb: () => {},
  values: math.matrix([]),
  valuesError: "",
  setValues: () => {},
  vectors: math.matrix([]),
  vectorsError: "",
  setVectors: () => {},
};

export const IRDTViewContext = React.createContext<IRDTViewState>(initialState);

interface IRDTViewProviderProps {
  children: React.ReactNode;
}

export function IRDTViewProvider({ children }: IRDTViewProviderProps): React.ReactElement {
  const [mu, setMu] = useState(initialState.mu);
  const [gamma, setGamma] = useState(initialState.gamma);
  const [h, setH] = useState(initialState.h);
  const [m, setMAction] = useState(initialState.m);
  const [k, setKAction] = useState(initialState.k);
  const [md, setMd] = useState(initialState.md);
  const [cd, setCd] = useState(initialState.cd);
  const [kb, setKb] = useState(initialState.kb);
  const [values, setValues] = useState(initialState.values);
  const [vectors, setVectors] = useState(initialState.vectors);
  const mError ="";
  const kError ="";
  const mdError ="";
  const cdError ="";
  const kbError ="";
  const valuesError ="";
  const vectorsError ="";

  const setM = useCallback((m: (string | number | null)[]) => {
    setMAction(m.map(v => v ? Number(v) : null));
  }, []);

  const setK = useCallback((k: (string | number | null)[]) => {
    setKAction(k.map(v => v ? Number(v) : null));
  }, []);

  useEffect(() => {
    const tM = trimNumberArray(m);
    const tK = trimNumberArray(k);
    if (tM.length > 0 && tK.length > 0 && tM.length === tK.length) {
      const { values, vectors } = eigen(tM, tK);
      setValues(values);
      setVectors(vectors);
    }
  }, [k, m]);

  useEffect(() => {
    if (m.length > 0 && math.size(vectors).valueOf()[0] > 0 && md.length > 0) {
      const results = iRDTOptParamMdof(values.valueOf()[0], trimNumberArray(m), trimNumberArray(vectors.valueOf()[0]), trimNumberArray(md));
      setMu(results.mu);
      setGamma(results.gamma);
      setH(results.h);
      setCd(results.cd);
      setKb(results.kb);
    }
  }, [m, md, values, vectors]);

  const IRDTViewState = useMemo(() => {
    return {
      mu,
      setMu,
      gamma,
      setGamma,
      h,
      setH,
      m,
      mError,
      setM,
      k,
      kError,
      setK,
      md,
      mdError,
      setMd,
      cd,
      cdError,
      setCd,
      kb,
      kbError,
      setKb,
      values,
      valuesError,
      setValues,
      vectors,
      vectorsError,
      setVectors,
    };
  }, [mu, gamma, h, m, setM, k, setK, md, cd, kb, values, vectors]);

  return <IRDTViewContext.Provider value={IRDTViewState}>{children}</IRDTViewContext.Provider>;
}

export function useIRDTViewContext(): IRDTViewState {
  return useContext(IRDTViewContext);
}
