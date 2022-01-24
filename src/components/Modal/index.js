import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: '#111A',
    borderColor: '#AAAA',
    borderWidth: 8,
    width: 300,
    height: 400,
    borderRadius: 15,
  },
  children: {
    flex: 1,
    padding: 15,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    margin: 15,
    fontWeight: 'bold',
  },
});

export default function CustomModal({ children, visible, title }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.children}>{children}</View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
