import React, { useMemo } from "react";
import mdata from "../MOCK_DATA.json";
import { DateTime } from "luxon";
import ReactTable from "./ReactTable";
import UncontrolledModal from "./UncontrolledModal";
import Add from "./Add";
import axios from "axios";
import { useEffect, useState } from "react";
import { ModalBody, ModalFooter, ModalHeader, Button, Modal } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function TableWithPaginate() {
  const [apiData, setApiData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = useMemo(() => mdata, []);

  const getdata = () => {
    axios
      .get("https://66eeee593ed5bb4d0bf25f1f.mockapi.io/crud")
      .then((response) => {
        setApiData(response.data);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteData = (rowId) => {
    // console.log("Row data received for deletion:", rowId);
    setSelectedData(rowId);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    // console.log("Deleting ID:", selectedData);
    axios
      .delete(
        `https://66eeee593ed5bb4d0bf25f1f.mockapi.io/crud/${selectedData}`
      )
      .then(() => {
        getdata();
        setIsModalOpen(false);
        toast.success(<h4>Data Deleted Successfully!</h4>)
      });
  };

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

      {/* Add Modal */}
      <UncontrolledModal target="add" size="md">
        <Add />
      </UncontrolledModal>

      {/* Delete Modal - Using state to control this modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(false)}>
          <ModalHeader>Delete</ModalHeader>
          <ModalBody>Are You sure you want to delete this data!</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDelete} color="danger">
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        draggable
      />
    </div>
  );
}