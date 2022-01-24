import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  Image,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import * as MatchActions from '../../store/modules/match/actions';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Player from '../../components/Player';
import api from '../../services/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFF',
    margin: 10,
    marginTop: 50,
    alignSelf: 'center',
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

export default function MatchList({ navigation }) {
  const { profile } = useSelector(state => state.user);
  const [matchName, setMatchName] = useState(
    `Partida de ${profile.username} ${moment().format('YYMDhms')}`
  );
  const [refresh, setRefresh] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function loadMatches() {
      setRefreshing(true);
      setRefresh(false);
      try {
        const response = await api.get('matches');
        setMatches(response.data);
      } catch (error) {
        console.log(error.response);
      } finally {
        setRefreshing(false);
      }
    }

    if (refresh) {
      loadMatches();
    }
  }, [refresh]);

  function handleCreateMatch() {
    dispatch(MatchActions.createMatchRequest(matchName));
  }

  function handleEnterInMatch(secureId) {
    dispatch(MatchActions.enterMatchRequest(secureId));
  }

  function Item({ title, username, secureId }) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleEnterInMatch(secureId)}
      >
        <View style={styles.item}>
          <Image
            style={styles.image}
            source={{
              uri: `https://api.adorable.io/avatars/285/meek.${username}.png`,
            }}
          />
          <Text style={styles.itemTitle}>{title.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>NOVA PARTIDA</Text>
          <Input
            value={matchName.toUpperCase()}
            onChangeText={value => setMatchName(value)}
            placeholder="Nome da partida"
            icon="videogame-asset"
          />
          <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
            <Button
              loading={loading}
              onPress={() => handleCreateMatch()}
              text="CRIAR"
            />
          </View>
        </View>
        <View style={{ marginTop: 30, marginBottom: 10, flex: 1 }}>
          <Text style={styles.title}>PARTIDAS ABERTAS</Text>
          <FlatList
            data={matches}
            onRefresh={() => {
              setRefresh(true);
            }}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <Item
                title={item.name}
                username={item.username}
                secureId={item.secure_id}
              />
            )}
            keyExtractor={item => item.secure_id}
          />
        </View>
      </View>
    </>
  );
}
