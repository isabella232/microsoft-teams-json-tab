import React from 'react';
import { Provider } from '@stardust-ui/react';
import App from './App';
import * as themeUtils from './utils/themeUtils';
import { ThemeContext } from './utils/themeContext';

export const ProviderWrapper: React.FC = (): JSX.Element => {
  // CONSTANT
  const initialTheme = themeUtils.getTheme(themeUtils.getThemeFromURL(window.location.href));
  // HOOKS
  const [Theme, setTheme] = React.useState(initialTheme);
  const themeVariables =
    Theme && Theme.siteVariables && Theme.siteVariables.colorScheme ? Theme.siteVariables.colorScheme.default : {};

  // HANDLERS
  const handleThemeChange = (theme: string): void => {
    setTheme(themeUtils.getTheme(theme));
  };

  return (
    <ThemeContext.Provider value={themeVariables}>
      <Provider theme={Theme}>
        <App onThemeChange={handleThemeChange} />
      </Provider>
    </ThemeContext.Provider>
  );
};
