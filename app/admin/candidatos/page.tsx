
'use client';

import React, { useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const AdminCandidatosPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [partido, setPartido] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (file && partido) {
      const reader = new FileReader();
      if (file.name.endsWith('.csv')) {
        reader.onload = (event) => {
          if (event.target) {
            const csvData = Papa.parse(event.target.result as string, {
              header: true,
            });
            const processedData = csvData.data.map((item: Record<string, unknown>) => ({ ...item, partido }));
            setData(processedData);
          }
        };
        reader.readAsText(file);
      } else if (file.name.endsWith('.xlsx')) {
        reader.onload = (event) => {
          if (event.target) {
            const workbook = XLSX.read(event.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet) as Record<string, unknown>[];
            const processedData = jsonData.map((item) => ({ ...item, partido }));
            setData(processedData);
          }
        };
        reader.readAsBinaryString(file);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Administrar Candidatos</h1>
      <p>Aquí puedes administrar los candidatos.</p>
      <button
        onClick={() => setShowUpload(!showUpload)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        {showUpload ? 'Ocultar' : 'Cargar Hojas de Vida'}
      </button>
      {showUpload && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-bold">Cargar Hojas de Vida</h2>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Partido Político</label>
            <input
              type="text"
              value={partido}
              onChange={(e) => setPartido(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingrese el partido político"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">Seleccionar archivo</label>
            <input
              id="file-upload"
              type="file"
              accept=".csv, .xlsx"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              onClick={handleFileUpload}
              className="mt-2 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700 disabled:bg-gray-400"
              disabled={!partido || !file}
            >
              Subir y Procesar
            </button>
          </div>
          {data.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold">Datos Procesados</h3>
              <pre className="p-4 mt-4 bg-gray-200 rounded">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCandidatosPage;
