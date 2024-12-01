import React, { createContext, useState, useContext } from 'react';

type Produto = {
  codigo: string;
  nome: string;
  quantidade: number;
  validade: string; // Adicionando validade
};

type Pedido = {
  codigo: string; // Código único para identificar o pedido
  data: string; // Data do pedido
  itens: { codigo: string; nome: string; quantidade: number}[]; // Itens do pedido
};

type EstoqueContextType = {
  estoque: Produto[];
  historico: Pedido[];
  atualizarEstoque: (codigo: string, quantidade: number) => void;
  adicionarHistorico: (pedido: Pedido) => void;
  adicionarProduto: (produto: Produto) => void; // Função para adicionar produtos
};

const EstoqueContext = createContext<EstoqueContextType | undefined>(undefined);

export const EstoqueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [estoque, setEstoque] = useState<Produto[]>([
    { codigo: '001', nome: 'Produto A', quantidade: 10, validade: '2024-12-31' },
    { codigo: '002', nome: 'Produto B', quantidade: 15, validade: '2025-01-15' },
    { codigo: '003', nome: 'Produto C', quantidade: 7, validade: '2024-11-30' },
  ]);

  const [historico, setHistorico] = useState<Pedido[]>([]);

  // Atualizar o estoque ao retirar itens
  const atualizarEstoque = (codigo: string, quantidade: number) => {
    setEstoque((prev) =>
      prev.map((produto) =>
        produto.codigo === codigo
          ? { ...produto, quantidade: produto.quantidade - quantidade }
          : produto
      )
    );
  };

  // Adicionar um novo pedido ao histórico
  const adicionarHistorico = (pedido: Pedido) => {
    setHistorico((prev) => [...prev, pedido]);
  };

  // Adicionar um novo produto ao estoque
  const adicionarProduto = (produto: Produto) => {
    setEstoque((prev) => [...prev, produto]);
  };

  return (
    <EstoqueContext.Provider
      value={{
        estoque,
        historico,
        atualizarEstoque,
        adicionarHistorico,
        adicionarProduto, // Disponibilizando a função para adicionar produtos
      }}
    >
      {children}
    </EstoqueContext.Provider>
  );
};

// Hook para acessar o EstoqueContext
export const useEstoqueContext = () => {
  const context = useContext(EstoqueContext);
  if (!context) {
    throw new Error('useEstoqueContext deve ser usado dentro de EstoqueProvider');
  }
  return context;
};
