import React from 'react';
import { NewBudget } from './NewBudget';
import { ControlBudget } from './ControlBudget';

export const Header = ({
  budget,
  setBudget,
  isValidBudget,
  setIsValidBudget,
  transaction,
  setTransaction,
}) => {
  return (
    <header>
      <h1>Planificador de gastos</h1>

      {isValidBudget ? (
        <ControlBudget
          budget={budget}
          setBudget={setBudget}
          transaction={transaction}
          setTransaction={setTransaction}
          setIsValidBudget={setIsValidBudget}
        />
      ) : (
        <NewBudget
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      )}
    </header>
  );
};
