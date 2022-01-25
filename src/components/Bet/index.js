import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import Button from '../Button';

const styles = StyleSheet.create({
  footer: {
    flex: 0.3,
    margin: 15,
  },
});

export default function Bet({ max, confirmText, closeModal, blocked }) {
  const [bet, setBet] = useState(0);

  function addBet() {
    const value = bet + 1 === blocked ? 2 : 1;
    if (bet + value <= max) {
      setBet(bet + value);
    }
  }
  function subBet() {
    const value = bet - 1 === blocked ? 2 : 1;
    if (bet - value >= 0) setBet(bet - value);
  }

  useEffect(() => {
    if (bet === blocked) {
      addBet();
    }
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          width: '70%',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            borderWidth: 1,
            borderColor: '#3334',
            backgroundColor: '#2224',
            margin: 10,
          }}
        >
          <Text style={{ color: '#FFF', fontSize: 80 }}>{bet}</Text>
        </View>
        <View style={{}}>
          <TouchableOpacity
            style={{ width: 40, height: 40, marginVertical: 5 }}
            onPress={() => addBet()}
          >
            <Image
              style={{ flex: 1, width: '100%' }}
              source={require('../../../assets/up.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: 40, height: 40, marginVertical: 5 }}
            onPress={() => subBet()}
          >
            <Image
              style={{ flex: 1, width: '100%' }}
              source={require('../../../assets/down.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button text={confirmText} onPress={() => closeModal(bet)} />
        </View>
      </View>
    </>
  );
}
