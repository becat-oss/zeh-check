import React, { useMemo } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputExample from "src/components/InputExample";
import { vb } from "src/tools/VDW";
import { useVDWForceViewContext } from "./VDWForceViewContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textDecoration: "underline",
    },
    margin: {
      margin: theme.spacing(2),
    },
  }),
);

export default function VDWInputExample() {
  const classes = useStyles();
  const { h, f0, dy, c, q, aw } = useVDWForceViewContext();

  const headersDynamicPro = [
    "モデルタイプ",
    "K(kN/cm)",
    "Co(kN・sec/cm)",
    "V1(cm/sec)",
    "C1(kN・sec/cm)",
    "V2(cm/sec)",
    "C2(kN・sec/cm)",
    "V3(cm/sec)",
    "C3(kN・sec/cm)",
    "V4(cm/sec)",
    "C4(kN・sec/cm)",
    "取付けバネ(kN / cm)",
  ];

  const dataDynamicPro = useMemo(() => [
    "maxwellモデル",
    0,
    c[0].toFixed(1),
    vb[2],
    ((q[3] - q[2]) / (vb[3] - vb[2])).toFixed(1),
    vb[3],
    ((q[5] - q[3]) / (vb[5] - vb[3])).toFixed(1),
    vb[5],
    ((q[6] - q[5]) / (vb[6] - vb[5])).toFixed(1),
    vb[6],
    0,
    5000,
  ], [c, q]);

  const headersSNAP8 = [
    "名称",
    "K-DB-種別",
    "K-DB-会社",
    "K-DB-製品",
    "K-DB-型番",
    "装置特性-種別",
    "装置特性-質量(t)",
    "装置特性-せん断断面積(mm~2)",
    "装置特性-せん断隙間(mm)",
    "装置特性-振動数(Hz)",
    "装置特性-荷重(kN)",
    "装置特性-p1",
    "装置特性-p2",
    "装置特性-p3",
    "装置特性-剛性(kN/mm)",
    "取付け剛性(kN/mm)",
    "装置高さ(mm)",
    "重量-種別",
    "重量-重量(kN/m,kN)",
    "温度(℃)-標準",
    "温度(℃)-下限",
    "温度(℃)-上限",
    "変動係数-自動生成",
    "変動係数-下限-質量",
    "変動係数-下限-減衰",
    "変動係数-下限-剛性",
    "変動係数-下限-荷重",
    "変動係数-上限-質量",
    "変動係数-上限-減衰",
    "変動係数-上限-剛性",
    "変動係数-上限-荷重",
  ];

  const dataSNAP8 = useMemo(() => [
    "VDW",
    "0:使用しない",
    "",
    "",
    "",
    "2:免制震ﾃﾞｨﾊﾞｲｽV型(EAV)",
    0,
    (aw * 10e6).toFixed(0),
    dy,
    f0,
    0,
    0,
    0,
    0,
    0,
    500,
    (h || 0) * 1000,
    "0:単位長さ重量",
    0,
    20,
    30,
    10,
    "1:する",
    1,
    0.9,
    1,
    1,
    1,
    1.1,
    1,
    1,
  ], [aw, dy, f0, h]);
// csv 多質点 変動
  return (
    <>
      <Typography
        color="primary"
        variant="h6"
        gutterBottom
        className={classes.title}
      >
        Dynamic Pro
      </Typography>
      <Typography gutterBottom>
        ポリリニア型ダッシュポットモデルに関するデータ
      </Typography>
      <InputExample headers={headersDynamicPro} data={dataDynamicPro} />
      <div className={classes.margin} />
      <Typography
        color="primary"
        variant="h6"
        gutterBottom
        className={classes.title}
      >
        SNAP version8
      </Typography>
      <Typography gutterBottom>粘性ダンパー</Typography>
      <InputExample headers={headersSNAP8} data={dataSNAP8} />
    </>
  );
}
