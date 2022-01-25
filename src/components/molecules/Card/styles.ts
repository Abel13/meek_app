import { StyleSheet } from "react-native";
import theme from "../../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 40,
    margin: 1,
  },
  centerImage: { width: "80%", height: "80%", resizeMode: "contain" },
  smallImage: {
    width: 6,
    height: 6,
    resizeMode: "contain",
    marginBottom: "10%",
  },
  topSymbol: {
    alignSelf: "flex-start",
    marginHorizontal: "5%",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  bottomSymbol: {
    alignSelf: "flex-end",
    marginHorizontal: "5%",
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
    transform: [
      {
        rotate: "-180deg",
      },
    ],
  },
  suit: {
    height: "40%",
    marginHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  symbol: {
    fontWeight: "bold",
    fontSize: 10,
  },
  faceDown: {
    flex: 1,
    backgroundColor: theme.colors.black,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  faceUp: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: theme.colors.white,
    borderRadius: 2,
  },
});
