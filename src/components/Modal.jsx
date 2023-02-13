import React, { useState, useEffect } from 'react';

import { Message } from './Message';
import IconoCerrarModal from '../img/cerrar.svg';

export const Modal = ({
  setModal,
  animateModal,
  setAnimateModal,
  saveTransaction,
  transactionToEdit,
  setTransactionToEdit,
}) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [id, setId] = useState('');

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (Object.keys(transactionToEdit).length > 0) {
      setName(transactionToEdit.name);
      setQuantity(transactionToEdit.quantity);
      setCategory(transactionToEdit.category);
      setDate(transactionToEdit.date);
      setId(transactionToEdit.id);
    }
  }, []);

  const handleCloseModal = () => {
    setAnimateModal(false);
    setTransactionToEdit({});
    setTimeout(() => {
      setModal(false);
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([name, quantity, category].includes('')) {
      //error de validacion
      setMessage('todos los campos son obligatorios');
      setTimeout(() => {
        setMessage('');
      }, 2000);
      return;
    }

    saveTransaction({ name, quantity, category, id, date });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={IconoCerrarModal}
          alt="Cerrar modal"
          onClick={handleCloseModal}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}
      >
        <legend>{transactionToEdit.name ? 'Editar' : 'Nuevo'} gasto</legend>
        {message && <Message type={'error'}>{message}</Message>}
        <div className="campo">
          <label htmlFor="name">Nombre gasto</label>
          <input
            id="name"
            type="text"
            placeholder="agrega el nuevo gasto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="quantity">Cantidad</label>
          <input
            id="quantity"
            type="number"
            placeholder="agrega la cantidad, 300"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="category">Categoria</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Seleccione</option>
            <option value="saving">Ahorro</option>
            <option value="food">Comida</option>
            <option value="house">Casa</option>
            <option value="various">Gastos varios</option>
            <option value="hobbies">Ocio</option>
            <option value="health">Salud</option>
            <option value="subscription">Suscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          value={transactionToEdit.name ? 'Editar gasto' : 'Nuevo gasto'}
        />
      </form>
    </div>
  );
};
