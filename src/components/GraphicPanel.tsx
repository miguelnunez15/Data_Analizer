import { getFromLocalStorage, saveToLocalStorage } from '@/lib/localStorage';
import React, { useEffect, useState } from 'react';

// Componentes
import Button from './Button';
import Select from './Select';

type Graphic = {
    id: number;
    title: string;
    type: string;
    x: string;
    y: string;
    data: any[];
};

interface Props {
    goBack: React.UIEventHandler<HTMLButtonElement>;
}

const GraphicPanel: React.FC<Props> = ({ goBack }) => {

    const [graphics, setGraphics] = useState<Graphic[]>([]);
    const [showedGraphic, setShowedGraphic] = useState<Graphic | null>(null);
    const [axisOptions, setAxisOptions] = useState<string[]>([]);

    useEffect(() => {
        const localStorage = checkFromLocalStorage();
        console.log("Contenido localStorage: ", localStorage);
        if (!localStorage) setGraphics([]);
        else {
            const value = getFromLocalStorage('graphics');
            setGraphics(value || []);
        }

        const headers = getFromLocalStorage('headers');
        if (headers) {
            const options = headers.filter((header: string) => header !== 'id');
            setAxisOptions(options);
        }
    }, []);

    const checkFromLocalStorage = () => {
        const value = getFromLocalStorage('graphics');
        return value !== null;
    }

    const handleCrearNuevoGrafico = () => {
        console.log("Crear nuevo gráfico");

        const grafico: Graphic = {
            id: graphics.length + 1,
            title: `Gráfico ${graphics.length + 1}`,
            type: 'line',
            x: '',
            y: '',
            data: [],
        }

        setGraphics(prevGraphics => {
            const newGraphics = [...prevGraphics, grafico];
            saveToLocalStorage('graphics', newGraphics);
            return newGraphics;
        });
    }

    const handleEliminarGrafico: React.MouseEventHandler<HTMLButtonElement> = (event) => {

        console.log("Elimino gráfico con id: ", event.currentTarget.dataset.id);
        const graficoId = event.currentTarget.getAttribute("data-key");
        console.log(`Eliminar gráfico con ID: ${graficoId}`);

        console.log("Graphic id: " + graficoId);

        setGraphics(prevGraphics => {
            const updatedGraphics = prevGraphics.filter(grafico => String(grafico.id) !== String(graficoId));
            saveToLocalStorage('graphics', updatedGraphics);
            return updatedGraphics;
        });
    }

    const handleEliminarTodos = () => {
        console.log("Eliminar todos los gráficos");
        setGraphics([]);
        saveToLocalStorage('graphics', []);
    }

    const handleShowGraphic: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        const graficoId = event.currentTarget.getAttribute("data-key");
        console.log("Mostrar gráfico con ID: ", graficoId);

        const grafico = graphics.find(grafico => String(grafico.id) === String(graficoId));
        console.log("Grafico Mostrado: ", grafico);
        if (grafico) {
            setShowedGraphic(grafico);
        }
    }

    const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {

        const { name, value } = event.target;
        console.log(`Select ${name} changed to ${value}`);

        setGraphics(prevGraphics => {
            const updatedGraphics = prevGraphics.map(grafico => {
                if (grafico.id === showedGraphic?.id) {
                    return {
                        ...grafico,
                        [name]: value.trim(),
                    }
                }
                return grafico;
            });
            saveToLocalStorage('graphics', updatedGraphics);
            return updatedGraphics;
        });
    }

    return (
        <>
            {showedGraphic ? (
                <>
                    <div>
                        <h2>{showedGraphic.title}</h2>
                        <p>{showedGraphic.type}</p>
                        {/* Input x e y */}
                        <div>
                            <label htmlFor="x">X</label>
                            <Select options={axisOptions} defaultOption={showedGraphic.x} name="x" onChange={handleSelect} />
                        </div>
                        <div>
                            <label htmlFor="y">Y</label>
                            <Select options={axisOptions} defaultOption={showedGraphic.y} name="y" onChange={handleSelect} />
                        </div>
                        <Button text="Volver" onClick={() => setShowedGraphic(null)} />
                    </div>
                </>
            ) : (
                <>
                    <div className='flex flex-row gap-3'>
                        <Button type="secondary" text="Volver" onClick={goBack} />
                        <Button type="success" text="Nuevo Gráfico" onClick={handleCrearNuevoGrafico} />    
                        <Button type="danger" text="Eliminar Todos" onClick={handleEliminarTodos} />    
                    </div>
                    <div className='flex flex-row flex-wrap gap-10'>
                        {graphics.map((grafico, index) => (
                            <div key={index} className="border-white border-2 p-3">
                                <h3>{grafico.title}</h3>
                                <p>{grafico.type}</p>
                                <Button datakey={grafico.id} onClick={handleShowGraphic} text="Ver Gráfico"/>
                                <Button datakey={grafico.id} onClick={handleEliminarGrafico} text="Eliminar"/>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default GraphicPanel;

