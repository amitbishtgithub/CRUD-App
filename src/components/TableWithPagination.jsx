import React, { useMemo } from "react";
import mdata from "../MOCK_DATA.json";
import { DateTime } from "luxon";
import ReactTable from "./ReactTable";
import UncontrolledModal from "./UncontrolledModal";
import Add from "./Add";
import axios from "axios";
import { useEffect, useState } from "react";
import { ModalBody, ModalFooter, ModalHeader, Button, Modal } from "reactstrap";

export default function TableWithPaginate() {
  const [apiData, setApiData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  const data = useMemo(() => mdata, []);

  const getdata = () => {
    axios
      .get("https://66eeee593ed5bb4d0bf25f1f.mockapi.io/crud")
      .then((response) => {
        // console.log(response.data)
        setApiData(response.data);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteData = (rowId) => {
    setSelectedData(rowId);
    document.getElementById("deleteModal").click();
  };

  const handleDelete = () => {
    axios
      .delete(
        `https://66eeee593ed5bb4d0bf25f1f.mockapi.io/crud/${selectedData}`
      )
      .then(() => {
        getdata();
        document.getElementById("closeModal").click();
      });
  };

  /** @type import('@tanstack/react-table').ColumnDef<any>*/
  const columns = [
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
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Date Of Birth",
      accessorKey: "dob",
      cell: (info) =>
        DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
    },
    {
      header: "Edit",
      accessorKey: "edit",
      cell: (row) => (
        <button onClick={""}>
          <i className="fa fa-edit" />
        </button>
      ),
    },
    {
      header: "Delete",
      accessorKey: "delete",
      cell: (row) => (
        <button
          onClick={() => {
            const rowId = row.row.original.id;
            deleteData(rowId);
          }}
        >
          <i className="fa fa-trash" />
        </button>
      ),
    },
  ];

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: 0, right: "10%", zIndex: 1 }}>
        <button
          // onClick={handleAddClick}
          style={{
            paddingBottom: "5px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
          id="add"
        >
          Add <i className="fa-solid fa-plus" />
        </button>
      </div>
      <ReactTable data={apiData} columns={columns} />

      <UncontrolledModal target="add" size="lg">
        <Add />
      </UncontrolledModal>

      <button id="deleteModal" hidden></button>
      <UncontrolledModal
        target="deleteModal"
        size="md"
        // onClose={() => setSelectedData(null)}
      >
        <ModalHeader>Delete</ModalHeader>
        <ModalBody >Are You sure you want to delete this data!</ModalBody>
        <ModalFooter>
          <Button color="secondary" id="closeModal" size="sm">
          <i className="fa-solid fa-close"></i> Cancel
          </Button>
          <Button onClick={handleDelete} color="danger" size="sm">
            <i className="fa-solid fa-check"></i> Delete
          </Button>
        </ModalFooter>
      </UncontrolledModal>
    </div>
  );
}
