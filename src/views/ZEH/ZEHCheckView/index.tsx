import React from 'react';
import { makeStyles, Theme, createStyles, Typography } from "@material-ui/core";
import Layout from "src/components/Layout";
import Section from 'src/components/Section';
import ZEHCheckForm from "./ZEHCheckForm";
import ZEHCheckResults from "./ZEHCheckResults";
import { ZEHCheckViewProvider } from './ZEHCheckViewContext';
import EnergyChart from './EnergyChart';
import ZEHCheckField from './ZEHCheckField';

// const useStyles=makeStyles((theme:Theme)=>
//     createStyles({

//     })
// )

export default function ZEHCheckView(){
    //const classes = useStyles();

    return(
        <ZEHCheckViewProvider>
            <Layout>
                <Typography component="h1" variant="h4">
                    ZEHチェックシート
                </Typography>
                <Section title="入力">
                    <div> 1.一次エネルギー消費量</div>
                    <ZEHCheckForm />
                    <ZEHCheckField />

                </Section>
                <Section title="結果">
                    <EnergyChart />
                    <ZEHCheckResults />
                </Section>
            </Layout>
        </ZEHCheckViewProvider>
    );
}