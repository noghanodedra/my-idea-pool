import React, { ReactNode } from 'react';
import styled, { ThemeProvider } from 'styled-components';

// Define the `theme` prop

const theme = {
  main: {
    color: {
      primary: "#00A843",
      inputBorder: "#455E70",
      placeholder: "#2a3842",
    },
  },
};

// Button styled-component with props.theme properties

const Button = styled.button`
  color: ${props => props.theme.main.color};
  border: 2px solid ${props => props.theme.main.color};
`;

// provide default theme properties for Button

Button.defaultProps = {
  theme: {
    main: {
      color: 'red'
    }
  }
}

interface IProps {
  children: ReactNode;
}

const Theme = ({ children }: IProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
