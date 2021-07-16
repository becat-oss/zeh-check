import React from 'react';
import dynamic from "next/dynamic";

const ZEHCheckView = dynamic(()=>import('src/views/ZEH/ZEHCheckView'));

export default function Home(props: any){
    return <ZEHCheckView {...props} />;
}

