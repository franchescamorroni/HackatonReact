import "../index.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";


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


export default function Tabla() {
  const [selectedProductos, setSelectedProductos] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [rutInput, setRutInput] = useState("");
  const [data, setData] = useState([]);
  const [rowSelected, setRowSelected] = useState([]);

  const handleRutInputChange = (event) => {
    setRutInput(event.target.value);
  };

  const totalSelect = () => {
    return rowSelected.reduce((acumulador, actual) => {
      return acumulador + Number(actual.monto.substring(1));
      //Number(acumulador.monto.substring(1)) + Number(actual.monto.substring(1));
    }, 0);
  };

  const customLocaleText = {
    footerRowSelected: () =>
      `Total seleccionado: $${Number(totalSelect()).toFixed(3)}`,
  };


  const onRowSelected = (rowsarray) => {
    let arr = [];
    rowsarray.forEach((id) => {
      const elementFind = data.find((element) => element.id == id);
      arr.push(elementFind);
    });
    setRowSelected(arr);
  };

  const handleCheckboxChange = (event, type) => {
    const value = event.target.name;
    if (type === 'productos') {
      setSelectedProductos((prevSelected) => {
        if (prevSelected.includes(value)) {
          return prevSelected.filter((selected) => selected !== value);
        } else {
          return [...prevSelected, value];
        }
      });
    } else if (type === 'fechas') {
      setSelectedDates((prevSelected) => {
        if (prevSelected.includes(value)) {
          return prevSelected.filter((selected) => selected !== value);
        } else {
          return [...prevSelected, value];
        }
      });
    }
  };

  const handleApplyFilter = async () => {
    try {
      let response;

      if (rutInput) {
        // Si hay un RUT ingresado, realizar la consulta con el RUT
        response = await axios.get(`http://localhost:8080/servicio/listaPorRut?rut=${rutInput}`);
      } else {
        // Si no hay RUT, realizar la consulta por defecto
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
        } else if (selectedDates.length > 0) {
          // Si hay fechas seleccionadas, realizar la consulta con las fechas seleccionadas
          response = await axios.get("http://localhost:8080/servicio/listaPorFecha", {
            params: { dias: selectedDates.join(",") },
          });
        } else {
          // Si no hay productos ni fechas seleccionadas, realizar la consulta sin especificar productos ni fechas
          response = await axios.get("http://localhost:8080/servicio/lista");
        }

        const mappedData = response.data.map((row) => ({
          id: row.rut,
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
  }, [selectedProductos, selectedDates]);

  return (
    <div style={{ height: 400, width: "80%", margin: "auto" }}>
      <div className="containerForm">
        <FormGroup>
          <FormControlLabel
            control={<Checkbox className="smallCheckbox" onChange={(e) => handleCheckboxChange(e, 'productos')} name="APV" />}
            label={<span className="smallLabel">APV</span>}
          />
          <FormControlLabel
            control={<Checkbox className="smallCheckbox" onChange={(e) => handleCheckboxChange(e, 'productos')} name="Mis Metas" />}
            label={<span className="smallLabel">Mis Metas</span>}
          />
        </FormGroup>

        <FormGroup>
          <div className="formFecha1">
            <FormControlLabel
              control={<Checkbox className="smallCheckbox" onChange={(e) => handleCheckboxChange(e, 'fechas')} name="05" />}
              label={<span className="smallLabel">05</span>}
            />
            <FormControlLabel
              control={<Checkbox className="smallCheckbox" onChange={(e) => handleCheckboxChange(e, 'fechas')} name="10" />}
              label={<span className="smallLabel">10</span>}
            />
          </div>
          <div className="formFecha2">
            <FormControlLabel
              control={<Checkbox className="smallCheckbox" onChange={(e) => handleCheckboxChange(e, 'fechas')} name="15" />}
              label={<span className="smallLabel">15</span>}
            />
            <FormControlLabel
              control={<Checkbox className="smallCheckbox" onChange={(e) => handleCheckboxChange(e, 'fechas')} name="20" />}
              label={<span className="smallLabel">20</span>}
            />
          </div>
        </FormGroup>
        <div className="formRut">
          <TextField
            label="RUT"
            variant="outlined"
            value={rutInput}
            onChange={handleRutInputChange}
          />
          <button onClick={handleApplyFilter}>Aplicar Filtro</button>
        </div>
      </div>

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
        onRowSelectionModelChange={(e) => onRowSelected(e)}
      />
      <button >Descargar Archivo</button>
    </div>
  );
} 