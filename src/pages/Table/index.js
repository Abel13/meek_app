import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  StatusBar,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Card from '../../components/Card';

import { cards } from '../../components/Card/cards';
import Player from '../../components/Player';
import Bet from '../../components/Bet';
import Modal from '../../components/Modal';

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
  myArea: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Table() {
  const dispatch = useDispatch();

  const { match } = useSelector(state => state.match); // PARTIDA ATUAL
  const { profile } = useSelector(state => state.user); // PERFIL USUARIO
  const { players } = useSelector(state => state.matchPlayers); // TODOS OS JOGADORES DA PARTIDA
  const { roundCards } = useSelector(state => state.round); //
  const {
    turnCardsPlayed,
    playedCards,
    turn,
    round,
    currentPlayer,
    stepBet,
    stepPlay,
    blockedBet,
    endOfBet,
    betsPlaced,
  } = useSelector(state => state.turn);

  const [myPlayedCard, setMyPlayedCard] = useState(null);
  const [myCards, setMyCards] = useState([]);
  const [myBet, setMyBet] = useState('-');

  const [user, setUser] = useState(null); // INSERIDO APOS CARREGAR OS JOGADORES
  const [modalBetVisible, setModalBetVisible] = useState(false);
  const [opponents, setOpponents] = useState([]);
  const [opponentsCard, setOpponentsCard] = useState([]);
  const [shackle, setShackle] = useState(null);

  const [readyToBet, setReadyToBet] = useState(false);
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [betMax, setBetMax] = useState(0);
  const [myTurn, setMyTurn] = useState(false);

  const heart = '♥';

  useEffect(() => {
    if (betsPlaced && betsPlaced.length > 0 && user) {
      const bets = opponents.map(element => {
        const player = betsPlaced.find(el => el.user_id === element.secure_id);

        if (player) {
          return { ...element, bet: player.bet };
        }
      });

      const me = betsPlaced.find(el => el.user_id === user.secure_id);
      setMyBet(me.bet);
      setOpponents(bets);
    }
  }, [betsPlaced, user]);

  useEffect(() => {
    if (myTurn) {
      console.log('EU', stepBet, stepPlay);
      setReadyToBet(stepBet);
      setReadyToPlay(stepPlay);
    } else {
      setReadyToBet(false);
      setReadyToPlay(false);
    }
  }, [myTurn]);

  useEffect(() => {
    if (currentPlayer && user) {
      setMyTurn(currentPlayer.secure_id === user.secure_id);
    }
  }, [currentPlayer, stepBet, stepPlay]);

  useEffect(() => {
    async function loadOpponents() {
      try {
        if (players) {
          const list = players.filter(el => el.secure_id !== profile.secure_id);
          const me = players.filter(
            el => el.secure_id === profile.secure_id
          )[0];
          setOpponents(list);
          setUser(me);
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadOpponents();
  }, [players]);

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

    if (round) {
      loadCards();
    }
  }, [round]);

  useEffect(() => {
    function setPlayedCards() {
      if (turnCardsPlayed && !turnCardsPlayed.card) {
        setMyPlayedCard(null);
      }

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
      if (turnCardsPlayed && turnCardsPlayed.card) {
        const faceDown = !endOfBet;
        setMyPlayedCard({
          ...cards.filter(e => e.id === turnCardsPlayed.card)[0],
          faceDown,
        });
      }
    }
    playMyCard();
  }, [turnCardsPlayed, endOfBet]);

  useEffect(() => {
    async function loadTurn() {
      const mCards = [];
      roundCards.forEach(element => {
        mCards.push(cards.filter(e => e.id === element.card)[0]);
      });
      if (round && round.total_turns > 1) {
        setMyCards(mCards);
      }
    }
    loadTurn();
  }, [roundCards]);

  useEffect(() => {
    async function loadPlayedCards() {
      if (turn) {
        setBetMax(round.total_turns);
        try {
          dispatch(TurnActions.getPlayedCardsRequest(turn.secure_id));
        } catch (error) {
          console.log(error);
        }
      }
    }
    loadPlayedCards();
  }, [turn]);

  useEffect(() => {
    const id = setInterval(() => {
      try {
        // console.log(match.secure_id);
        dispatch(TurnActions.updateGame(match.secure_id));
        // console.log(myPlayedCard);
      } catch (error) {
        console.log(error);
        // console.log(error.response.request);
      }
    }, 5000);
    return () => clearInterval(id);
  }, []);

  async function closeModal(data) {
    try {
      setReadyToBet(false);
      await dispatch(RoundActions.betRequest(data, round.secure_id));
      setModalBetVisible(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function play(card) {
    if (myTurn && stepPlay) {
      console.log('CARD: ', card);
      try {
        console.log('STARTING');
        await dispatch(TurnActions.playCardRequest(card.id, turn.secure_id));
        console.log('RETURNED');
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert('Ops!', 'Faça sua aposta ou aguarde sua vez!');
    }
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
              <View style={styles.myArea}>
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
            {
              flex: 1,
              justifyContent: 'space-between',
            },
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
            {
              flex: 0.8,
              justifyContent: 'space-between',
            },
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
              flex: 0.7,
              zIndex: 2,
            },
          ]}
        >
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: myTurn ? '#4A4' : '#944',
              alignSelf: 'flex-end',
            }}
          />

          {readyToBet ? (
            <TouchableOpacity
              style={{
                width: '50%',
                backgroundColor: '#4A4',
                padding: 5,
                borderColor: '#393',
                borderWidth: 1,
                borderRadius: 5,
                alignSelf: 'center',
              }}
              onPress={() => setModalBetVisible(!modalBetVisible)}
            >
              <Text style={{ color: '#FFF', textAlign: 'center' }}>
                APOSTAR
              </Text>
            </TouchableOpacity>
          ) : (
              <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center' }}>
                {`${0} / ${myBet ?? '-'}`}
              </Text>
            )}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 20 }}>
              {heart.repeat(user ? user.life_bar : 0)}
            </Text>
          </View>
          <View style={[styles.areaDivision, { marginBottom: 25 }]}>
            <View style={styles.myCardsArea}>
              {myCards[0] && <Card onPress={play} data={myCards[0]} />}
            </View>
            <View style={styles.myCardsArea}>
              {myCards[1] && <Card onPress={play} data={myCards[1]} />}
            </View>
            <View style={styles.myCardsArea}>
              {myCards[2] && <Card onPress={play} data={myCards[2]} />}
            </View>
            <View style={styles.myCardsArea}>
              {myCards[3] && <Card onPress={play} data={myCards[3]} />}
            </View>
            <View style={styles.myCardsArea}>
              {myCards[4] && <Card onPress={play} data={myCards[4]} />}
            </View>
            <View style={styles.myCardsArea}>
              {myCards[5] && <Card onPress={play} data={myCards[5]} />}
            </View>
          </View>
        </View>
      </View>
      <View>
        <Modal title="QUAL SUA APOSTA?" visible={modalBetVisible}>
          <Bet
            confirmText="APOSTAR"
            max={betMax}
            blocked={blockedBet}
            closeModal={closeModal}
          />
        </Modal>
      </View>
    </>
  );
}
