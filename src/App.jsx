import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Filter } from './components/Filter';
import { Modal } from './components/Modal';
import { TransactionList } from './components/TransactionList';

import { generateId } from './helpers';

import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget') ?? 0)
  );
  const [isValidBudget, setIsValidBudget] = useState(false);

  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const [transaction, setTransaction] = useState(
    localStorage.getItem('transaction')
      ? JSON.parse(localStorage.getItem('transaction'))
      : []
  );

  const [transactionToEdit, setTransactionToEdit] = useState({});
  const [filter, setFilter] = useState('');
  const [filteredTransaction, setFilteredTransaction] = useState([]);

  useEffect(() => {
    if (Object.keys(transactionToEdit).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimateModal(true);
      }, 500);
    }
  }, [transactionToEdit]);

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('transaction', JSON.stringify(transaction) ?? []);
  }, [transaction]);

  useEffect(() => {
    if (filter) {
      const filteredTransaction = transaction.filter(
        (item) => item.category === filter
      );
      setFilteredTransaction(filteredTransaction);
    }
  }, [filter]);

  useEffect(() => {
    const budgetLocal = Number(localStorage.getItem('budget') ?? 0);
    if (budgetLocal > 0) {
      setIsValidBudget(true);
    }
  }, []);

  const handleNewTransaction = () => {
    setTransactionToEdit({});
    setModal(true);
    setTimeout(() => {
      setAnimateModal(true);
    }, 500);
  };

  const saveTransaction = (newTransaction) => {
    if (newTransaction.id) {
      //update
      const updatedTransactions = transaction.map((item) =>
        item.id === newTransaction.id ? newTransaction : item
      );
      setTransaction(updatedTransactions);
      setTransactionToEdit({});
    } else {
      //new
      newTransaction.id = generateId();
      newTransaction.date = Date.now();
      setTransaction([...transaction, newTransaction]);
    }

    setModal(false);
    setTimeout(() => {
      setAnimateModal(false);
    }, 800);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transaction.filter((item) => item.id !== id);
    setTransaction(updatedTransactions);
  };

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        transaction={transaction}
        setTransaction={setTransaction}
      />
      {isValidBudget && (
        <>
          <main>
            <Filter filter={filter} setFilter={setFilter} />
            <TransactionList
              transaction={transaction}
              setTransactionToEdit={setTransactionToEdit}
              deleteTransaction={deleteTransaction}
              filteredTransaction={filteredTransaction}
              filter={filter}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNewTransaction}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveTransaction={saveTransaction}
          transactionToEdit={transactionToEdit}
          setTransactionToEdit={setTransactionToEdit}
        />
      )}
    </div>
  );
}

export default App;
