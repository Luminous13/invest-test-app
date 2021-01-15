// import React, { useContext } from 'react';
// import { observer } from 'mobx-react-lite';
// import { StyleSheet, View, Text, Button } from 'react-native';

// import { UserStoreContext } from '../../stores/UserStore';

// const Landing = () => {
//   const userStore = useContext(UserStoreContext);
//   const { welcomeMessage, isLoading, updateMessage, loginUser } = userStore;

//   return (
//     <View style={styles.mainContainer}>
//       <Text>{welcomeMessage}</Text>
//       <Button
//         title="CLICK ME"
//         onPress={() => loginUser('Luminous13', '0kx2flAPZX05')}
//         disabled={isLoading}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     borderColor: 'red',
//     borderWidth: 1,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default observer(Landing);

import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import styled from 'styled-components';
const logo = require('../../../assets/images/logo.png');
const { width, height } = Dimensions.get('screen');

const Container = styled(View)`
  height: 100%;
  ${'' /* justify-content: center; */}
  background-color: #ffffff;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-end;
`;

const HeaderText = styled(Text)`
  font-family: Montserrat-Regular;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 24px;
  letter-spacing: -1px;
  color: #00aff4;
  margin: 60px 0px;
`;

const StyledLogo = styled(Image)`
  width: 250px;
  height: 105px;
`;

const LoginButton = styled(TouchableOpacity)`
  background: #00aff4;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  height: 45px;
  margin: 0px 10px 50px 10px;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginButtonText = styled(Text)`
  font-family: Karla;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: #ffffff;
`;

const StyledMessage = styled(Text)`
  font-family: Karla;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  align-items: center;
  margin-top: 10px;
  color: #00aff4;
  margin-top: 50px;
`;

const Wrapper = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${'' /* justify-content: center; */}
  height: ${height * 0.65}px;
`;

export default ({ navigation }) => (
  <Container>
    <Wrapper>
      <HeaderText>WELCOME TO</HeaderText>
      <StyledLogo source={logo} />
      <StyledMessage>Grab some popcorn and it's movie time!</StyledMessage>
    </Wrapper>
    <LoginButton onPress={() => navigation.navigate('Login')}>
      <LoginButtonText>LOGIN</LoginButtonText>
    </LoginButton>
  </Container>
);
