import React, { useContext } from 'react';
import { UserStoreContext } from '../../../stores/UserStore';
import Component from '../components/Login';

const Main = ({ navigation }) => {
  const userStore = useContext(UserStoreContext);
  const { loginUser } = userStore;

  const submit = async (data, { setSubmitting }) => {
    setSubmitting(true);
    const response = await loginUser(data.username, data.password);
    if (response) {
      navigation.navigate('Home');
    }
  };

  return <Component submit={submit} />;
};

export default Main;
