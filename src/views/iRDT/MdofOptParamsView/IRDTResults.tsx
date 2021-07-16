import React, { useState, useEffect, useMemo } from 'react';
import { DataSheetGrid, textColumn, keyColumn } from 'react-datasheet-grid';
import * as math from 'mathjs';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useIRDTViewContext } from './IRDTViewContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      margin: theme.spacing(1),
    },
  }),
);

type Data = {
  value: math.Matrix | math.MathArray;
  vector: math.Matrix | math.MathArray;
  cd: number | null;
  kb: number | null;
}[];

interface DataSource {
  [key: string]: (number | string | null)[] | math.Matrix | math.MathArray;
}

const createData = (source: DataSource): Data => {
  const dataKeys = Object.keys(source);
  const minLength = Math.min(...dataKeys.map((k) => (Array.isArray(source[k]) ? (source[k] as (number | string | null)[]).length : 100000)));

  const data: Data = [];
  for (let i = 0; i < minLength; i++) {
    let element: Data[number] = { value: [], vector: [], cd: null, kb: null };
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

const IRDTResults: React.VFC = () => {
  const classes = useStyles();
  const { values: value, mu, gamma, h, cd: cds, kb: kbs, vectors: vector } = useIRDTViewContext();

  const values = useMemo(() => {
    return (value.valueOf() as number[]).map(v => v.toFixed(2));
  }, [value]);

  const vectors = useMemo(() => {
    return (math.size(vector).valueOf()[0] ? vector.valueOf()[0] : [] as number[]).map(v => v.toFixed(2));
  }, [vector]);

  const cd = useMemo(() => {
    return cds.map(v => v.toFixed(2));
  }, [cds]);

  const kb = useMemo(() => {
    return kbs.map(v => v.toFixed(2));
  }, [kbs]);

  const [data, setData] = useState<Data>(
    createData({
      values,
      vectors,
      cd,
      kb,
    }),
  );

  const columns = [
    { ...keyColumn('values', textColumn), title: '固有周期[s]', disabled: true },
    { ...keyColumn('vectors', textColumn), title: '１次モード固有ベクトル[-]', disabled: true },
    { ...keyColumn('cd', textColumn), title: 'ダンパー最適減衰係数[kNs/m]', disabled: true },
    { ...keyColumn('kb', textColumn), title: 'ダンパー最適支持部材剛性[kN/m]', disabled: true },
  ];

  useEffect(() => {
    setData(
      createData({
        values,
        vectors,
        cd,
        kb,
      }),
    );
  }, [cd, kb, values, vectors]);

  return (
    <>
      <Typography className={classes.text}>有効質量比 {Number(mu).toFixed(3)}[-]</Typography>
      <Typography className={classes.text}>ダンパー振動数比 {Number(gamma).toFixed(3)}[-]</Typography>
      <Typography className={classes.text}>減衰定数 {Number(h).toFixed(3)}[-]</Typography>
      <DataSheetGrid data={data} columns={columns} lockRows disableContextMenu />
    </>
  );
};

export default IRDTResults;
