import React from 'react';
import { makeStyles, Theme, createStyles, Typography, Button } from "@material-ui/core";
import Layout from "src/components/Layout";
import Section from 'src/components/Section';
import { API, graphqlOperation } from 'aws-amplify';
import { createResult } from 'src/graphql/mutations';
import ZEHCheckForm from "./ZEHCheckForm";
import ZEHCheckResults from "./ZEHCheckResults";
import { ZEHCheckViewProvider, useZEHCheckViewContext } from './ZEHCheckViewContext';
import EnergyChart from './EnergyChart';
import ZEHCheckField from './ZEHCheckField';


// const useStyles=makeStyles((theme:Theme)=>
//     createStyles({

//     })
// )

export default function ZEHCheckView(){
  const{heating,cooling,ventilation,hotwater,lighting,others,generation,subTotal,energyReduction,uvalue,generationPercentage}=useZEHCheckViewContext();
  
  const postData=async ()=>await API.graphql(graphqlOperation(createResult,{input:{
    name: 'test',
    heating: heating.design,
    cooling: cooling.design,
    ventilation: ventilation.design,
    hotwater: hotwater.design,
    lighting: lighting.design,
    others: others,
    generation: generation,
    energyReduction:energyReduction,
    uValue:uvalue,
    generationPercentage:generationPercentage,
  }}));

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
          <ZEHCheckResults />
          <EnergyChart />
        </Section>
        <Button onClick={()=>postData()}>Upload</Button>
      </Layout>
    </ZEHCheckViewProvider>
  );
}