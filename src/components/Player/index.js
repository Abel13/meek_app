import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import PropTypes, { any } from 'prop-types';

// import { Container } from './styles';

const styles = StyleSheet.create({
  container: {
    width: '60%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    borderRadius: 50,
  },
});

export default function Player({ user, points }) {
  const [heart] = useState('♥');

  return (
    <>
      {!user ? (
        <View />
      ) : (
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: `https://api.adorable.io/avatars/250/meek.${user.username}.png`,
            }}
          />
          <View
            style={{
              width: 75,
              marginTop: 5,
              paddingVertical: 2,
              borderColor: '#FFF',
              borderWidth: 1,
              borderRadius: 5,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontSize: 12 }}>{user.username}</Text>

            <Text style={{ color: '#fff', fontSize: 10 }}>
              {heart.repeat(user.life_bar)}
            </Text>
            <Text style={{ color: '#fff', fontSize: 14 }}>
              {`${points} / ${user.bet ?? '-'}`}
            </Text>
          </View>
        </View>
      )}
    </>
  );
}

Player.propTypes = {
  user: PropTypes.objectOf(any),
  points: PropTypes.number,
};

Player.defaultProps = {
  user: {
    email: '',
    username: '',
    life: 0,
  },
  points: 0,
};
