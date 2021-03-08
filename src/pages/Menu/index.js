import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ImageBackground,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/Button';
import * as AuthActions from '../../store/modules/auth/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    width: '80%',
    height: '50%',
    alignItems: 'center',
  },
  menuTitle: {
    color: '#FFF',
    fontSize: 50,
    alignSelf: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 0 },
    textShadowRadius: 10,
  },
  profileContainer: {
    backgroundColor: '#000',
    height: '20%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  profileImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: '40%',
    height: '40%',
    resizeMode: 'contain',
    borderRadius: 200,
  },
  profileButtons: { width: 50, height: 50, resizeMode: 'contain' },
  logo: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
  },
});

export default function Menu({ navigation }) {
  const { profile } = useSelector(state => state.user);

  const dispatch = useDispatch();

  return (
    <>
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../../../assets/background.png')}
      >
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={{
                uri: `https://api.adorable.io/avatars/285/meek.${profile.username}.png`,
              }}
            />
            <View style={{ flex: 1 }}>
              <View
                style={{
                  alignSelf: 'flex-end',
                  margin: 10,
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity style={{ zIndex: 2 }}>
                  <Image
                    style={styles.profileButtons}
                    source={require('../../../assets/leaderboards.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => dispatch(AuthActions.signOutRequest())}
                >
                  <Image
                    style={styles.profileButtons}
                    source={require('../../../assets/achievements.png')}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: '#FFF',
                  width: '100%',
                  marginBottom: 20,
                  fontSize: 17,
                  fontWeight: '700',
                }}
              >{`Olá ${profile.username}`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.menu}>
            <Image
              style={styles.logo}
              source={require('../../../assets/logo.png')}
            />
            <Button
              text="JOGAR"
              onPress={() => navigation.navigate('MatchList')}
            />
            {/* <Button text="AMIGOS" /> */}
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

Menu.propTypes = {
  user: PropTypes.object,
};

Menu.defaultProps = {
  user: {
    email: '',
    username: '',
  },
};
