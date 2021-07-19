import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MuiLink from "@material-ui/core/Link";
import Link from "./Link";
import ThemeSwitcher from "./ThemeSwitcher";
import Copyright from "./Copyright";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      borderTop: "solid 1px #999",
      flexGrow: 1,
      padding: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    terms: {
      margin: theme.spacing(1),
    },
    title: {
      fontWeight: "bold",
    },
    link: {
      [theme.breakpoints.down("xs")]: {
        paddingTop: 10,
        paddingBottom: 10,
      },
    },
  }),
);

export default function Footer(): React.ReactElement {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <MuiLink
              href="https://becat.kyushu-u.ac.jp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography
                variant="subtitle1"
                component="h3"
                className={classes.link}
              >
                BeCAT
              </Typography>
            </MuiLink>
            <Link href="/terms">
              <Typography
                variant="subtitle1"
                component="h3"
                className={classes.link}
              >
                利用規約
              </Typography>
            </Link>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end"
          >
            <Grid item xs={6}>
              <ThemeSwitcher />
            </Grid>
            <Grid item xs={6}>
              <Copyright />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
