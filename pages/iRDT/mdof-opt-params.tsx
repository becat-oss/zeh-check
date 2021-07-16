import React from 'react';
import dynamic from 'next/dynamic';

const MdofOptParamsView = dynamic(() => import('src/views/iRDT/MdofOptParamsView'));

export default function Home(props: any) {
  return <MdofOptParamsView {...props} />;
}
