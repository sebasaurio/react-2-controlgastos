import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ControlBudget = ({
  budget,
  transaction,
  setBudget,
  setTransaction,
  setIsValidBudget,
}) => {
  const [budgetPercentage, setBudgetPercentage] = useState(0);
  const [budgetAvailable, setBudgetAvailable] = useState(0);
  const [budgetSpent, setBudgetSpent] = useState(0);

  const handleResetApp = () => {
    const result = confirm('Deseas reiniciar el presupuesto?');
    if (result) {
      setBudget(0);
      setTransaction([]);
      setIsValidBudget(false);
    }
  };

  const formatBudget = (quantity) => {
    return quantity.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  useEffect(() => {
    const totalSpent = transaction.reduce(
      (acc, item) => (acc += Number(item.quantity)),
      0
    );

    const totalAvailable = budget - totalSpent;
    const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(
      2
    );
    setBudgetPercentage(newPercentage);

    setBudgetSpent(totalSpent);
    setBudgetAvailable(totalAvailable);
  }, [transaction]);

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <p>
          <CircularProgressbar
            value={budgetPercentage}
            styles={buildStyles({
              pathColor: budgetPercentage > 100 ? '#DC2626' : '#3B82F6',
              trailColor: '#F5F5F5',
              textColor: budgetPercentage > 100 ? '#DC2626' : '#3B82F6',
            })}
            text={`${budgetPercentage}% Gastado`}
          />
        </p>
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>Presupuesto: </span> {formatBudget(budget)}
        </p>
        <p className={`${budgetAvailable < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span> {formatBudget(budgetAvailable)}
        </p>
        <p>
          <span>Gastado: </span> {formatBudget(budgetSpent)}
        </p>
      </div>
    </div>
  );
};
