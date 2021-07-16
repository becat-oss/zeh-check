import * as math from 'mathjs';

export function trimNumberArray(array: (number | string | null | undefined)[]): number[] {
  const a = [];
  for (let i = 0; i < array.length; i++) {
    const element = Number(array[i]);
    if (!Number.isNaN(element) && element !== 0) {
      a.push(element);
    } else {
      break;
    }
  }

  return a;
}

export function mMatrix(m: number[]): math.Matrix {
  const mMatrix = math.diag(m);
  return mMatrix;
}

export function kMatrix(k: number[]): math.Matrix {
  const kMatrix = k.map((k1, l) => {
    const k2 = l + 1 < k.length ? k[l + 1] : 0;
    return new Array(k.length).fill(0).map((_, r) => {
      if (l === r) {
        return k1 + k2;
      }
      if (l + 1 === r) {
        return -k2;
      }
      if (l === r + 1) {
        return -k1;
      }

      return 0;
    });
  });

  return math.matrix(kMatrix);
}

export function eigen(m: number[], k: number[]): {
  values: math.MathArray | math.Matrix;
  vectors: math.MathArray | math.Matrix;
} {
  const mM = mMatrix(m);
  const kM = kMatrix(k);
  const iMM = math.inv(mM);
  const { values: val, vectors: vec } = math.eigs(math.multiply(iMM, kM));
  const values = math.matrix(math.map(val, v => Math.sqrt(v)));
  const vectors = math.transpose(vec);
  return { values, vectors };
}

export function sum(array: number[]) {
  return array.reduce((sum, element) => sum + element, 0);
}

export function heightsToLevels(heights: number[]) {
  return heights.map((_, i, a) => heights[0] + sum(a.slice(0, i)));
}
