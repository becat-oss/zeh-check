import React from 'react';
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import Layout from "src/components/Layout";
import ResultForm from "./ResultForm";
import { ZEHCheckViewProvider } from './ZEHCheckViewContext';

// const useStyles=makeStyles((theme:Theme)=>
//     createStyles({

//     })
// )

export default function ZEHCheckView(){
    //const classes = useStyles();

    return(
        <ZEHCheckViewProvider>
            <Layout>
                <ResultForm />
            </Layout>
        </ZEHCheckViewProvider>
    );
}