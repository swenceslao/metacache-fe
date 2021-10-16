import { useState } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';


import { v4 as uuid } from 'uuid';

const columns = [
  { field: 'name', headerName: 'Name', editable: true, },
  { field: 'ign', headerName: 'IGN', editable: true, },
  { field: 'today', headerName: 'SLP today', type: 'numberColumn', },
  { field: 'yesterday', headerName: 'SLP yesterday', type: 'numberColumn', },
  { field: 'mmr', headerName: 'MMR', type: 'numberColumn', },
  { field: 'hoursTilClaim', headerName: 'Hours till claim', },
  { field: 'scholarCut', headerName: 'Scholar cut', type: 'numberColumn', },
  { field: 'managerCut', headerName: 'Manager cut', type: 'numberColumn', },
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


export const DataTable = () => {
  const theme = useTheme();
  if (theme.palette.mode === 'light') {
    import('ag-grid-community/dist/styles/ag-theme-alpine.css');  
  } else {
    import('ag-grid-community/dist/styles/ag-theme-alpine-dark.css');  
  }

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  // const 

  return (
    <Box 
      className={theme.palette.mode === 'light' ? 'ag-theme-alpine' : 'ag-theme-alpine-dark'}
      width='100%'
    >
      <AgGridReact 
        domLayout='autoHeight'
        rowData={rowData} 
        onGridReady={onGridReady} 
        onFirstDataRendered={onFirstDataRendered}>
        {columns.map(({ field, headerName, ...rest }, index) => (
          <AgGridColumn 
            key={index} 
            field={field} 
            headerName={headerName}
            sortable 
            filter
            resizable
            minWidth='150'
            {...rest}
          />
        ))}
      </AgGridReact>
    </Box>
  );
};