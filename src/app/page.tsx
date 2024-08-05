'use client';

// ? Componentes
import FileInput from "@/components/FileInput";
import ResultsPreview from "@/components/ResultsPreview";

// ? Útiles
import { parseCSV } from "@/lib/csvUtils";
import { useState } from "react";
import { saveToLocalStorage } from "@/lib/localStorage";

export default function Home() {

  const NEXT_PUBLIC_ENV_DEVELOPMENT = process.env.NEXT_PUBLIC_ENV_DEVELOPMENT

  const [data, setData] = useState<Record<string, any>[]>([]);

  const handleFileChange = async (event : React.ChangeEvent<HTMLInputElement>) => {

    if (!event.target.files) return;
    const file = event.target.files[0];

    if (file) {
      try {
        const result: any[] = await parseCSV(file);
        setData(result);
        if (NEXT_PUBLIC_ENV_DEVELOPMENT) console.log("Data: ", result);
        saveToLocalStorage('graphics', []);
        saveToLocalStorage('headers', []);

      } catch (error) {
        console.error("Error parsing CSV file: ", error);
      }
      
    }
  };

  const newCSV = () => {
    setData([]);
  }

  return (
    <main className="flex flex-col items-center justify-between">      

      {data.length > 0 ? (
        <>
          <ResultsPreview csv={ data } newCSV={ newCSV } />
        </>
      ) : (
        <FileInput onChange={handleFileChange} />
      )}
      
    </main>
  );
}
