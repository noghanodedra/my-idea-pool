import styled from 'styled-components';

const DefaultStyledInput = styled.input`
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid ${(props) => props.theme.main.color.inputBorder};
  padding: 5px 5px 10px 0px;
  margin-bottom: 40px;
  font-size: 20px;

  ::placeholder {
    color: ${(props) => props.theme.main.color.placeholder};
  }
`;

const DefaultStyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 77%;
  align-items: center;
`;

const DefaultStyledForm = styled.form`
  width: 485px;
`;

const DefaultStyledFormHeader = styled.div`
  width: 485px;
  height: 55px;
  font-size: 40px;
  margin-bottom: 62px;
  text-align: center;
`;

const DefaultStyledPrimaryButton = styled.button`
  background: ${(props) => props.theme.main.color.primary};
  border: 0;
  outline: none;
  font-size: 14px;
  width: 151px;
  height: 40px;
  color: white;
  text-transform: uppercase;
`;

const DefaultStyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DefaultStyledLink = styled.a`
  color: ${(props) => props.theme.main.color.primary};
  cursor: pointer;
`;

export {
  DefaultStyledInput,
  DefaultStyledForm,
  DefaultStyledFormContainer,
  DefaultStyledFormHeader,
  DefaultStyledPrimaryButton,
  DefaultStyledButtonContainer,
  DefaultStyledLink,
};
