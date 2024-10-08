// Edit.js

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Col,
  FormGroup,
  Input,
  Label,
  ModalFooter,
  ModalHeader,
  Row,
  Button,
} from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";

export default function Edit({ onEditSuccess, closeModal, selectedData }) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      gender: "",
      dob: "",
    },
  });

  useEffect(() => {
    if (selectedData) {
      setValue("first_name", selectedData.first_name);
      setValue("last_name", selectedData.last_name);
      setValue("email", selectedData.email);
      setValue("gender", selectedData.gender);
      setValue("dob", selectedData.dob);
    }
  }, [selectedData, setValue]);

  async function onSubmit(data) {
    try {
      await axios.put(
        `https://66eeee593ed5bb4d0bf25f1f.mockapi.io/crud/${selectedData.id}`,
        data
      );
      toast.success(<h5>Data updated Successfully</h5>);
      onEditSuccess();
      closeModal();
    } catch (err) {
      console.error("Error while updating the data:", err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader tag="h3">
        <strong>Edit Details</strong>
      </ModalHeader>
      <FormGroup className="m-4">
        <Row>
          <Col sm={12} md={6}>
            <Label for="first_name">First Name</Label>
            <Controller
              name="first_name"
              control={control}
              rules={{ required: "First Name is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="first_name"
                  type="text"
                  placeholder="Enter First Name"
                />
              )}
            />
          </Col>
          <Col sm={12} md={6}>
            <Label for="last_name">Last Name</Label>
            <Controller
              name="last_name"
              control={control}
              rules={{ required: "Last Name is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="last_name"
                  type="text"
                  placeholder="Enter Last Name"
                />
              )}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col sm={12} md={6}>
            <Label for="email">Email</Label>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                />
              )}
            />
          </Col>
          <Col sm={12} md={6}>
            <Label for="gender">Gender</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="gender"
                  type="text"
                  placeholder="Enter Gender"
                />
              )}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col sm={12} md={6}>
            <Label for="dob">Date of Birth</Label>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => <Input {...field} id="dob" type="date" />}
            />
          </Col>
        </Row>
        <ModalFooter>
          <Button
            size="sm"
            className="mt-3"
            color="danger"
            outline
            style={{
              border: "none",
            }}
            onClick={closeModal}
          >
            <i className="fa-solid fa-close" />
            Close
          </Button>
          <Input
            style={{
              width: "30%",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "18px",
            }}
            type="submit"
            disabled={isSubmitting}
            value={isSubmitting ? "Updating" : "Update"}
            className="primary bg-primary"
          />
        </ModalFooter>
      </FormGroup>
    </form>
  );
}
