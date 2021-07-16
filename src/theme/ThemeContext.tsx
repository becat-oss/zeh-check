import React, { useContext, useEffect, useMemo, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider, Theme } from '@material-ui/core/styles';
import { isServer } from 'src/utils/isServer';
import { lightTheme, darkTheme } from './theme';

export const themeStateKey = 'themeState-0.0.1';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeState = {
  theme: lightTheme,
  setTheme: () => {},
};

export const ThemeContext = React.createContext<ThemeState>(initialState);

interface Props {
  children: React.ReactNode;
}

export default function Provider({ children }: Props): React.ReactElement {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const initialTheme = useMemo(() => (prefersDarkMode ? darkTheme : initialState.theme), [prefersDarkMode]);
  const [theme, setTheme] = useState(initialTheme);

  const localThemeState = useMemo(() => {
    const localData = isServer ? null : localStorage.getItem(themeStateKey);
    return localData && (JSON.parse(localData) as ThemeState);
  }, [isServer]);

  const themeState = useMemo((): ThemeState => {
    return {
      theme,
      setTheme,
    };
  }, [theme]);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    if (localThemeState) {
      const targetTheme = localThemeState.theme.palette.type === 'light' ? lightTheme : darkTheme;
      setTheme(targetTheme);
    }
  }, [localThemeState]);

  useEffect(() => {
    try {
      !isServer && localStorage.setItem(themeStateKey, JSON.stringify(themeState));
    } catch (error) {}
  }, [themeState]);

  return (
    <ThemeContext.Provider value={themeState}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext(): ThemeState {
  return useContext(ThemeContext);
}
