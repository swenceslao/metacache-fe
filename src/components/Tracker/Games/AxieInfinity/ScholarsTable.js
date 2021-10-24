import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DataTable } from '../../Common';

const ScholarsTable = ({ columns, rows }) => {
  const [data, setData] = useState([]);

  const processData = (rows) => {
    const filtered = rows.filter(row => row.battle_api_success);
    const res = filtered.map(row => {
      if (!row.hasOwnProperty('overall_claimed_slp')) row.overall_claimed_slp = 0;
      row.date = `${moment.unix(row.date).format('MM/DD/YY')} (${moment.unix(row.date).format('MMM D')})`;
      return row;
    });
    return res;
  };

  useEffect(() => { 
    if (rows && rows.data && rows.data.daily_data.length > 0) {
      setData(processData(rows.data.daily_data));
    }
  }, [rows]);

  return (
    <>
      <DataTable columns={columns} rows={data} />
    </>
  );
};

ScholarsTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.object.isRequired,
};

export default ScholarsTable;