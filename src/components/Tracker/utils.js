import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
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

const rows = [
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

export function DataTable() {
  return (
    <Box width='100%' height='400px'>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
      />
    </Box>
  );
}