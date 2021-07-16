import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    title: {
      paddingBottom: theme.spacing(2),
    },
  }),
);

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: Props) {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <Typography component="h1" variant="h5" className={classes.title}>{title}</Typography>
      {children}
    </section>
  );
}
