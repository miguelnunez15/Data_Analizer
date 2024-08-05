import React from 'react';
import Button from './Button';

interface props {
    cabecera: string;
    colIndex: number;
    handleOrderBy: React.MouseEventHandler<HTMLButtonElement>;
}


const ElementoCabecera: React.FC<props> = ({ cabecera, colIndex, handleOrderBy }) => {

    return (
        <div key={colIndex} className="cell_table gap-2">
            <span>{cabecera}</span>
            <Button type="info" icono="bi-arrow-down" onClick={handleOrderBy} datakey={cabecera} />
        </div>
    );
};

export default ElementoCabecera;