import { StyleSheet } from "react-native";
import theme from "../../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  table: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.border,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    height: "80%",
    width: "90%",
    borderRadius: 10,
    borderWidth: 2,
    padding: 5,
  },
});
