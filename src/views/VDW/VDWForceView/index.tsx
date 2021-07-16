import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Layout from 'src/components/Layout';
import Section from 'src/components/Section';
import { VDWForceViewProvider } from './VDWForceViewContext';
import VDWForm from './VDWForm';
import Force from './Force';
import VDWInputExample from './VDWInputExample';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      right: theme.spacing(2),
      bottom: theme.spacing(2),
    },
  }),
);

export default function VDWForceView() {
  const classes = useStyles();

  return (
    <VDWForceViewProvider>
      <Layout>
        <Typography component="h1" variant="h4">
          VDWの減衰力算定
        </Typography>
        <Section title="入力">
          <VDWForm />
        </Section>
        <Section title="減衰力特性">
          <Force />
        </Section>
        <Section title="計算ソフトへの入力例">
          <VDWInputExample />
        </Section>
        <Link className={classes.fab} href="https://github.com/adc21/adc-tools" target="_blank" rel="noopener noreferrer">
          <Fab aria-label="edit">
            <EditIcon />
          </Fab>
        </Link>
      </Layout>
    </VDWForceViewProvider>
  );
}

