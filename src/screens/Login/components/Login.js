import React from 'react';
import styled from 'styled-components';
import {
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Container, Content, Input, View } from 'native-base';

import * as Yup from 'yup';
import { Formik } from 'formik';

const { width, height } = Dimensions.get('screen');

const StyledContainer = styled(Container)`
  height: ${height}px;
  width: ${width}px;
  display: flex;
  justify-content: center;
`;

const StyledMainView = styled(View)`
  margin: 20px;
  padding: 10px;
`;

const StyledMessage = styled(Text)`
  font-family: Montserrat-Regular;
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  color: #00aff4;
  margin-bottom: 40px;
`;

const StyledInput = styled(Input)`
  border: 1px solid #00aff4;
  border-radius: 15px;
  margin: 5px;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  color: #000000;
  padding-left: 20px;
`;

const InputContainer = styled(View)`
  height: 70px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const LabelText = styled(Text)`
  font-size: 16px;
  margin-left: 15px;
  padding-left: 10px;
  padding-right: 10px;
  color: #00aff4;
  margin-left: -5px;
`;

const ErrorMessage = styled(Text)`
  font-family: Montserrat-Regular;
  font-size: 10px;
  text-transform: uppercase;
  color: red;
  margin-bottom: 5px;
  text-align: right;
  position: absolute;
  right: 20px;
  top: 10px;
`;

const LoginButtonText = styled(Text)`
  font-family: Karla;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: #ffffff;
`;

const LoginButton = styled(TouchableOpacity)`
  background: ${(props) => (props.disabled ? '#14779b' : '#00aff4')};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  height: 45px;
  margin: 10px;
  margin-top: 60px;
  margin-bottom: 20px;
`;

const SignInSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const signInFields = [
  {
    name: 'username',
    label: 'Username',
  },
  {
    name: 'password',
    label: 'Password',
    props: {
      secureTextEntry: true,
    },
  },
];

export default (props) => (
  <StyledContainer>
    <StyledMainView>
      <StyledMessage>Login page</StyledMessage>
      <Formik
        validateOnMount={true}
        enableReinitialize={false}
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={props.submit}
        validationSchema={SignInSchema}>
        {(formikProps) => {
          const {
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
            isSubmitting,
            setFieldValue,
          } = formikProps;
          return (
            <View>
              {signInFields.map((field, index) => (
                <InputContainer key={`signinField.${index}`}>
                  {touched[`${field.name}`] && errors[`${field.name}`] && (
                    <ErrorMessage>{errors[`${field.name}`]}</ErrorMessage>
                  )}
                  <LabelText>{field.label}</LabelText>
                  <StyledInput
                    {...field.props}
                    autoCapitalize="none"
                    value={values[`${field.name}`]}
                    onBlur={handleBlur(field.name)}
                    onChangeText={handleChange(field.name)}
                  />
                </InputContainer>
              ))}
              <LoginButton disabled={!isValid} onPress={handleSubmit}>
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <LoginButtonText>LOGIN</LoginButtonText>
                )}
              </LoginButton>
            </View>
          );
        }}
      </Formik>
    </StyledMainView>
  </StyledContainer>
);
