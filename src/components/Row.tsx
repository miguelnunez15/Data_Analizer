
import React from 'react';

// Componentes
import Button from "./Button";


interface props {
    index : string | number;
    cabeceras: string[];
    fila: Record<string, any>;
    handleDelete: React.MouseEventHandler<HTMLButtonElement>;
    handleEdit: React.MouseEventHandler<HTMLButtonElement>;
}

const Row: React.FC<props> = ({index, cabeceras, fila, handleDelete, handleEdit}) => {
    return (
        <div key={index} className="row_table flex">
            <div key="opciones" className="cell_table flex flex-row gap-5">
            <Button
                datakey={fila["id"]}
                text="Edit"
                type="primary"
                onClick={handleEdit}
            />
            <Button
                datakey={fila["id"]}
                type="danger"
                icono="bi-x-circle"
                onClick={handleDelete}
            />
            </div>

            {/* Demás columnas */}
            {cabeceras.map((key, colIndex) => (
                <div key={colIndex} className="cell_table">
                    {fila[key]}
                </div>
            ))}
        </div>
    )
}

export default Row;