import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, Button, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Card from '../../components/Card';

import { cards } from '../../components/Card/cards';
import Player from '../../components/Player';
import Bet from '../../components/Bet';
import Modal from '../../components/Modal';

import * as MatchPlayersActions from '../../store/modules/matchPlayers/actions';
import * as RoundActions from '../../store/modules/round/actions';
import * as TurnActions from '../../store/modules/turn/actions';

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
  const { roundCards, round } = useSelector(state => state.round);
  const { myTurn, playedCards, turn } = useSelector(state => state.turn);

  const [myPlayedCard, setMyPlayedCard] = useState(null);
  const [myCards, setMyCards] = useState([]);

  const [heart] = useState('♥');
  const [user, setUser] = useState({});
  const [modalBetVisible, setModalBetVisible] = useState(false);
  const [opponents, setOpponents] = useState([]);
  const [opponentsCard, setOpponentsCard] = useState([]);
  const [shackle, setShackle] = useState(null);

  const [readyToBet, setReadyToBet] = useState(false);
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [stepBet, setStepBet] = useState(false);
  const [stepPlay, setStepPlay] = useState(false);

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
        setUser({ ...profile, life: 5 });
      } catch (error) {
        console.log(error);
      }
    }
    loadOpponents();
  }, [players]);

  useEffect(() => {
    async function loadRound() {
      try {
        dispatch(RoundActions.getActualRoundRequest(match.secure_id));
      } catch (error) {
        console.log(error);
      }
    }
    loadRound();
  }, [match]);

  useEffect(() => {
    async function loadCards() {
      if (round.secure_id) {
        try {
          dispatch(RoundActions.getRoundCardsRequest(round.secure_id));
          setShackle(cards.find(c => c.id === round.shackle));
        } catch (error) {
          console.log(error);
        }
      }
    }

    loadCards();
  }, [round]);

  useEffect(() => {
    function setPlayedCards() {
      const oCards = [];
      playedCards.forEach(element => {
        oCards.push(cards.filter(e => e.id === element.card)[0]);
      });
      setOpponentsCard(oCards);
    }
    setPlayedCards();
  }, [playedCards]);

  useEffect(() => {
    function playMyCard() {
      const faceDown = true;
      if (myTurn)
        setMyPlayedCard({
          ...cards.filter(e => e.id === myTurn.card)[0],
          faceDown,
        });
    }
    playMyCard();
  }, [myTurn]);

  useEffect(() => {
    async function loadTurn() {
      const mCards = [];
      roundCards.forEach(element => {
        mCards.push(cards.filter(e => e.id === element.card)[0]);
      });
      setMyCards(mCards);
      if (round.secure_id) {
        try {
          dispatch(TurnActions.getActualTurnRequest(round.secure_id));
        } catch (error) {
          console.log(error);
        }
      }
    }
    loadTurn();
  }, [roundCards]);

  useEffect(() => {
    async function loadPlayedCards() {
      try {
        dispatch(TurnActions.getPlayedCardsRequest(turn.secure_id));
      } catch (error) {
        console.log(error);
      }
    }
    loadPlayedCards();
  }, [turn]);

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
                    {opponentsCard[4] && (
                      <Card direction="upside-down" data={opponentsCard[4]} />
                    )}
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                    }}
                  >
                    {opponentsCard[3] && (
                      <Card direction="upside-down" data={opponentsCard[3]} />
                    )}
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    {opponentsCard[2] && (
                      <Card
                        onPress={() => {
                          setModalBetVisible(true);
                        }}
                        data={opponentsCard[2]}
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
                  {opponentsCard[5] && (
                    <Card direction="left" data={opponentsCard[5]} />
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}
                >
                  {opponentsCard[1] && (
                    <Card direction="right" data={opponentsCard[1]} />
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
                  {opponentsCard[6] && (
                    <Card direction="left" data={opponentsCard[6]} />
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}
                >
                  {opponentsCard[0] && (
                    <Card direction="right" data={opponentsCard[0]} />
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
            {readyToBet && (
              <TouchableOpacity
                style={{
                  backgroundColor: '#4A4',
                  padding: 5,
                  borderColor: '#393',
                  borderWidth: 1,
                  borderRadius: 5,
                  margin: 5,
                }}
                onPress={() => setModalBetVisible(!modalBetVisible)}
              >
                <Text style={{ color: '#FFF' }}>APOSTAR</Text>
              </TouchableOpacity>
            )}
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
          <Bet max={5} blocked={null} />
        </Modal>
      </View>
    </>
  );
}
