import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Layout from "src/components/Layout";
import MenuCard from "src/components/MenuCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

export default function IndexView() {
  const classes = useStyles();

  return (
    <Layout>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12} sm={4}>
          <MenuCard
            title="ZEH確認ツール"
            description="一次エネルギー消費量計算結果を元にZEHの条件を満たしているかを確認するツール"
            href="/ZEH/check-condition"
            img="/images/iRDT/iRDT.jpg"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MenuCard
            title="iRDT最適解 - 多質点系"
            description="建物に合わせたiRDTの最適値を算出するツール"
            href="/iRDT/mdof-opt-params"
            img="/images/iRDT/iRDT.jpg"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MenuCard
            title="iRDT最適解 - 多質点系"
            description="建物に合わせたiRDTの最適値を算出するツール"
            href="/VDW/force"
            img="/images/iRDT/iRDT.jpg"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MenuCard
            title="iRDT最適解 - 多質点系"
            description="建物に合わせたiRDTの最適値を算出するツール"
            href="/VDW/weight"
            img="/images/iRDT/iRDT.jpg"
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
