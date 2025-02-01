import React, { useState } from 'react';

function App() {
  const [ledgerNumber, setLedgerNumber] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleSearchLedger = async () => {
    if (!ledgerNumber) return;
    try {
      // Ajuste a URL conforme seu backend
      const res = await fetch(`http://localhost:3000/block/${ledgerNumber}`);
      const data = await res.json();
      setResponseData(data);
    } catch (err) {
      console.error('Erro ao buscar ledger', err);
    }
  };

  return (
    <div style={{ margin: '1rem' }}>
      <h1>Interstellar Explorer - Frontend</h1>
      <div>
        <input
          type="number"
          placeholder="Número do Ledger"
          value={ledgerNumber}
          onChange={(e) => setLedgerNumber(e.target.value)}
        />
        <button onClick={handleSearchLedger}>
          Buscar Ledger
        </button>
      </div>
      {responseData && (
        <pre style={{ background: '#eee', padding: '1rem' }}>
          {JSON.stringify(responseData, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
