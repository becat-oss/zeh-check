import { GridElement } from 'src/components/DataSheet';

export const toDataSheet = (values: (number | string | null)[]): GridElement[][] => {
  const grid = values.map((v) => [{ value: v }]);
  return grid;
};

export const fromDataSheet = (data: GridElement[][]): (number | string | null)[] => {
  const values = data.map((v) => (v[0].value ? Number(v[0].value) : null));
  return values;
};
