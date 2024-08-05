'use client';

import Image from "next/image";

// ? Componentes
import FileInput from "@/components/FileInput";
import ResultsPreview from "@/components/ResultsPreview";

// ? Útiles
import { parseCSV } from "@/lib/csvUtils";
import { useState } from "react";

export default function Home() {

  const ENV_DEVELOPMENT = process.env.ENV_DEVELOPMENT

  const [data, setData] = useState<Record<string, any>[]>([]);

  const handleFileChange = async (event : React.ChangeEvent<HTMLInputElement>) => {

    if (!event.target.files) return;
    const file = event.target.files[0];

    if (file) {
      try {
        const result: any[] = await parseCSV(file);
        setData(result);
        if (ENV_DEVELOPMENT) console.log("Data: ", result);

      } catch (error) {
        console.error("Error parsing CSV file: ", error);
      }
      
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between">      

      {data.length > 0 ? (
        <>
          <ResultsPreview csv={ data }/>
        </>
      ) : (
        <FileInput onChange={handleFileChange} />
      )}
      
    </main>
  );
}
