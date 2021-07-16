import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useIRDTViewContext } from './IRDTViewContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }),
);


export default function IRDTForm() {
  const classes = useStyles();
  const { t0, t0Error, setT0, m, mError, setM, md, mdError, setMd, nd, ndError, setNd } = useIRDTViewContext();

  return (
    <form className={classes.form}>
      <TextField
        id="period"
        label="卓越周期[s]"
        error={!!t0Error}
        helperText={t0Error}
        type="number"
        required
        value={t0}
        onChange={(e) => setT0(e.target.value ? Number(e.target.value) : "")}
        inputProps={{ step: 0.01 }}
      />
      <TextField
        id="mass"
        label="建物総質量[ton]"
        error={!!mError}
        helperText={mError}
        type="number"
        required
        value={m}
        onChange={(e) => setM(e.target.value ? Number(e.target.value) : "")}
      />
      <TextField
        id="md"
        label="ダンパー質量[ton/基]"
        error={!!mdError}
        helperText={mdError}
        type="number"
        required
        value={md}
        onChange={(e) => setMd(e.target.value ? Number(e.target.value) : "")}
      />
      <TextField
        id="nd"
        label="ダンパー基数[基]"
        error={!!ndError}
        helperText={ndError}
        type="number"
        required
        value={nd}
        onChange={(e) => setNd(e.target.value ? Number(e.target.value) : "")}
      />
    </form>
  );
}
