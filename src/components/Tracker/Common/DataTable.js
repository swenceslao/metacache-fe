import { useState } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import PropTypes from 'prop-types';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const DataTable = ({ columns, rows }) => {
  const theme = useTheme();
  if (theme.palette.mode === 'light') {
    import('ag-grid-community/dist/styles/ag-theme-alpine.css');  
  } else {
    import('ag-grid-community/dist/styles/ag-theme-alpine-dark.css');  
  }

  // eslint-disable-next-line no-unused-vars
  const [gridApi, setGridApi] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <Box 
      className={theme.palette.mode === 'light' ? 'ag-theme-alpine' : 'ag-theme-alpine-dark'}
      width='100%'
    >
      <AgGridReact 
        domLayout='autoHeight'
        rowData={rows} 
        onGridReady={onGridReady} 
        onFirstDataRendered={onFirstDataRendered}
        pagination={true}
        paginationPageSize={10}
      >
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

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};