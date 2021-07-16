import React from "react";
import Image from "next/image";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { VDWType, VDWConnectionStructure } from "src/types";
import { useVDWWeightViewContext } from "./VDWWeightViewContext";

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
    },
    accordion: {
      width: "100%",
    },
    details: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }),
);

export default function VDWForm() {
  const classes = useStyles();
  const {
    type,
    setType,
    structure,
    setStructure,
    h,
    setH,
    w,
    setW,
    a,
    aError,
    setA,
    b,
    bError,
    setB,
    c,
    cError,
    setC,
    d,
    dError,
    setD,
    fPlLength,
    fPlLengthError,
    setFPlLength,
    fPlWidth,
    fPlWidthError,
    setFPlWidth,
    fPlThicknessUpper,
    fPlThicknessUpperError,
    setFPlThicknessUpper,
    fPlThicknessLower,
    fPlThicknessLowerError,
    setFPlThicknessLower,
    sideWallWidth,
    sideWallWidthError,
    setSideWallWidth,
    libPlNumber,
    libPlNumberError,
    setLibPlNumber,
    cChanNumber,
    cChanNumberError,
    setCChanNumber,
    intervalKeeperThicknessSide,
    intervalKeeperThicknessSideError,
    setIntervalKeeperThicknessSide,
    intervalKeeperThicknessLower,
    intervalKeeperThicknessLowerError,
    setIntervalKeeperThicknessLower,
    arError,
    maxSizeError,
  } = useVDWWeightViewContext();

  return (
    <>
      <Grid container className={classes.imageWrapper} spacing={2}>
        <Grid container item xs={12} alignItems="center">
          <div className={classes.image}>
            <Image
              src={`/images/VDW/VDWMass_${type}.png`}
              width={3134}
              height={2766}
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
            onChange={(e) => setType(e.target.value as VDWType)}
          >
            <MenuItem value="single">シングル</MenuItem>
            <MenuItem value="double">ダブル</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="type-label">取付部の構造</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            value={structure}
            onChange={(e) => {
              setStructure(e.target.value as VDWConnectionStructure);
            }}
          >
            <MenuItem value="steel">S造</MenuItem>
            <MenuItem value="concrete">RC造</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="height"
          label="高さ H[mm]"
          type="number"
          required
          value={h}
          error={!!arError || !!maxSizeError}
          helperText={arError || maxSizeError}
          onChange={(e) => setH(e.target.value ? Number(e.target.value) : "")}
        />
        <TextField
          id="width"
          label="幅 W[mm]"
          type="number"
          required
          value={w}
          error={!!arError || !!maxSizeError}
          onChange={(e) => setW(e.target.value ? Number(e.target.value) : "")}
        />
        <div className={classes.accordion}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>詳細設定</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                id="a"
                label="a[mm]"
                type="number"
                required
                value={a}
                error={!!aError}
                helperText={aError}
                onChange={(e) =>
                  setA(e.target.value ? Number(e.target.value) : "")
                }
              />
              <TextField
                id="b"
                label="b[mm]"
                type="number"
                required
                value={b}
                error={!!bError}
                helperText={bError}
                onChange={(e) =>
                  setB(e.target.value ? Number(e.target.value) : "")
                }
              />
              <TextField
                id="c"
                label="c[mm]"
                type="number"
                required
                value={c}
                error={!!cError}
                helperText={cError}
                onChange={(e) =>
                  setC(e.target.value ? Number(e.target.value) : "")
                }
              />
              <TextField
                id="d"
                label="d[mm]"
                type="number"
                required
                value={d}
                error={!!dError}
                helperText={dError}
                onChange={(e) =>
                  setD(e.target.value ? Number(e.target.value) : "")
                }
              />
              <TextField
                id="fPlLength"
                label="フランジPL長さ[mm]"
                type="number"
                required
                value={fPlLength}
                error={!!fPlLengthError}
                helperText={fPlLengthError}
                onChange={(e) =>
                  setFPlLength(e.target.value ? Number(e.target.value) : "")
                }
              />
              <TextField
                id="fPlWidth"
                label="フランジPL幅[mm]"
                type="number"
                required
                value={fPlWidth}
                error={!!fPlWidthError}
                helperText={fPlWidthError}
                onChange={(e) =>
                  setFPlWidth(e.target.value ? Number(e.target.value) : "")
                }
              />
              <TextField
                id="fPlThicknessUpper"
                label="上部フランジPL板厚[mm]"
                type="number"
                required
                value={fPlThicknessUpper}
                error={!!fPlThicknessUpperError}
                helperText={fPlThicknessUpperError}
                onChange={(e) =>
                  setFPlThicknessUpper(
                    e.target.value ? Number(e.target.value) : "",
                  )
                }
              />
              <TextField
                id="fPlThicknessLower"
                label="下部フランジPL板厚[mm]"
                type="number"
                required
                value={fPlThicknessLower}
                error={!!fPlThicknessLowerError}
                helperText={fPlThicknessLowerError}
                onChange={(e) =>
                  setFPlThicknessLower(
                    e.target.value ? Number(e.target.value) : "",
                  )
                }
              />
              <TextField
                id="sideWallWidth"
                label="側壁幅[mm]"
                type="number"
                required
                value={sideWallWidth}
                error={!!sideWallWidthError}
                helperText={sideWallWidthError}
                onChange={(e) =>
                  setSideWallWidth(e.target.value ? Number(e.target.value) : "")
                }
              />
              <TextField
                id="libPlNumber"
                label="リブPL個数[個/各上下]"
                type="number"
                required
                value={libPlNumber}
                error={!!libPlNumberError}
                helperText={libPlNumberError}
                onChange={(e) =>
                  setLibPlNumber(e.target.value ? Number(e.target.value) : "")
                }
              />
              <TextField
                id="cChanNumber"
                label="Cチャンネル数[個]"
                type="number"
                required
                value={cChanNumber}
                error={!!cChanNumberError}
                helperText={cChanNumberError}
                onChange={(e) =>
                  setCChanNumber(e.target.value ? Number(e.target.value) : "")
                }
              />
              <TextField
                id="intervalKeeperThicknessSide"
                label="間隔保持材厚さ(側面)[mm]"
                type="number"
                required
                value={intervalKeeperThicknessSide}
                error={!!intervalKeeperThicknessSideError}
                helperText={intervalKeeperThicknessSideError}
                onChange={(e) =>
                  setIntervalKeeperThicknessSide(
                    e.target.value ? Number(e.target.value) : "",
                  )
                }
              />
              <TextField
                id="intervalKeeperThicknessLower"
                label="間隔保持材厚さ(下部)[mm]"
                type="number"
                required
                value={intervalKeeperThicknessLower}
                error={!!intervalKeeperThicknessLowerError}
                helperText={intervalKeeperThicknessLowerError}
                onChange={(e) =>
                  setIntervalKeeperThicknessLower(
                    e.target.value ? Number(e.target.value) : "",
                  )
                }
              />
            </AccordionDetails>
          </Accordion>
        </div>
      </form>
    </>
  );
}
