import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonCustomProps = {
  title: string;
  onPress: () => void;
  color?: string; // Cor opcional
};

const ButtonCustom = ({ title, onPress, color = '#007bff' }: ButtonCustomProps) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ButtonCustom;
