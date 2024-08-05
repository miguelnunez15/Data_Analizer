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
                    <div className="w-full bg-gray-400 flex flex-col justify-center gap-10 p-10">
                        
                        
                        <h2 className="text-center font-extrabold text-3xl underline">{showedGraphic.title}</h2>    

                        <div className="w-full flex justify-center gap-3">
                            <label className="font-bold">Graphic Type:</label>
                            <p className="text-center">{showedGraphic.type}</p>
                        </div>
                        
                        <div className="w-full flex justify-center gap-3">
                            <label htmlFor="x" className="font-bold">X Axis:</label>
                            <Select options={axisOptions} defaultOption={showedGraphic.x} name="x" onChange={handleSelect} />
                        </div>

                        <div className="w-full flex justify-center gap-3">
                            <label htmlFor="y" className="font-bold">Y Axis:</label>
                            <Select options={axisOptions} defaultOption={showedGraphic.y} name="y" onChange={handleSelect} />
                        </div>
                        <Button text="Volver" onClick={() => setShowedGraphic(null)} />
                    </div>
                </>
            ) : (
                <>
                    <div className='flex flex-row gap-3 w-full'>
                        <Button type="secondary" text="Volver" onClick={goBack} />
                        <Button type="success" text="Nuevo Gráfico" onClick={handleCrearNuevoGrafico} />    
                        <Button type="danger" text="Eliminar Todos" onClick={handleEliminarTodos} />    
                    </div>
                    <div className='flex flex-row flex-wrap gap-10'>
                        {graphics.map((grafico, index) => (
                            <div key={index} className="border-white border-2 p-3 rounded flex flex-col gap-3 w-60">
                                <h2 className="text-center font-extrabold underline text-xl">{grafico.title}</h2>
                                <div className="flex gap-1">
                                    <span className='font-bold'>X Axis:</span>
                                    <span>{grafico.x}</span>
                                </div>
                                <div className="flex gap-1">
                                    <span className='font-bold'>Y Axis:</span>
                                    <span>{grafico.y}</span>
                                </div>
                                <div className="flex flex-col gap-2 justify-center">
                                    <Button datakey={grafico.id} type="success" onClick={handleShowGraphic} text="Ver Gráfico"/>
                                    <Button datakey={grafico.id} type="danger" onClick={handleEliminarGrafico} text="Eliminar"/>
                                </div>                            
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}

export default GraphicPanel;

