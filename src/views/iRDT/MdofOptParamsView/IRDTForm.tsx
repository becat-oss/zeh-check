import React, { useState, useCallback } from 'react';
import { DataSheetGrid, textColumn, keyColumn } from 'react-datasheet-grid';
import * as math from 'mathjs';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useIRDTViewContext } from './IRDTViewContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }),
);

type Data = {
  m: number | null;
  k: number | null;
  md: number | null;
}[];

interface DataSource {
  [key: string]: (number | string | null)[] | math.Matrix | math.MathArray;
}

const createData = (source: DataSource): Data => {
  const dataKeys = Object.keys(source);
  const minLength = Math.min(...dataKeys.map((k) => (Array.isArray(source[k]) ? (source[k] as (number | string | null)[]).length : 100000)));

  const data: Data = [];
  for (let i = 0; i < minLength; i++) {
    let element: Data[number] = { m: null, k: null, md: null };
    dataKeys.forEach((k) => {
      element = {
        ...element,
        [k]: source[k][i],
      };
    });

    data.push(element);
  }
  return data;
};

function fromData<K extends keyof Data[number]>(data: Data, key: K): Data[number][K][] {
  const values = data.map((v) => v[key]);
  return values;
}

const IRDTForm: React.VFC = () => {
  const classes = useStyles();
  const { m, setM, k, setK, md, setMd } = useIRDTViewContext();
  const [data, setData] = useState<Data>(
    createData({
      m,
      k,
      md,
    }),
  );

  const columns = [
    { ...keyColumn('m', textColumn), title: '質量[ton]' },
    { ...keyColumn('k', textColumn), title: '剛性[kN/m]' },
    { ...keyColumn('md', textColumn), title: 'ダンパー質量[ton]' },
  ];

  const handleChange = useCallback(
    (values: Data) => {
      setData(values);
      setM(fromData(values, 'm'));
      setK(fromData(values, 'k'));
      setMd(fromData(values, 'md'));
    },
    [setK, setM, setMd],
  );

  return (
    <>
      <DataSheetGrid data={data} onChange={handleChange} columns={columns} />
    </>
  );
};

export default IRDTForm;
