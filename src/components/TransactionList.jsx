import React from 'react';
import { Transaction } from './Transaction';

export const TransactionList = ({
  transaction,
  setTransactionToEdit,
  deleteTransaction,
  filteredTransaction,
  filter,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filter ? (
        <>
          <h2>
            {filteredTransaction.length
              ? 'Gastos'
              : 'No hay gastos en esta categoria'}
          </h2>
          {filteredTransaction.map((item) => (
            <Transaction
              key={item.id}
              transaction={item}
              setTransactionToEdit={setTransactionToEdit}
              deleteTransaction={deleteTransaction}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{transaction.length ? 'Gastos' : 'No hay gastos'}</h2>
          {transaction.map((item) => (
            <Transaction
              key={item.id}
              transaction={item}
              setTransactionToEdit={setTransactionToEdit}
              deleteTransaction={deleteTransaction}
            />
          ))}
        </>
      )}
    </div>
  );
};
