import Papa from 'papaparse';
import React from 'react';

export function parseCSV(file : File): Promise<Record<string, any>[]> {

    const ENV_DEVELOPMENT = process.env.ENV_DEVELOPMENT;

    return new Promise((resolve, reject) => {

        const reader = new FileReader();
        reader.onload = (event) => {
          if (!event.target || !event.target.result) {
            reject(new Error("Error reading file"));
            return;
          }
          const text = event.target.result as string;
          if (ENV_DEVELOPMENT) console.log(text);
    
          Papa.parse(text, {
            header: true,
            complete: (results : any) => {
              resolve(results.data);
            },
            error: (error : React.ErrorInfo) => {
              reject(error);
            }
          });
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
      });
}