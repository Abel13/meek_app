import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TransformsStyle,
  ImageSourcePropType,
} from "react-native";

export default function App({ onPress, data, direction, ...rest }) {
  const [symbol, setSymbol] = useState("");
  const [suitPath, setSuitPath] = useState<ImageSourcePropType>(
    "" as ImageSourcePropType
  );
  const [transform, setTransform] = useState<TransformsStyle>();
  const [color, setColor] = useState({});
  const [faceDown, setFaceDown] = useState(true);

  useEffect(() => {
    if (data) {
      setSymbol(data.symbol);
      setFaceDown(data.faceDown);
      switch (data.suit) {
        case 1:
          setColor({ color: "#F00" });
          setSuitPath(require("../../../../assets/diamonds.png"));
          break;
        case 2:
          setColor({ color: "#000" });
          setSuitPath(require("../../../../assets/spades.png"));
          break;
        case 3:
          setColor({ color: "#F00" });
          setSuitPath(require("../../../../assets/hearts.png"));
          break;
        case 4:
          setColor({ color: "#000" });
          setSuitPath(require("../../../../assets/clubs.png"));
          break;
        default:
          break;
      }
    } else {
      setFaceDown(true);
    }
  }, [data]);

  useEffect(() => {
    if (direction) {
      switch (direction) {
        case "upside-down":
          setTransform({
            transform: [
              {
                rotate: "-180deg",
              },
            ],
          });
          break;
        case "left":
          setTransform({
            transform: [
              {
                rotate: "-270deg",
              },
            ],
          });
          break;
        case "right":
          setTransform({
            transform: [
              {
                rotate: "-90deg",
              },
            ],
          });
          break;
        default:
          setTransform({
            transform: [
              {
                rotate: "-0deg",
              },
            ],
          });
          break;
      }
    }
  }, [direction]);

  return (
    <TouchableOpacity
      onPress={() => onPress(data)}
      {...rest}
      style={[transform, styles.container]}
    >
      <>
        {faceDown ? (
          <View style={[transform, styles.faceDown]}>
            <Image
              source={require("../../../../assets/logo.png")}
              style={styles.centerImage}
            />
          </View>
        ) : (
          <View style={[styles.faceUp]}>
            <View style={styles.topSymbol}>
              <Text style={[color, styles.symbol]}>{symbol}</Text>
              <Image style={styles.smallImage} source={suitPath} />
            </View>
            <View style={styles.suit}>
              <Image style={styles.centerImage} source={suitPath} />
            </View>
            <View style={styles.bottomSymbol}>
              <Text style={[color, styles.symbol]}>{symbol}</Text>
              <Image style={styles.smallImage} source={suitPath} />
            </View>
          </View>
        )}
      </>
    </TouchableOpacity>
  );
}
