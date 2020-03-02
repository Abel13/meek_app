import React, { useState, useEffect, Profiler } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Alert,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import api from '../../services/api';

import * as MatchActions from '../../store/modules/match/actions';
import * as MatchPlayersActions from '../../store/modules/matchPlayers/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFF',
    margin: 10,
  },
  item: {
    flexDirection: 'row',
    padding: 5,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    color: '#FFF',
    margin: 10,
    fontSize: 18,
  },
  itemParticipants: {
    color: '#FFF',
    margin: 10,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 30,
  },
});

export default function Room({ navigation }) {
  const { match } = useSelector(state => state.match);
  const { profile } = useSelector(state => state.user);
  const { players } = useSelector(state => state.matchPlayers);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadPlayers() {
      try {
        dispatch(MatchPlayersActions.loadPlayersRequest(match.secure_id));
      } catch (error) {
        console.log(error.response.request);
      }
    }
    loadPlayers();
  }, []);

  function handleStart() {
    if (players.length >= 2) {
      dispatch(MatchActions.startMatchRequest(match.secure_id));
    } else {
      Alert.alert(
        'Erro ao entrar na partida',
        'São necessários pelo menos 2 jogadores para iniciar a partida'
      );
    }
  }

  function Item({ player }) {
    return (
      <View style={styles.item}>
        <View style={styles.item}>
          <Image
            style={styles.image}
            source={{
              uri: `https://api.adorable.io/avatars/285/meek.${player.username}.png`,
            }}
          />
          <Text style={styles.itemTitle}>{player.username}</Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={{ marginTop: 30, flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BackButton navigation={navigation} page="MatchList" />
            <Text style={styles.title}>PARTICIPANTES</Text>
          </View>
          <Text style={styles.title}>{match.name}</Text>
          <FlatList
            data={players}
            renderItem={({ item }) => <Item player={item} />}
            keyExtractor={item => item.secureId}
          />
        </View>
        {profile.secure_id === match.user_id && (
          <View style={{ margin: 10, alignItems: 'flex-end' }}>
            <Button onPress={() => handleStart()} text="INICIAR" />
          </View>
        )}
      </View>
    </>
  );
}
