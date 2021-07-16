import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const date = new Date();

export default function Copyright(): React.ReactElement {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <a
      href="https://adc21.com"
      style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flexDirection: 'column', padding: theme.spacing(1) }}
    >
      <Typography variant="body2" color="textSecondary" align={matches ? 'right' : 'left'} style={{ marginTop: theme.spacing(1) }}>
        Copyright &copy; {date.getFullYear()} Aseismic Device Co., Ltd.
      </Typography>
    </a>
  );
}
