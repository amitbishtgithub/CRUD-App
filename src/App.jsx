import Create from "./components/Create";
import 'react-tooltip/dist/react-tooltip.css'
import ReactTable from "./components/ReactTable";
import React, { useMemo } from "react";
import mdata from "./MOCK_DATA.json";
import { DateTime } from "luxon";

function App() {

  
  const data = useMemo(() => mdata, []);

  /** @type import('@tanstack/react-table').ColumnDef<any>*/
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },

    // to show multiple cols under one header
    // {
    //   header: 'Name',
    //   columns: [
    //     {
    //       header: 'First',
    //       accessorKey: 'first_name'
    //     },
    //     {
    //       header: 'Last',
    //       accessorKey: 'last_name'
    //     }
    //   ]
    // },

    // for showing first and last name together!
    // {
    //   header: "Name",
    //   accessorFn: row => `${row.first_name} ${row.last_name}`
    // },

    {
      header: "First Name",
      accessorKey: "first_name",
    },
    {
      header: "Last Name",
      accessorKey: "last_name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Gender",
      accessorKey: "gender",
    },
    {
      header: "Date Of Birth",
      accessorKey: "dob",
      cell: (info) =>
        DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
    },
  ];

  return (
    <div className="container">
      <Create />
      {/* <ReactTable data = {data} columns = {columns}/> */}
    </div>
  )
}

export default App;
