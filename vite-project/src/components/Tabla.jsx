import "../index.css";
import { DataGrid } from '@mui/x-data-grid';


const columns = [
  { field: 'id', headerName: 'RUT/RUN', disableColumnMenu: true, flex: 1 },
  { field: 'nombre', headerName: 'Nombre', disableColumnMenu: true, flex: 1 },
  { field: 'banco', headerName: 'Banco', disableColumnMenu: true, flex: 1 },
  { field: 'cuenta', headerName: 'N°Cuenta', disableColumnMenu: true, flex: 1 },
  { field: 'monto', headerName: 'Monto($)', disableColumnMenu: true, flex: 1 },
  { field: 'producto', headerName: 'Producto', disableColumnMenu: true, flex: 1 },
  { field: 'servicio', headerName: 'Código Servicio', disableColumnMenu: true, flex: 1 },
];

const rows = [
  { id: 1, nombre: 'Jon', banco: 'Banco de Chile', cuenta: 987654321, monto: '$1000', producto: 'APV', servicio: '02345678' },
  { id: 2, nombre: 'Cersei', banco: 'Banco de Chile', cuenta: 987654322, monto: '$1000', producto: 'APV', servicio: '02345678' },
  { id: 3, nombre: 'Jaime', banco: 'Banco de Chile', cuenta: 987654326, monto: '$1000', producto: 'APV', servicio: '02345678' },
  { id: 4, nombre: 'Arya', banco: 'Banco de Chile', cuenta: 987654354, monto: '$1000', producto: 'APV', servicio: '02345678' },
  { id: 7, nombre: 'Ferrara', banco: 'Banco de Chile', cuenta: 987654342, monto: '$1000', producto: 'APV', servicio: '02345678' },
  { id: 8, nombre: 'Rossini', banco: 'Banco de Chile', cuenta: 987654344, monto: '$1000', producto: 'APV', servicio: '02345678' },
  { id: 9, nombre: 'Harvey', banco: 'Banco de Chile', cuenta: 987654378, monto: '$1000', producto: 'APV', servicio: '02345678' },
];

const customLocaleText = {
  footerRowSelected: (count) => `${count} asdsadsdsd`,
};


export default function Tabla() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: { pbanco: 0, pbancoSize: 5 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection
        localeText={customLocaleText}
      />
    </div>
  );
}