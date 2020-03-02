import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Button, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card';

import { cards } from '../../components/Card/cards';
import Player from '../../components/Player';
import Bet from '../../components/Bet';
import Modal from '../../components/Modal';

import * as MatchPlayersActions from '../../store/modules/matchPlayers/actions';
// import { Container } from './styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  room: {
    position: 'absolute',
    elevation: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaDivision: { flexDirection: 'row', alignItems: 'center' },
  table: {
    backgroundColor: '#4A4',
    borderColor: '#225522',
    borderWidth: 10,
    width: '60%',
    height: '60%',
    borderRadius: 20,
  },
  playerArea: {
    flex: 1,
  },
  playerSit: {
    borderColor: '#DCDCDC',
    borderWidth: 3,
    backgroundColor: '#fff',
    borderRadius: 30,
    width: '60%',
    height: '30%',
  },
  myCardsArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  shackle: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Table() {
  const dispatch = useDispatch();

  const { match } = useSelector(state => state.match);
  const { profile } = useSelector(state => state.user);
  const { players } = useSelector(state => state.matchPlayers);

  const [heart] = useState('♥');
  const [user, setUser] = useState({});
  const [modalBetVisible, setModalBetVisible] = useState(false);
  const [myCards, setMyCards] = useState([]);
  const [opponents, setOpponents] = useState([]);
  const [shackle, setShackle] = useState(null);
  const [myPlayedCard, setMyPlayedCard] = useState(null);
  const [opponent01Card, setOpponent01Card] = useState(null);
  const [opponent02Card, setOpponent02Card] = useState(null);
  const [opponent03Card, setOpponent03Card] = useState(null);
  const [opponent04Card, setOpponent04Card] = useState(null);
  const [opponent05Card, setOpponent05Card] = useState(null);
  const [opponent06Card, setOpponent06Card] = useState(null);
  const [opponent07Card, setOpponent07Card] = useState(null);

  useEffect(() => {
    async function loadPlayers() {
      try {
        dispatch(MatchPlayersActions.loadPlayersRequest(match.secure_id));
      } catch (error) {
        console.log(error);
      }
    }
    loadPlayers();
  }, []);

  useEffect(() => {
    async function loadOpponents() {
      try {
        const list = players.filter(el => el.secure_id !== profile.secure_id);
        setOpponents(list);
      } catch (error) {
        console.log(error);
      }
    }
    loadOpponents();
  }, [players]);

  function closeModal() {
    setModalBetVisible(false);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.room}>
          <View style={styles.table}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 0.7,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: 10,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    {opponent05Card && (
                      <Card direction="upside-down" data={opponent05Card} />
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                    }}
                  >
                    {opponent04Card && (
                      <Card direction="upside-down" data={opponent04Card} />
                    )}
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    {opponent03Card && (
                      <Card
                        onPress={() => {
                          setModalBetVisible(true);
                        }}
                        data={opponent03Card}
                        direction="upside-down"
                      />
                    )}
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  margin: 15,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}
                >
                  {opponent06Card && (
                    <Card direction="left" data={opponent06Card} />
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}
                >
                  {opponent02Card && (
                    <Card direction="right" data={opponent02Card} />
                  )}
                </View>
              </View>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {shackle && <Card data={shackle} />}
              </View>
              <View
                style={{
                  flex: 0.8,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  margin: 15,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}
                >
                  {opponent07Card && (
                    <Card direction="left" data={opponent07Card} />
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}
                >
                  {opponent01Card && (
                    <Card direction="right" data={opponent01Card} />
                  )}
                </View>
              </View>
              <View style={styles.shackle}>
                {myPlayedCard && <Card data={myPlayedCard} />}
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.areaDivision, { flex: 1 }]}>
          <View
            style={[
              { justifyContent: 'center', alignItems: 'center' },
              styles.playerArea,
            ]}
          >
            {opponents[4] && (
              <Player user={opponents[4]} style={styles.playerSit} />
            )}
          </View>
          <View
            style={[
              { justifyContent: 'flex-start', alignItems: 'center' },
              styles.playerArea,
            ]}
          >
            {opponents[3] && (
              <Player user={opponents[3]} style={styles.playerSit} />
            )}
          </View>
          <View
            style={[
              { justifyContent: 'flex-start', alignItems: 'flex-start' },
              styles.playerArea,
            ]}
          >
            {opponents[2] && (
              <Player user={opponents[2]} style={styles.playerSit} />
            )}
          </View>
        </View>
        <View
          style={[
            styles.areaDivision,
            { flex: 1, justifyContent: 'space-between' },
          ]}
        >
          <View
            style={[
              {
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              },
              styles.playerArea,
            ]}
          >
            {opponents[5] && (
              <Player user={opponents[5]} style={styles.playerSit} />
            )}
          </View>
          <View style={styles.playerArea} />
          <View
            style={[
              styles.areaDivision,
              {
                flex: 1,
                justifyContent: 'flex-end',
              },
            ]}
          >
            {opponents[1] && (
              <Player user={opponents[1]} style={styles.playerSit} />
            )}
          </View>
        </View>
        <View
          style={[
            styles.areaDivision,
            { flex: 1, justifyContent: 'space-between' },
          ]}
        >
          <View
            style={[
              {
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              },
              styles.playerArea,
            ]}
          >
            {opponents[6] && (
              <Player user={opponents[6]} style={styles.playerSit} />
            )}
          </View>
          <View style={styles.playerArea} />
          <View
            style={[
              styles.areaDivision,
              {
                flex: 1,
                justifyContent: 'flex-end',
              },
            ]}
          >
            {opponents[0] && (
              <Player user={opponents[0]} style={styles.playerSit} />
            )}
          </View>
        </View>
        <View
          style={[
            {
              marginHorizontal: '10%',
              flex: 0.8,
              zIndex: 2,
            },
          ]}
        >
          <View style={[styles.areaDivision, { marginTop: 20 }]}>
            <View style={styles.myCardsArea}>
              {myCards[0] && <Card data={myCards[0]} />}
            </View>
            <View style={styles.myCardsArea}>
              {myCards[1] && <Card data={myCards[1]} />}
            </View>
            <View style={styles.myCardsArea}>
              {myCards[2] && <Card data={myCards[2]} />}
            </View>
            <View style={styles.myCardsArea}>
              {myCards[3] && <Card data={myCards[3]} />}
            </View>
            <View style={styles.myCardsArea}>
              {myCards[4] && <Card data={myCards[4]} />}
            </View>
            <View style={styles.myCardsArea}>
              {myCards[5] && <Card data={myCards[5]} />}
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 20 }}>
              {heart.repeat(user.life)}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Modal
          title="QUAL SUA APOSTA?"
          closeModal={() => closeModal()}
          visible={modalBetVisible}
          confirmText="APOSTAR"
        >
          <Bet max={5} blocked={1} />
        </Modal>
      </View>
    </>
  );
}
