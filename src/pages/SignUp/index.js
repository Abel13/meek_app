import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as UserActions from '../../store/modules/user/actions';

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

export default function SignUp({ navigation }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const dispatch = useDispatch();

  const loading = useSelector(state => state.user.loading);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSubmit() {
    dispatch(
      UserActions.signUpRequest(username, email, password, confirmPassword)
    );
  }

  function backToLogin() {
    navigation.navigate('SignIn');
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>CADASTRO</Text>
          <View style={{ width: '70%' }}>
            <Input
              value={username}
              onChangeText={value => setUsername(value)}
              placeholder="Nome de Usuário"
              maxLenght={10}
              icon="person-outline"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
            />
            <Input
              value={email}
              onChangeText={value => setEmail(value)}
              autoCorrect={false}
              placeholder="E-Mail"
              icon="mail-outline"
              autoCapitalize="none"
              returnKeyType="next"
              ref={emailRef}
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <Input
              value={password}
              onChangeText={value => setPassword(value)}
              secureTextEntry
              placeholder="Senha"
              icon="lock-outline"
              returnKeyType="next"
              ref={passwordRef}
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
            />
            <Input
              value={confirmPassword}
              onChangeText={value => setConfirmPassword(value)}
              secureTextEntry
              placeholder="Confirme sua senha"
              icon="lock-outline"
              returnKeyType="send"
              ref={confirmPasswordRef}
              onSubmitEditing={handleSubmit}
            />
          </View>

          <Button loading={loading} text="CADASTRAR" onPress={handleSubmit} />
          <TouchableOpacity onPress={() => backToLogin()}>
            <Text style={styles.createAccount}>JÁ TENHO CONTA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
