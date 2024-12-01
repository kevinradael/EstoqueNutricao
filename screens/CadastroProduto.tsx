import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEstoqueContext } from '../context/EstoqueContext';

const CadastroProduto = () => {
  const { adicionarProduto } = useEstoqueContext();
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('Kg');
  const [localizacao, setLocalizacao] = useState('');
  const [validade, setValidade] = useState('');
  const [lote, setLote] = useState('');

  const formatarValidade = (text: string) => {
    const textoSemBarra = text.replace(/\D/g, ''); // Remove caracteres não numéricos
    let validadeFormatada = textoSemBarra;

    if (textoSemBarra.length > 2) {
      validadeFormatada = `${textoSemBarra.slice(0, 2)}/${textoSemBarra.slice(2)}`;
    }
    if (textoSemBarra.length > 4) {
      validadeFormatada = `${textoSemBarra.slice(0, 2)}/${textoSemBarra.slice(2, 4)}/${textoSemBarra.slice(4, 8)}`;
    }
    setValidade(validadeFormatada);
  };

  const handleCadastro = () => {
    if (!codigo || !nome || !quantidade || !validade) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const novoProduto = {
      codigo,
      nome,
      quantidade: parseFloat(quantidade),
      validade, // Incluindo a validade no produto
      unidadeMedida,
      localizacao,
      lote,
    };

    // Adicionando o produto ao estoque usando a função do contexto
    adicionarProduto(novoProduto);
    Alert.alert('Sucesso', 'Produto cadastrado e adicionado ao estoque!');

    // Limpando os campos após o cadastro
    setCodigo('');
    setNome('');
    setQuantidade('');
    setUnidadeMedida('Kg');
    setLocalizacao('');
    setValidade('');
    setLote('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Produto</Text>
      <TextInput
        placeholder="Código"
        value={codigo}
        onChangeText={setCodigo}
        style={styles.input}
      />
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        style={styles.input}
        keyboardType="numeric"
      />
      <Text>Unidade de Medida</Text>
      <Picker
        selectedValue={unidadeMedida}
        onValueChange={(itemValue) => setUnidadeMedida(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Kg" value="Kg" />
        <Picker.Item label="g" value="g" />
        <Picker.Item label="Un" value="Un" />
        <Picker.Item label="Sache" value="Sache" />
      </Picker>
      <TextInput
        placeholder="Localização"
        value={localizacao}
        onChangeText={setLocalizacao}
        style={styles.input}
      />
      <TextInput
        placeholder="Validade (DD/MM/AAAA)"
        value={validade}
        onChangeText={formatarValidade}
        style={styles.input}
        keyboardType="numeric"
        maxLength={10}
      />
      <TextInput
        placeholder="Lote"
        value={lote}
        onChangeText={setLote}
        style={styles.input}
      />
      <Button title="Cadastrar Produto" onPress={handleCadastro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
  picker: { height: 50, marginBottom: 15 },
});

export default CadastroProduto;
