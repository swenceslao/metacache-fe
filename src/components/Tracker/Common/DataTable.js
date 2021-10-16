import { useState } from 'react';
import Box from '@mui/material/Box';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { v4 as uuid } from 'uuid';

const columns = [
  { field: 'name', headerName: 'Name', width: 165 },
  { field: 'ign', headerName: 'IGN', width: 135 },
  { field: 'today', headerName: 'SLP today', width: 150, type: 'number', },
  { field: 'yesterday', headerName: 'SLP yesterday', width: 170, type: 'number', },
  { field: 'mmr', headerName: 'MMR', width: 110, type: 'number', },
  { field: 'hoursTilClaim', headerName: 'Hours till claim', width: 180 },
  { field: 'scholarCut', headerName: 'Scholar cut', width: 150, type: 'number', },
  { field: 'managerCut', headerName: 'Manager cut', width: 160, type: 'number', },
];

const rowData = [
  { 
    id: uuid(), 
    name: 'Namey McNameface', 
    ign: 'NameyScholar1',
    today: 65,
    yesterday: 105,
    mmr: 1482,
    hoursTilClaim: `${57} hours`,
    scholarCut: 933,
    managerCut: 1023,
  },
  { 
    id: uuid(), 
    name: 'Namey McNameface', 
    ign: 'NameyScholar2',
    today: 65,
    yesterday: 105,
    mmr: 1482,
    hoursTilClaim: `${57} hours`,
    scholarCut: 933,
    managerCut: 1023,
  },
  { 
    id: uuid(), 
    name: 'Namey McNameface', 
    ign: 'NameyScholar3',
    today: 65,
    yesterday: 105,
    mmr: 1482,
    hoursTilClaim: `${57} hours`,
    scholarCut: 933,
    managerCut: 1023,
  },
];

const DataTable = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    console.log(params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <Box className='ag-theme-alpine' width='100%'>
      <AgGridReact 
        domLayout='autoHeight'
        rowData={rowData} 
        onGridReady={onGridReady} 
        onFirstDataRendered={onFirstDataRendered}>
        {columns.map(({ field, headerName }, index) => (
          <AgGridColumn 
            key={index} 
            field={field} 
            headerName={headerName}
            sortable 
            filter
            resizable
          />
        ))}
      </AgGridReact>
    </Box>
  );
};

export default DataTable;