import React from "react";
import Image from "next/image";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import { useVDWForceViewContext } from "./VDWForceViewContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      "& > *": {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    imageWrapper: {
      flexGrow: 1,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      backgroundColor: theme.palette.common.white,
      borderRadius: theme.spacing(2),
    },
    image: {
      padding: theme.spacing(2),
      maxWidth: 400,
    },
  }),
);

export default function VDWForm() {
  const classes = useStyles();
  const {
    h,
    hError,
    setH,
    w,
    wError,
    setW,
    dy,
    setDy,
    f0,
    f0Error,
    setF0,
    t,
    tError,
    setT,
    type,
    setType,
    arError,
    maxSizeError,
  } = useVDWForceViewContext();

  return (
    <>
      <Grid container className={classes.imageWrapper} spacing={2}>
        <Grid container item xs={12} sm={6} alignItems="center">
          <div className={classes.image}>
            <Image
              src="/images/VDW/VDWDesign.png"
              width={2584 / 2}
              height={2044 / 2}
            />
          </div>
        </Grid>
        <Grid container item xs={12} sm={6} alignItems="center">
          <div className={classes.image}>
            <Image
              src="/images/VDW/VDWType.png"
              width={1954 / 2}
              height={1053 / 2}
            />
          </div>
        </Grid>
      </Grid>
      <form className={classes.form}>
        <FormControl>
          <InputLabel id="type-label">タイプ</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as "single" | "double")}
          >
            <MenuItem value="single">シングル</MenuItem>
            <MenuItem value="double">ダブル</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="height"
          label="高さ H[mm]"
          type="number"
          required
          value={h}
          error={!!hError || !!arError || !!maxSizeError}
          helperText={hError || arError || maxSizeError}
          onChange={(e) => setH(e.target.value ? Number(e.target.value) : "")}
        />
        <TextField
          id="width"
          label="幅 W[mm]"
          type="number"
          required
          value={w}
          error={!!wError || !!arError || !!maxSizeError}
          helperText={wError}
          onChange={(e) => setW(e.target.value ? Number(e.target.value) : "")}
        />
        <TextField
          id="freq"
          label="1次固有振動数[Hz]"
          type="number"
          required
          value={f0}
          error={!!f0Error}
          helperText={f0Error}
          onChange={(e) => setF0(e.target.value ? Number(e.target.value) : "")}
          inputProps={{ step: 0.01 }}
        />
        <TextField
          id="temp"
          label="温度[℃]"
          type="number"
          required
          value={t}
          error={!!tError}
          helperText={tError}
          onChange={(e) => setT(e.target.value ? Number(e.target.value) : "")}
          inputProps={{ step: 0.1 }}
        />
        <FormControl>
          <InputLabel id="dy-label">せん断隙間[mm]</InputLabel>
          <Select
            labelId="dy-label"
            id="dy"
            value={dy}
            onChange={(e) => setDy(Number(e.target.value) as 4 | 5)}
          >
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </form>
    </>
  );
}
