import React, { useEffect, useState } from "react";
import "./ResultsPreview.css";

// Componentes
import Row from "./Row";
import EditPanel from "./EditPanel";
import GraphicPanel from "./GraphicPanel";
import ElementoCabecera from "./ElementoCabecera";
import Button from "./Button";

interface Props {
  csv: Record<string, any>[];
  newCSV: () => void;
}

const ResultsPreview: React.FC<Props> = ({ csv, newCSV }) => {
  const [cabeceras, setCabeceras] = useState<string[]>([]);
  const [numFilas, setNumFilas] = useState(0);
  const [numColumnas, setNumColumnas] = useState(0);
  const [csvData, setCsvData] = useState<Record<string, any>[]>([]);

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [modalData, setModalData] = useState<Record<string, any> | null>(null);

  const [showModalGraphic, setShowModalGraphic] = useState(false);


  const ENV_DEVELOPMENT = process.env.NEXT_PUBLIC_ENV_DEVELOPMENT;

  useEffect(() => {
    if (csv && csv.length > 0) {

      if (!csv[0].hasOwnProperty("id")) {
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
        localStorage.setItem("headers", JSON.stringify(["id", ...Object.keys(updatedCsv[0]).filter((key) => key !== "id")]))        
        localStorage.setItem("data", JSON.stringify(updatedCsv));
      } else {
        setCsvData(csv);
        setNumFilas(csv.length);
        setNumColumnas(Object.keys(csv[0]).length);
        setCabeceras(Object.keys(csv[0]));
        localStorage.setItem("headers", JSON.stringify(Object.keys(csv[0])))
        localStorage.setItem("data", JSON.stringify(csv));
      }

    }
  }, [csv]);

  /**
   * Elimina un elemento del CSV
   * @param event 
   */
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = event.currentTarget.getAttribute("data-key");
    if (ENV_DEVELOPMENT) console.log("Key: ", key);

    const newData = csvData.filter((element) => element["id"] !== key);
    console.log("New data: ", newData);
    setCsvData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  /**
   * Abre el modal de edición de una fila
   * @param event 
   */
  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = event.currentTarget.getAttribute("data-key");

    if (ENV_DEVELOPMENT) console.log("Key: ", key);
    if (ENV_DEVELOPMENT) console.log("CSV Data: ", csvData);

    const data = csvData.find((element) => element["id"] === key) || null;
    if (ENV_DEVELOPMENT) console.log("Data: ", data);

    setModalData(data);
    setShowModalEdit(true);
    localStorage.setItem("data", JSON.stringify(data));
  };

  /**
   * Oculta el modal de edición de una fila
   */
  const handleHideModal = () => {
    setShowModalEdit(false);
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
      if (!key) return;
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
    localStorage.setItem("data", JSON.stringify(updatedData));
  };


  /**
   * Ordena el CSV por la cabecera seleccionada
   * @param event 
   * @returns 
   */
  const handleOrderBy = (event: React.MouseEvent<HTMLButtonElement>) => {
    const key = event.currentTarget.getAttribute("data-key");
    if (ENV_DEVELOPMENT) console.log("Key: ", key);
  
    if (!key) return;
  
    const newData = [...csvData].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
  
    setCsvData(newData);
  };


  /**
   * Descarga el CSV final
   */
  const downloadCSV = () => {
    const csv = csvData.map((fila) => {
      return Object.values(fila).join(",");
    }).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
  }


  const handleShowModalGraphic = () => { setShowModalGraphic(true);  }

  const handleHideModalGraphic = () => { setShowModalGraphic(false);  }




  return (
    <div className="w-full flex flex-col gap-10 p-5 pt-10">
      <div className="flex justify-center gap-3">
        <Button type="primary" text="Descargar CSV" onClick={downloadCSV}/> 
        <Button type="primary" text="Nuevo CSV" onClick={newCSV}/>
        <Button type="secondary" text="Explorar Gráficas" onClick={handleShowModalGraphic}/>
      </div>

      {showModalEdit ? (
        <EditPanel 
          data={modalData} 
          goBack={handleHideModal} 
          saveChanges={handleUpdateRow} 
        />
      ) : showModalGraphic ? (
        <GraphicPanel goBack={handleHideModalGraphic}/>
      ) : (
        <>
          {csvData.length > 0 ? (
            <div className="w-full">
              <div key="cabecera" className="row_table flex">
                <div key="cabecera_opciones" className="cell_table">Opciones</div>
                {cabeceras.map((cabecera, colIndex) => (
                  <ElementoCabecera 
                    key={cabecera} 
                    cabecera={cabecera} 
                    colIndex={colIndex} 
                    handleOrderBy={handleOrderBy}
                  /> 
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
            <div>Cargando...</div>
          )}
        </>
      )}
    </div>
  );
};

export default ResultsPreview;
