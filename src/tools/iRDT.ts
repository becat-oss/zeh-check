import { sum } from 'src/tools/matrix';

/**
 * iRDTの最適解を計算する。
 * @param t0 卓越周期[s]
 * @param m 1質点系の建物質量[ton]
 * @param md 1基あたりのダンパー質量[ton]
 * @param nd ダンパー基数[基]
 * @returns 質量比[-]、一基当たりの最適減衰係数[kNs/m/基]、最適支持部材剛性[kN/m/基]
 */
export function iRDTOptParam(t0: number, m: number, md: number, nd: number): [number, number, number] {
  const w0 = 2 * Math.PI / t0;
  const mdTotal = md * nd;
  const mu = mdTotal / m;
  const betaOpt = (1 - Math.sqrt(1 - 4 * mu)) / (2 * mu);
  const hdOpt = Math.sqrt(3 * (1 - Math.sqrt(1 - 4 * mu))) / 4;
  const wdOpt = betaOpt * w0;
  const kbOpt = wdOpt**2 * mdTotal / nd;
  const cdOpt = hdOpt * 2 * mdTotal * wdOpt / nd;

  return [mu, cdOpt, kbOpt];
}

export function iRDTOptParamMdof(w0: number, ms: number[], vectors: number[], mds: number[]) {
  const dVectors2 = vectors.map((v, i) => {
    const pv = i > 0 ? vectors[i - 1] : 0;
    return (v - pv)**2;
  });
  // const muH = sum(ms.map((m, i) => levels[i] * m * vectors[i]));
  const mo = sum(ms.map((m, i) => m * vectors[i]**2));
  const me = sum(mds.map((md, i) => md * dVectors2[i]**2));
  const mu = me / mo;
  const gamma = (1 - 2 * mu - Math.sqrt(1 - 4 * mu)) / (2 * mu) + 1;
  const h = Math.sqrt((3 * (gamma - 1)) / (8 * ((gamma - 1) + 1)));
  const kb = mds.map(md => md * (w0 * gamma)**2);
  const cd = mds.map(md => 2 * md * w0 * gamma * h);

  return {
    mu,
    gamma,
    h,
    kb,
    cd,
  };
}
