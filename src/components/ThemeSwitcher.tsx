import React, { useCallback } from 'react';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { useThemeContext } from '../theme/ThemeContext';
import { lightTheme, darkTheme } from '../theme/theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function ThemeSwitcher(): React.ReactElement {
  const classes = useStyles();
  const theme = useTheme();
  const themeType = theme.palette.type;
  const { setTheme } = useThemeContext();

  const handleClick = useCallback(() => {
    setTheme(themeType === 'light' ? darkTheme : lightTheme);
  }, [setTheme, themeType]);

  return (
    <div className={classes.root}>
      <Tooltip title="ライト/ダークを切り替える">
        <IconButton color="primary" aria-label="ライト/ダークを切り替える" onClick={handleClick}>
          {themeType === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
    </div>
  );
}
