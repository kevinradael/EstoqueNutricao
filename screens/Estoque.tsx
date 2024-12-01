import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useEstoqueContext } from '../context/EstoqueContext';

function Estoque() {
  const { estoque } = useEstoqueContext();

  // Função para calcular se a validade está próxima de vencer
  const validadeProxima = (validade: string) => {
    const dataValidade = new Date(validade);
    const hoje = new Date();
    const diasRestantes = Math.ceil((dataValidade.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
    
    if (diasRestantes <= 7) {
      return 'Vence em breve';
    }
    return `Vence em ${diasRestantes} dias`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estoque</Text>
      <FlatList
        data={estoque}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer}>
            <Text>{item.codigo} - {item.nome}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <Text>Validade: {item.validade} ({validadeProxima(item.validade)})</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default Estoque;
