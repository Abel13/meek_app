import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { TouchableOpacity } from 'react-native-gesture-handler';
import * as AuthActions from '../../store/modules/auth/actions';

import Input from '../../components/Input';
import Button from '../../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontWeight: 'bold', fontSize: 30, color: '#FFF', margin: 50 },
  createAccount: {
    fontSize: 15,
    color: '#FFF',
    marginTop: 20,
  },
});

export default function SignIn({ navigation }) {
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function createAccount() {
    navigation.navigate('SignUp');
  }

  function handleSubmit() {
    dispatch(AuthActions.signInRequest(email, password));
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>LOGIN</Text>
          <View style={{ width: '70%' }}>
            <Input
              value={email}
              onChangeText={value => setEmail(value)}
              autoCorrect={false}
              placeholder="E-Mail"
              icon="mail-outline"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <Input
              value={password}
              onChangeText={value => setPassword(value)}
              secureTextEntry
              placeholder="Password"
              icon="lock-outline"
              ref={passwordRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
            />
          </View>

          <Button
            loading={loading}
            text="LOGIN"
            onPress={() => handleSubmit()}
          />
          <TouchableOpacity onPress={() => createAccount()}>
            <Text style={styles.createAccount}>CRIAR CONTA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
