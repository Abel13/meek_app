import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  image: {
    width: 20,
    margin: 10,
  },
});

export default function BackButton({ navigation, page, ...rest }) {
  function handleBack() {
    navigation.navigate(page);
  }

  return (
    <TouchableOpacity
      onPress={() => handleBack()}
      style={{ width: 50, flexDirection: 'row' }}
      {...rest}
    >
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../../assets/back.png')}
      />
    </TouchableOpacity>
  );
}

BackButton.propTypes = {
  page: PropTypes.string,
};

BackButton.defaultProps = {
  page: '',
};
