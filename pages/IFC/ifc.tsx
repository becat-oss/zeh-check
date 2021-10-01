import React from 'react';
import dynamic from "next/dynamic";

const IFCView = dynamic(()=>import('src/views/IFC'));

export default function Home(props: any){
    return <IFCView {...props} />;
}