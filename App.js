import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ESTOQUE_COLLECTION = 'estoque';
const HISTORICO_COLLECTION = 'historico';

const Pedido = () => {
  const [estoque, setEstoque] = useState([]);
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidade, setQuantidade] = useState(0);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    // Carregar dados do Firebase quando o aplicativo for iniciado
    carregarEstoque();
    carregarHistorico();
  }, []);

  // Carregar o estoque do Firestore
  const carregarEstoque = async () => {
    try {
      const estoqueSnapshot = await firestore().collection(ESTOQUE_COLLECTION).get();
      const estoqueData = estoqueSnapshot.docs.map(doc => doc.data());
      setEstoque(estoqueData);
    } catch (error) {
      console.error('Erro ao carregar estoque:', error);
    }
  };

  // Carregar o histórico do Firestore
  const carregarHistorico = async () => {
    try {
      const historicoSnapshot = await firestore().collection(HISTORICO_COLLECTION).get();
      const historicoData = historicoSnapshot.docs.map(doc => doc.data());
      setItensCarrinho(historicoData);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  // Adicionar um produto ao carrinho
  const adicionarAoCarrinho = () => {
    if (produtoSelecionado && quantidade > 0) {
      setItensCarrinho((prev) => [
        ...prev,
        { ...produtoSelecionado, quantidade },
      ]);
      setQuantidade(0);
      setProdutoSelecionado(null);
    }
  };

  // Finalizar o pedido e salvar no Firestore
  const finalizarPedido = async () => {
    if (itensCarrinho.length === 0) return;

    // Gerar o código único para o pedido
    const codigoPedido = `PED${Date.now()}`;

    // Criar o objeto do pedido
    const novoPedido = {
      codigo: codigoPedido,
      data: new Date().toISOString(),
      itens: itensCarrinho,
    };

    // Adicionar o pedido ao Firestore (coleção de histórico)
    try {
      await firestore().collection(HISTORICO_COLLECTION).add(novoPedido);
      setItensCarrinho([]);
    } catch (error) {
      console.error('Erro ao salvar pedido no Firestore:', error);
    }
  };

  // Filtrar produtos com base na pesquisa
  const filtrarProdutos = (text) => {
    setPesquisa(text);
    const resultado = estoque.filter(
      (produto) =>
        produto.nome.toLowerCase().includes(text.toLowerCase()) ||
        produto.codigo.includes(text)
    );
    setEstoque(resultado);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedido</Text>

      {/* Campo de Pesquisa */}
      <TextInput
        style={styles.input}
        placeholder="Pesquisar por código ou nome"
        value={pesquisa}
        onChangeText={filtrarProdutos}
      />

      {/* Lista de Produtos Filtrados */}
      <FlatList
        data={estoque}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.codigo} - {item.nome}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setProdutoSelecionado(item)}
            >
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Carrinho de Compras */}
      <Text style={styles.subtitle}>Carrinho</Text>
      <FlatList
        data={itensCarrinho}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <View style={styles.carrinhoItem}>
            <Text>{item.nome} - {item.quantidade}</Text>
          </View>
        )}
      />

      {/* Botão para Finalizar Pedido */}
      {itensCarrinho.length > 0 && (
        <TouchableOpacity
          style={styles.finalizarButton}
          onPress={finalizarPedido}
        >
          <Text style={styles.finalizarButtonText}>Finalizar Pedido</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 4,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 4,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  carrinhoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  finalizarButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 4,
    marginTop: 16,
    alignItems: 'center',
  },
  finalizarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Pedido;
