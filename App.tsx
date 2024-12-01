import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CadastroProdutoScreen from './screens/CadastroProduto';
import EstoqueScreen from './screens/Estoque';
import HistoricoScreen from './screens/Historico';
import PedidoScreen from './screens/Pedido';
import { EstoqueProvider } from './context/EstoqueContext';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <EstoqueProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Cadastro de Produto" component={CadastroProdutoScreen} />
          <Tab.Screen name="Estoque" component={EstoqueScreen} />
          <Tab.Screen name="Historico" component={HistoricoScreen} />
          <Tab.Screen name="Pedido" component={PedidoScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </EstoqueProvider>
  );
}

export default App;
