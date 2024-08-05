import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Components
import Select from "./Select";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface SelectProps {
    name: string;
    defaultOption: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
}


const Graphic: React.FC = () => {
    const [data, setData] = useState<Array<{ [key: string]: any }>>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [xColumn, setXColumn] = useState<string>("");
    const [yColumn, setYColumn] = useState<string>("");

    useEffect(() => {
        // Simula la carga de datos desde un archivo CSV o una API
        const fetchData = async () => {
            const fetchedData = [
                { "Columna 1": 1, "Columna 2": 10 },
                { "Columna 1": 2, "Columna 2": 20 },
                { "Columna 1": 3, "Columna 2": 30 },
            ];
            setData(fetchedData);
            setColumns(Object.keys(fetchedData[0]));
        };
        fetchData();
    }, []);

    const handleXColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => { setXColumn(e.target.value); };

    const handleYColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => { setYColumn(e.target.value); };

    const chartData = {
        labels: data.map(row => row[xColumn]),
        datasets: [
            {
                label: `${yColumn} vs ${xColumn}`,
                data: data.map(row => row[yColumn]),
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    return (
        <div>
            <div className="flex flex-row gap-3 mb-4">
                <Select
                    name="xColumn"
                    defaultOption=""
                    onChange={handleXColumnChange}
                    options={columns}
                />
                <Select
                    name="yColumn"
                    defaultOption=""
                    onChange={handleYColumnChange}
                    options={columns}
                />
            </div>
            {xColumn && yColumn && (
                <Line data={chartData} />
            )}
        </div>
    );
};

export default Graphic;
