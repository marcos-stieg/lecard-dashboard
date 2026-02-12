import React, { useState } from 'react';

/**
 * LeCardDashboard – versão em React do dashboard gamificado.
 *
 * Este componente replica o layout básico do HTML original e inclui
 * funcionalidades de edição, adição e remoção de vendedores. Os dados
 * são mantidos no estado local (useState). Para persistir ou
 * compartilhar as alterações, seria necessário conectar este código
 * a um backend ou outro serviço de armazenamento.
 */
export default function LeCardDashboard() {
  // Estado inicial para os vendedores
  const [vendors, setVendors] = useState([
    { name: 'Fernando', contracts: 5, revenue: 22000, cards: 14 },
    { name: 'Thaislayne', contracts: 9, revenue: 15200, cards: 96 },
    { name: 'Sarah', contracts: 3, revenue: 15000, cards: 17 },
    { name: 'Bruna', contracts: 7, revenue: 8000, cards: 14 },
    { name: 'Alisson', contracts: 1, revenue: 3000, cards: 11 },
    { name: 'Vitor F.', contracts: 3, revenue: 3000, cards: 9 },
    { name: 'Luiza', contracts: 0, revenue: 0, cards: 0 },
    { name: 'Larissa', contracts: 0, revenue: 0, cards: 0 },
    { name: 'Gizely', contracts: 0, revenue: 0, cards: 0 }
  ]);

  // Modo de edição ativa ou inativa
  const [editMode, setEditMode] = useState(false);

  // Calcula totais a partir da lista de vendedores
  const totals = vendors.reduce(
    (acc, v) => {
      acc.contracts += v.contracts;
      acc.revenue += v.revenue;
      acc.cards += v.cards;
      return acc;
    },
    { contracts: 0, revenue: 0, cards: 0 }
  );
  const ticketMedio = totals.contracts > 0 ? totals.revenue / totals.contracts : 0;

  // Troca entre modo visualização e edição
  const toggleEditMode = () => setEditMode(!editMode);

  // Adiciona um novo vendedor solicitando dados via prompt
  const addVendor = () => {
    const name = window.prompt('Nome do novo vendedor:');
    if (!name) return;
    const contracts = parseFloat(window.prompt('Contratos iniciais:', '0')) || 0;
    const revenue = parseFloat(window.prompt('Faturamento inicial (R$):', '0')) || 0;
    const cards = parseFloat(window.prompt('Cartões iniciais:', '0')) || 0;
    setVendors([...vendors, { name: name.trim(), contracts, revenue, cards }]);
  };

  // Remove um vendedor pelo índice
  const deleteVendor = (index) => {
    if (!window.confirm(`Excluir vendedor ${vendors[index].name}?`)) return;
    setVendors(vendors.filter((_, i) => i !== index));
  };

  // Edita um campo de um vendedor (nome, contratos, faturamento ou cartões)
  const editVendorField = (index, field) => {
    const vendor = vendors[index];
    const labelMap = {
      name: 'Nome',
      contracts: 'Contratos',
      revenue: 'Faturamento (R$)',
      cards: 'Cartões'
    };
    const currentVal = vendor[field];
    const input = window.prompt(`Novo valor para ${labelMap[field]} de ${vendor.name}:`, currentVal);
    if (input === null) return;
    const newVal = field === 'name' ? input.trim() : parseFloat(input) || 0;
    const updated = vendors.map((v, i) => (i === index ? { ...v, [field]: newVal } : v));
    setVendors(updated);
  };

  // Formata números como moeda brasileira
  const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });
  const formatNumber = (value) => value.toLocaleString('pt-BR');

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className={`w-64 p-6 border-r border-yellow-500/20 ${editMode ? 'bg-gray-800' : 'bg-gray-850'}`}>
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-xl p-3 bg-gradient-to-br from-yellow-300 to-yellow-500 text-gray-900 font-extrabold text-2xl">LC</div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-br from-yellow-300 to-yellow-500 bg-clip-text text-transparent">LeCard</h1>
        </div>
        <nav className="space-y-4">
          <div>
            <h2 className="text-xs uppercase tracking-wider text-yellow-500/80 mb-2">Menu Principal</h2>
            <div className="space-y-1">
              <div className="px-4 py-2 rounded-lg bg-yellow-500 text-gray-900 font-semibold">Dashboard</div>
              {/* Itens adicionais podem ser adicionados aqui */}
            </div>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-wider text-yellow-500/80 mb-2">Ferramentas</h2>
            <div className="space-y-1">
              {editMode && (
                <button onClick={addVendor} className="w-full text-left px-4 py-2 hover:bg-yellow-500/20 rounded-lg">
                  ➕ Adicionar Vendedor
                </button>
              )}
              <button onClick={toggleEditMode} className="w-full text-left px-4 py-2 hover:bg-yellow-500/20 rounded-lg">
                {editMode ? 'Modo Visualização' : '✏️ Editar Painel'}
              </button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-4">Dashboard Real‑Time</h2>
        {/* Cards com KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-4 rounded-xl bg-gray-800 border border-yellow-500/20">
            <div className="text-sm uppercase text-yellow-500 mb-1">Faturamento Total</div>
            <div className="text-2xl font-extrabold" onClick={() => editMode && window.alert('Edite os vendedores para alterar o faturamento total.')}>{formatCurrency(totals.revenue)}</div>
            <div className="text-xs text-yellow-500/80 mt-1">{formatNumber(totals.revenue)} arrecadado</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-800 border border-yellow-500/20">
            <div className="text-sm uppercase text-yellow-500 mb-1">Contratos Fechados</div>
            <div className="text-2xl font-extrabold" onClick={() => editMode && window.alert('Edite os vendedores para alterar os contratos.')}>{formatNumber(totals.contracts)}</div>
            <div className="text-xs text-yellow-500/80 mt-1">Total de contratos</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-800 border border-yellow-500/20">
            <div className="text-sm uppercase text-yellow-500 mb-1">Cartões Emitidos</div>
            <div className="text-2xl font-extrabold" onClick={() => editMode && window.alert('Edite os vendedores para alterar os cartões.')}>{formatNumber(totals.cards)}</div>
            <div className="text-xs text-yellow-500/80 mt-1">Cartões acumulados</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-800 border border-yellow-500/20">
            <div className="text-sm uppercase text-yellow-500 mb-1">Ticket Médio</div>
            <div className="text-2xl font-extrabold" onClick={() => editMode && window.alert('Edite os vendedores para alterar o ticket médio.')}>{formatCurrency(ticketMedio)}</div>
            <div className="text-xs text-yellow-500/80 mt-1">Por contrato fechado</div>
          </div>
        </div>

        {/* Ranking de vendedores */}
        <section>
          <h3 className="text-2xl font-bold mb-2">Ranking Comercial</h3>
          <div className="overflow-x-auto rounded-lg border border-yellow-500/20">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-yellow-500">Posição</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-yellow-500">Consultor</th>
                  <th className="px-4 py-2 text-right text-sm font-semibold text-yellow-500">Contratos</th>
                  <th className="px-4 py-2 text-right text-sm font-semibold text-yellow-500">Faturamento</th>
                  <th className="px-4 py-2 text-right text-sm font-semibold text-yellow-500">Cartões</th>
                  {editMode && <th className="px-4 py-2 text-sm font-semibold text-yellow-500">Ações</th>}
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {vendors
                  .map((v, i) => ({ ...v, index: i }))
                  .sort((a, b) => b.contracts - a.contracts || b.revenue - a.revenue)
                  .map((v, rank) => (
                    <tr key={v.index} className="hover:bg-gray-800">
                      <td className="px-4 py-2 whitespace-nowrap">{rank + 1}º</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span
                          className={editMode ? 'underline cursor-pointer' : ''}
                          onClick={() => editMode && editVendorField(v.index, 'name')}
                        >
                          {v.name}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-right">
                        <span
                          className={editMode ? 'underline cursor-pointer' : ''}
                          onClick={() => editMode && editVendorField(v.index, 'contracts')}
                        >
                          {formatNumber(v.contracts)}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-right">
                        <span
                          className={editMode ? 'underline cursor-pointer' : ''}
                          onClick={() => editMode && editVendorField(v.index, 'revenue')}
                        >
                          {formatCurrency(v.revenue)}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-right">
                        <span
                          className={editMode ? 'underline cursor-pointer' : ''}
                          onClick={() => editMode && editVendorField(v.index, 'cards')}
                        >
                          {formatNumber(v.cards)}
                        </span>
                      </td>
                      {editMode && (
                        <td className="px-4 py-2 text-center space-x-2">
                          <button onClick={() => editVendorField(v.index, 'revenue')} className="text-yellow-500 hover:text-yellow-300">Editar</button>
                          <button onClick={() => deleteVendor(v.index)} className="text-red-500 hover:text-red-300">Excluir</button>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}