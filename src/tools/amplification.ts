import { complex, multiply, divide, add, abs, MathType, Complex } from 'mathjs';

const j = complex(0, 1);
const lambdaMin = 0;
const lambdaMax = 2;
const div = 500;

export function kdIRDT(md: number, cd: number, kb: number, w: number): MathType {
  const kd = divide(1, add(1 / kb, divide(1, add(-md * w**2, multiply(cd * w, j)))));

  return kd;
}

export function amp1DOF(m: number, c: number, k: number, kd: (w?: number) => MathType = () => 0): [number[], number[]] {
  const w0 = Math.sqrt(k / m);
  const wMin = w0 * lambdaMin;
  const wMax = w0 * lambdaMax;
  const dW = (wMax - wMin) / div;

  const ws = new Array(div).fill(0).map((_, i) => i * dW + wMin);
  const lambdas = ws.map(w => Number((w / w0).toFixed(2)));
  const amp = ws.map(w => {
    const iAmp = divide(m * w**2, add(add(add(-m * w**2, multiply(c * w, j)), k), kd(w))) as Complex;
    return Number(abs(iAmp));
  });

  return [lambdas, amp];
}
