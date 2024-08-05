import React from "react";
import "./EditPanel.css";
import Button from "./Button";

interface props {
    data: Record<string, any> | null;
    goBack: React.MouseEventHandler<HTMLButtonElement>;
    saveChanges: React.MouseEventHandler<HTMLButtonElement>;
}

const EditPanel: React.FC<props> = ({ data, goBack, saveChanges }) => {

    return (
        <div className="edit-panel">
            <div>
                {/* Recorre data */}
                {data && Object.keys(data).map((key, index) => (
                    key === "id" ? null : 
                    <div key={index} className="flex-row">
                        <span>{key}</span>
                        <input type="text" name={key} defaultValue={data[key]} />
                    </div>
                ))}
            </div>
            <div className="button-group">
                <Button type="success" text="Guardar" onClick={saveChanges} />
                <Button type="primary" text="Atrás" onClick={goBack} />
            </div>
        </div>
    );
}

export default EditPanel;
