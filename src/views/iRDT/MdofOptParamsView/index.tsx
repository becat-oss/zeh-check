import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Layout from 'src/components/Layout';
import Section from 'src/components/Section';
import { IRDTViewProvider } from './IRDTViewContext';
import IRDTForm from './IRDTForm';
import IRDTResults from './IRDTResults';

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
        <Section title="結果">
          <IRDTResults />
        </Section>
      </Layout>
    </IRDTViewProvider>
  );
}
