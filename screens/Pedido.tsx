import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import { useEstoqueContext } from '../context/EstoqueContext';

function Pedido() {
  const { estoque, atualizarEstoque, adicionarHistorico } = useEstoqueContext();
  const [pesquisa, setPesquisa] = useState('');
  const [produtosFiltrados, setProdutosFiltrados] = useState(estoque);
  const [itensCarrinho, setItensCarrinho] = useState<
    { codigo: string; nome: string; quantidade: number }[]
  >([]);
  const [quantidade, setQuantidade] = useState<number>(0);
  const [produtoSelecionado, setProdutoSelecionado] = useState<
    { codigo: string; nome: string } | null
  >(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  // Sincronizar produtos filtrados com o estoque
  useEffect(() => {
    filtrarProdutos(pesquisa);
  }, [estoque]);

  // Função para filtrar os produtos com base na pesquisa e quantidade no estoque
  const filtrarProdutos = (text: string) => {
    setPesquisa(text);
    const resultado = estoque.filter(
      (produto) =>
        (produto.nome.toLowerCase().includes(text.toLowerCase()) ||
        produto.codigo.includes(text)) &&
        produto.quantidade > 0 // Garantir que só exibe produtos com quantidade maior que 0
    );
    setProdutosFiltrados(resultado);
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
      setModalVisivel(false);
    }
  };

  // Finalizar o pedido
  const finalizarPedido = () => {
    if (itensCarrinho.length === 0) return;

    // Gerar o código único para o pedido
    const codigoPedido = `PED${Date.now()}`;

    // Criar o objeto do pedido
    const novoPedido = {
      codigo: codigoPedido,
      data: new Date().toISOString(),
      itens: itensCarrinho,
    };

    // Atualizar o estoque para cada item do carrinho
    itensCarrinho.forEach((item) => {
      atualizarEstoque(item.codigo, item.quantidade);
    });

    // Adicionar o pedido ao histórico
    adicionarHistorico(novoPedido);

    // Limpar o carrinho após finalizar o pedido
    setItensCarrinho([]);
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
        data={produtosFiltrados}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>
              {item.codigo} - {item.nome}
            </Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setProdutoSelecionado(item);
                setModalVisivel(true);
              }}
            >
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal para selecionar quantidade */}
      <Modal
        visible={modalVisivel}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Quantidade</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Digite a quantidade"
              value={quantidade.toString()}
              onChangeText={(text) => setQuantidade(Number(text))}
            />
            <Button title="Confirmar" onPress={adicionarAoCarrinho} />
            <Button title="Cancelar" onPress={() => setModalVisivel(false)} />
          </View>
        </View>
      </Modal>

      {/* Itens no Carrinho */}
      <Text style={styles.subtitle}>Carrinho</Text>
      <FlatList
        data={itensCarrinho}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <View style={styles.carrinhoItem}>
            <Text>
              {item.nome} - {item.quantidade}
            </Text>
          </View>
        )}
      />

      {/* Botão para Finalizar o Pedido */}
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
}

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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
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
    marginTop: 20,
    alignItems: 'center',
  },
  finalizarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Pedido;
