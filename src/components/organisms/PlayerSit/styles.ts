import { StyleSheet } from "react-native";
import theme from "../../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    height: "30%",
    flexDirection: "row",
    backgroundColor: theme.colors.card,
  },
  userImage: {
    flex: 0.3,
    height: "100%",
    opacity: 1,
    resizeMode: "contain",
    borderTopLeftRadius: 10,
  },
  scoreContainer: {
    flex: 0.6,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
  },
  lifeBar: { flexDirection: "row" },
});
