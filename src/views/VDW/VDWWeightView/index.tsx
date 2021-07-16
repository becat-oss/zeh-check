import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Layout from 'src/components/Layout';
import Section from 'src/components/Section';
import { VDWWeightViewProvider } from './VDWWeightViewContext';
import VDWForm from './VDWForm';
import VDWWeightResult from './VDWWeightResult';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      right: theme.spacing(2),
      bottom: theme.spacing(2),
    },
  }),
);

export default function VDWWeightView() {
  const classes = useStyles();

  return (
    <VDWWeightViewProvider>
      <Layout>
        <Typography component="h1" variant="h4">
          VDWの重量算定
        </Typography>
        <Section title="入力">
          <VDWForm />
        </Section>
        <Section title="計算結果">
          <VDWWeightResult />
        </Section>
        <Link className={classes.fab} href="https://github.com/adc21/adc-tools" target="_blank" rel="noopener noreferrer">
          <Fab aria-label="edit">
            <EditIcon />
          </Fab>
        </Link>
      </Layout>
    </VDWWeightViewProvider>
  );
}

