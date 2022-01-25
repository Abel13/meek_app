import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";
import theme from "../../../global/styles/theme";
import { Card } from "../../molecules";
import { Props } from "./interfaces";
import { styles } from "./styles";

const PlayerSit: React.FC<Props> = ({ position, playerCards, life }) => {
  function _renderSit() {
    return (
      <View
        style={[
          styles.container,
          {
            borderBottomStartRadius: position === "top" ? 10 : 0,
            borderBottomEndRadius: position === "top" ? 10 : 0,
            borderTopStartRadius: position === "bottom" ? 10 : 0,
            borderTopEndRadius: position === "bottom" ? 10 : 0,
          },
        ]}
      >
        <Image
          style={styles.userImage}
          source={require("../../../../assets/icon.png")}
        />
        <View style={styles.scoreContainer}>
          <Text>Abel</Text>
          <View style={styles.lifeBar}>
            {[...Array(life)].map((_, index) => (
              <Feather name="heart" size={15} color={theme.colors.border} />
            ))}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        width: "30%",
        height: "50%",
        justifyContent: position == "top" ? "flex-start" : "flex-end",
      }}
    >
      {position == "top" && _renderSit()}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {playerCards.map((card) => (
          <Card onPress={() => {}} data={card} direction="upside-down" />
        ))}
      </View>
      {position == "bottom" && _renderSit()}
    </View>
  );
};

export default PlayerSit;
