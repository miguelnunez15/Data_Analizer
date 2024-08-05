import { useEffect, useState } from "react";

interface SelectProps {
    name: string;
    defaultOption: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
}

const Select: React.FC<SelectProps> = ({ name, defaultOption, onChange, options }) => {
    const [selectedOption, setSelectedOption] = useState<string>(defaultOption);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
        onChange(e);
    };

    return (
        <select 
            value={selectedOption} 
            name={name} 
            onChange={handleChange} 
            className="border border-gray-300 rounded-md p-1 text-black"
        >
            {options.map((option) => (
                <option key={option.trim()} value={option.trim()} className="text-black">
                    {option.trim()}
                </option>
            ))}
        </select>
    );
};

export default Select;
