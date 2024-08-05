import React from 'react';

import './ResultsPreview.css';


interface Props {
    csv: Record<string, any>[];
}

const ResultsPreview: React.FC<Props> = ({csv}) => {

    const [cabeceras, setCabeceras] = React.useState<string[]>([]);
    const [numFilas, setNumFilas] = React.useState(0);
    const [numColumnas, setNumColumnas] = React.useState(0);

    React.useEffect(() => {
        if (csv) {
            setNumFilas(csv.length);
            setNumColumnas(Object.keys(csv[0]).length);
            const cabeceras = Object.keys(csv[0]);
            setCabeceras(cabeceras);
        }
    }, [csv]);

    return (
        <>
            {csv.length > 0 ? (
                <div className="w-full">
                <div key="cabecera" className="row flex">
                    {Array.from({ length: numColumnas }).map((_, colIndex) => (
                        <div key={colIndex} className="cell">
                            {cabeceras[colIndex]}
                        </div>
                    ))}
                </div>

                {Array.from({ length: numFilas }).map((_, rowIndex) => (
                    <div key={rowIndex} className="row flex">
                        {Array.from({ length: numColumnas }).map((_, colIndex) => (
                            <div key={colIndex} className="cell">
                                {csv[rowIndex][Object.keys(csv[rowIndex])[colIndex]]}
                            </div>
                        ))}
                    </div>
                ))}
                </div>
            ) : (
                <div>No se ha podido parsear el CSV</div>
            )}
        </>
      );

}

export default ResultsPreview;