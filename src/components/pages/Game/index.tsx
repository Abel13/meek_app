import React from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { PlayerSit } from "../../organisms";
import { useCardStore } from "../../../store/card";
import { Card } from "../../molecules";

const Game: React.FC = () => {
  const cards = useCardStore((state) => state.card);

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <PlayerSit
          position={"top"}
          playerCards={[cards[0], cards[7], cards[13], cards[25], cards[15]]}
          life={5}
        />

        <PlayerSit
          position={"top"}
          playerCards={[cards[10], cards[17], cards[35], cards[28], cards[43]]}
          life={3}
        />

        <PlayerSit
          position={"top"}
          playerCards={[cards[11], cards[22], cards[44], cards[51], cards[33]]}
          life={5}
        />

        <PlayerSit
          position={"bottom"}
          playerCards={[cards[8], cards[6], cards[19], cards[24], cards[37]]}
          life={5}
        />

        <PlayerSit
          position={"bottom"}
          playerCards={[cards[1], cards[2], cards[3], cards[4], cards[5]]}
          life={5}
        />

        <PlayerSit
          position={"bottom"}
          playerCards={[cards[39], cards[31], cards[16], cards[12], cards[9]]}
          life={4}
        />
      </View>
      <View style={{ position: "absolute" }}>
        <Card data={cards[7]} direction={""} onPress={() => {}} />
      </View>
    </View>
  );
};

export default Game;
