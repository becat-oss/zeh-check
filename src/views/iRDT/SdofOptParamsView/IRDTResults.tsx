import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useIRDTViewContext } from './IRDTViewContext';

export default function IRDTResults() {
  const { mu, cdOpt, kbOpt } = useIRDTViewContext();

  return (
    <>
      <Typography>質量比 {mu}[-]</Typography>
      <Typography>最適減衰係数 {cdOpt.toFixed(2)} [kNs/m/基]</Typography>
      <Typography>最適支持部材剛性 {kbOpt.toFixed(2)} [kN/m/基]</Typography>
    </>
  );
}
