import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useEstoqueContext } from '../context/EstoqueContext';

function Historico() {
  const { historico } = useEstoqueContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Pedidos</Text>

      {historico.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum pedido foi registrado ainda.</Text>
      ) : (
        <FlatList
          data={historico}
          keyExtractor={(item, index) => index.toString()} // Usamos o índice porque cada pedido pode ter o mesmo código.
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.date}>Data: {new Date(item.data).toLocaleDateString()}</Text>
              <FlatList
                data={item.itens}
                keyExtractor={(subItem, subIndex) => subIndex.toString()}
                renderItem={({ item: subItem }) => (
                  <View style={styles.itemContainer}>
                    <Text style={styles.itemText}>
                      {subItem.nome} - Quantidade: {subItem.quantidade}
                    </Text>
                  </View>
                )}
              />
            </View>
          )}
        />
      )}
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
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemContainer: {
    marginVertical: 4,
  },
  itemText: {
    fontSize: 16,
  },
});

export default Historico;
