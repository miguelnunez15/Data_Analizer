import React, { useEffect, useState } from "react";
import "./ResultsPreview.css";

// Componentes
import Row from "./Row";
import EditPanel from "./EditPanel";

interface Props {
  csv: Record<string, any>[];
}

const ResultsPreview: React.FC<Props> = ({ csv }) => {
  const [cabeceras, setCabeceras] = useState<string[]>([]);
  const [numFilas, setNumFilas] = useState(0);
  const [numColumnas, setNumColumnas] = useState(0);
  const [csvData, setCsvData] = useState<Record<string, any>[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<Record<string, any> | null>(null);

  const ENV_DEVELOPMENT = process.env.NEXT_PUBLIC_ENV_DEVELOPMENT;

  useEffect(() => {
    if (csv && csv.length > 0) {
      const updatedCsv = csv.map((fila, index) => {
        const { ...rest } = fila;
        return {
          id: String(index),
          ...rest,
        };
      });
      setCsvData(updatedCsv);
      setNumFilas(updatedCsv.length);
      setNumColumnas(Object.keys(updatedCsv[0]).length);
      setCabeceras(["id", ...Object.keys(updatedCsv[0]).filter((key) => key !== "id")]);
    }
  }, [csv]);

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = event.currentTarget.getAttribute("data-key");
    if (ENV_DEVELOPMENT) console.log("Key: ", key);

    const newData = csvData.filter((element) => element["id"] !== key);
    console.log("New data: ", newData);
    setCsvData(newData);
  };

  /**
   * Abre el modal de edición de una fila
   * @param event 
   */
  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = event.currentTarget.getAttribute("data-key");
    if (ENV_DEVELOPMENT) console.log("Key: ", key);

    console.log("CSV Data: ", csvData);

    const data = csvData.find((element) => element["id"] === key) || null;
    if (ENV_DEVELOPMENT) console.log("Data: ", data);

    setModalData(data);
    setShowModal(true);
  };

  /**
   * Oculta el modal de edición de una fila
   */
  const handleHideModal = () => {
    setShowModal(false);
    setModalData(null);
  }

    /** 
     * Actualiza la fila y oculta el modal
    */
  const handleUpdateRow = (event: React.MouseEvent<HTMLButtonElement>) => {
    const inputs = document.querySelectorAll("input");
    const newData = { ...modalData };

    inputs.forEach((input) => {
      const key = input.getAttribute("name");
      const value = input.value;
      newData[key] = value;
    });

    const updatedData = csvData.map((element) => {
      if (element["id"] === newData["id"]) {
        return newData;
      }
      return element;
    });

    setCsvData(updatedData);
    handleHideModal();
  };

  return (
    <>
      {showModal ? (
        <EditPanel data={modalData} goBack={handleHideModal} saveChanges={handleUpdateRow} />
      ) : (
        <>
          {csvData.length > 0 ? (
            <div className="w-full">
              <div key="cabecera" className="row_table flex">
                <div key="cabecera_opciones" className="cell_table">Opciones</div>
                {cabeceras.map((cabecera, colIndex) => (
                  <div key={colIndex} className="cell_table">
                    {cabecera}
                  </div>
                ))}
              </div>

              {csvData.map((fila, rowIndex) => (
                <Row
                  key={rowIndex}
                  index={rowIndex}
                  cabeceras={cabeceras}
                  fila={fila}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))}
            </div>
          ) : (
            <div>No se ha podido parsear el CSV</div>
          )}
        </>
      )}
    </>
  );
};

export default ResultsPreview;
