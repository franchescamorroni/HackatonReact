import "../index.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import axios from "axios";

const columns = [
  { field: "id", headerName: "RUT/RUN", disableColumnMenu: true, flex: 1, headerClassName: "custom-header" },
  { field: "nombre", headerName: "Nombre", disableColumnMenu: true, flex: 1, headerClassName: "custom-header" },
  { field: "banco", headerName: "Banco", disableColumnMenu: true, flex: 1, headerClassName: "custom-header" },
  { field: "cuenta", headerName: "N°Cuenta", disableColumnMenu: true, flex: 1, headerClassName: "custom-header" },
  { field: "monto", headerName: "Monto ($)", disableColumnMenu: true, flex: 1, headerClassName: "custom-header" },
  { field: "producto", headerName: "Producto", disableColumnMenu: true, flex: 1, headerClassName: "custom-header" },
  { field: "servicio", headerName: "Código Servicio", disableColumnMenu: true, flex: 1, headerClassName: "custom-header" },
];

const customLocaleText = {
  footerRowSelected: (count) => `Total seleccionado: ${count} asdsadsdsd`,
};

export default function Tabla() {
  const [selectedProductos, setSelectedProductos] = useState([]);

  const handleCheckboxChange = (event) => {
    const productName = event.target.name;
    setSelectedProductos((prevSelected) => {
      if (prevSelected.includes(productName)) {
        return prevSelected.filter((selected) => selected !== productName);
      } else {
        return [...prevSelected, productName];
      }
    });
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (selectedProductos.length === 2) {
          // Si ambos checkboxes están marcados, realizar la consulta por defecto
          response = await axios.get("http://localhost:8080/servicio/lista");
        } else if (selectedProductos.length > 0) {
          // Si hay productos seleccionados, realizar la consulta con los productos seleccionados
          response = await axios.get("http://localhost:8080/servicio/listaPorProducto", {
            params: { nombreProducto: selectedProductos.join(",") },
          });
        } else {
          // Si no hay productos seleccionados, realizar la consulta sin especificar productos
          response = await axios.get("http://localhost:8080/servicio/lista");
        }

        const mappedData = response.data.map((row) => ({
          id: row.rut,
          rut: row.rut,
          nombre: row.nombreCliente,
          banco: row.nombreBanco,
          cuenta: row.idCuenta,
          monto: row.monto.toLocaleString("es-CL", { style: "currency", currency: "CLP" }),
          producto: row.nombreProducto,
          servicio: row.idServicio,
        }));
        setData(mappedData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [selectedProductos]);

  return (
    <div style={{ height: 400, width: "80%", margin: "auto" }}>
      <FormGroup>
        <FormControlLabel control={<Checkbox onChange={handleCheckboxChange} name="APV" />} label="APV" />
        <FormControlLabel control={<Checkbox onChange={handleCheckboxChange} name="Mis Metas" />} label="Mis Metas" />
      </FormGroup>
      <DataGrid
        rows={data}
        columns={columns}
        autoHeight
        getRowId={(row) => row.id}
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
