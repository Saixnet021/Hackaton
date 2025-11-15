'use client';

import React, { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const UploadHVPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      if (file.name.endsWith('.csv')) {
        reader.onload = (event) => {
          if (event.target) {
            const csvData = Papa.parse(event.target.result as string, {
              header: true,
            });
            setData(csvData.data);
          }
        };
        reader.readAsText(file);
      } else if (file.name.endsWith('.xlsx')) {
        reader.onload = (event) => {
          if (event.target) {
            const workbook = XLSX.read(event.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            setData(jsonData);
          }
        };
        reader.readAsBinaryString(file);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Subir Hojas de Vida</h1>
      <div className="mt-4">
        <input type="file" accept=".csv, .xlsx" onChange={handleFileChange} />
        <button
          onClick={handleFileUpload}
          className="px-4 py-2 ml-4 text-white bg-blue-500 rounded"
        >
          Subir y Procesar
        </button>
      </div>
      {data.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Datos Procesados</h2>
          <pre className="p-4 mt-4 bg-gray-200 rounded">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default UploadHVPage;
