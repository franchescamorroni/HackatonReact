import "../index.css";
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";

import axios from "axios";


const columns = [
  { field: 'id', headerName: 'RUT/RUN', disableColumnMenu: true, flex: 1, headerClassName: 'custom-header' },
  { field: 'nombre', headerName: 'Nombre', disableColumnMenu: true, flex: 1, headerClassName: 'custom-header' },
  { field: 'banco', headerName: 'Banco', disableColumnMenu: true, flex: 1, headerClassName: 'custom-header' },
  { field: 'cuenta', headerName: 'N°Cuenta', disableColumnMenu: true, flex: 1, headerClassName: 'custom-header' },
  { field: 'monto', headerName: 'Monto($)', disableColumnMenu: true, flex: 1, headerClassName: 'custom-header' },
  { field: 'producto', headerName: 'Producto', disableColumnMenu: true, flex: 1, headerClassName: 'custom-header' },
  { field: 'servicio', headerName: 'Código Servicio', disableColumnMenu: true, flex: 1, headerClassName: 'custom-header' },
];

const customLocaleText = {
  footerRowSelected: (count) => `${count} asdsadsdsd`,
};

export default function Tabla() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/servicio/lista')
      .then((res) => {
        // Mapear datos para que coincidan con las columnas del DataGrid
        const mappedData = res.data.map((row) => ({
          id: row.rut, // Utilizar el campo rut como identificador único
          rut: row.rut,
          nombre: row.nombreCliente,
          banco: row.nombreBanco,
          cuenta: row.idCuenta,
          monto: row.monto.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }),
          producto: row.nombreProducto,
          servicio: row.idServicio,
        }));
        setData(mappedData);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);


  return (
    <div style={{ height: 400, width: '80%', margin: 'auto' }}>
      <DataGrid
        rows={data}
        columns={columns}
        autoHeight
        getRowId={(row) => row.id} // Utiliza el campo 'id' como identificador de fila
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection
        localeText={customLocaleText}
      />
    </div>
  );
}