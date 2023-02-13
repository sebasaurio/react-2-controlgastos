import React, { useState, useEffect } from 'react';

export const Filter = ({ filter, setFilter }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label htmlFor="">Filtrar gastos</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">Todo</option>
            <option value="saving">Ahorro</option>
            <option value="food">Comida</option>
            <option value="house">Casa</option>
            <option value="various">Gastos varios</option>
            <option value="hobbies">Ocio</option>
            <option value="health">Salud</option>
            <option value="subscription">Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  );
};
