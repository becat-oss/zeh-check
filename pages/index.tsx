import React from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import IndexView from 'src/views/IndexView';



export default function Home(props: any) {
  return <IndexView {...props} />;
}

