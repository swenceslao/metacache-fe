import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import axios from 'axios';
import { DataTable } from '../../Common';

const ScholarsTable = () => {
  const columns = [
    { field: 'date', headerName: 'Date', },
    { field: 'ronin_slp', headerName: 'Ronin SLP', },
    { field: 'in_game_slp', headerName: 'In-game SLP', },
    { field: 'overall_claimed_slp', headerName: 'Claimed SLP', },
    { field: 'total_slp', headerName: 'Total SLP', },
    { field: 'rank', headerName: 'In-game Rank', },
    { field: 'mmr', headerName: 'Current MMR', },
    { field: 'wins', headerName: 'Wins today', },
    { field: 'losses', headerName: 'Losses today', },
    { field: 'draws', headerName: 'Draws today', },
  ];

  const [rows, setRows] = useState([]);

  const getData = useCallback( async () => {
    try {
      const res = await axios.get('https://api.metacache.app/data/0xac26560d9788f7863b704493125d419246d59cb6/historical');
      setRows(processData(res.data.daily_data));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const processData = (rows) => {
    const filtered = rows.filter(row => row.battle_api_success);
    const res = filtered.map(row => {
      if (!row.hasOwnProperty('overall_claimed_slp')) row.overall_claimed_slp = 0;
      const keys = Object.keys(row);
      keys.forEach(key => {
        if (key !== 'date') row[key] = parseInt(row[key]).toLocaleString('en');
      });
      row.date = `${moment.unix(row.date).format('MM/DD/YY')} (${moment.unix(row.date).format('MMM D')})`;
      return row;
    });
    return res;
  };

  useEffect(() => { 
    getData();
  }, [getData]);

  return (
    <>
      <DataTable columns={columns} rows={rows} />
    </>
  );
};

export default ScholarsTable;