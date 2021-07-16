import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Layout from 'src/components/Layout';
import Section from 'src/components/Section';
import { IRDTViewProvider } from './IRDTViewContext';
import IRDTForm from './IRDTForm';
import IRDTResults from './IRDTResults';
import Amplifications from './Amplifications';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      right: theme.spacing(2),
      bottom: theme.spacing(2),
    },
  }),
);

export default function IRDTView() {
  const classes = useStyles();

  return (
    <IRDTViewProvider>
      <Layout>
        <Typography component="h1" variant="h4">
          iRDTの最適値算定
        </Typography>
        <Section title="入力">
          <IRDTForm />
        </Section>
        <Section title="最適値">
          <IRDTResults />
        </Section>
        <Section title="伝達特性">
          <Amplifications />
        </Section>
        <Section title="計算ソフトへの入力">
          <div></div>
        </Section>
        <Link className={classes.fab} href="https://github.com/adc21/adc-tools" target="_blank" rel="noopener noreferrer">
          <Fab aria-label="edit">
            <EditIcon />
          </Fab>
        </Link>
      </Layout>
    </IRDTViewProvider>
  );
}
