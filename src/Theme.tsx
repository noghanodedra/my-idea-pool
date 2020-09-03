import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

// Define the `theme` prop

export const theme = {
  main: {
    color: {
      primary: "#00A843",
      inputBorder: "#455E70",
      placeholder: "#2a3842",
    },
  },
};

interface IProps {
  children: ReactNode;
}

const Theme = ({ children }: IProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
