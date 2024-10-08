// Add.js

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "../../src/index.css";
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

export default function Add({ onAddSuccess, closeModal }) {
  const [loading, setloading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  async function onSubmit(data) {
    try {
      setloading(true);
      const response = await axios.post(
        "https://66eeee593ed5bb4d0bf25f1f.mockapi.io/crud",
        data
      );
      // console.log("Data submitted successfully:", response.data);
      toast.success(<h5>Data added Successfully</h5>);

      onAddSuccess();
      closeModal();
    } catch (err) {
      console.error("Error while submitting the form:", err);
    } finally {
      setloading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalHeader tag="h3">
        <strong>Add Details</strong>
      </ModalHeader>
      <FormGroup className="m-4">
        <Row>
          <Col sm={12} md={6}>
            <Label for="first_name">First Name</Label>
            <Controller
              name="first_name"
              control={control}
              rules={{
                required: "First Name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="first_name"
                  type="text"
                  // placeholder="Enter First Name"
                  className={`form-control ${
                    errors.first_name
                      ? "is-invalid"
                      : field.value.length >= 3
                      ? "is-valid"
                      : ""
                  }`}
                />
              )}
            />
            {errors.first_name && (
              <div className="invalid-feedback">
                {errors.first_name.message}
              </div>
            )}
          </Col>

          <Col sm={12} md={6}>
            <Label for="last_name">Last Name</Label>
            <Controller
              name="last_name"
              control={control}
              rules={{
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="last_name"
                  type="text"
                  // placeholder="Enter Last Name"
                  className={`form-control ${
                    errors.last_name
                      ? "is-invalid"
                      : field.value.length >= 3
                      ? "is-valid"
                      : ""
                  }`}
                />
              )}
            />
            {errors.last_name && (
              <div className="invalid-feedback">{errors.last_name.message}</div>
            )}
          </Col>
        </Row>

        {/* Email and Gender */}
        <Row className="mt-3">
          <Col sm={12} md={6}>
            <Label for="email">Email</Label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  // placeholder="Enter Email"
                  className={`form-control ${
                    errors.email
                      ? "is-invalid"
                      : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                          field.value
                        )
                      ? "is-valid"
                      : ""
                  }`}
                />
              )}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </Col>

          <Col sm={12} md={6}>
            <Label for="gender">Gender</Label>
            <Controller
              name="gender"
              control={control}
              rules={{
                minLength: {
                  value: 2,
                  message: "Minimum 2 characters required",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="gender"
                  type="text"
                  // placeholder="Enter Gender"
                  className={`form-control ${
                    errors.gender
                      ? "is-invalid"
                      : field.value.length >= 2
                      ? "is-valid"
                      : ""
                  }`}
                />
              )}
            />
            {errors.gender && (
              <div className="invalid-feedback">{errors.gender.message}</div>
            )}
          </Col>
        </Row>

        {/* Date of Birth */}
        <Row className="mt-3">
          <Col sm={12} md={6}>
            <Label for="dob">Date of Birth</Label>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="dob"
                  type="date"
                  className={`form-control ${
                    errors.dob ? "is-invalid" : field.value ? "is-valid" : ""
                  }`}
                />
              )}
            />
            {errors.dob && (
              <div className="invalid-feedback">{errors.dob.message}</div>
            )}
          </Col>
        </Row>

        <ModalFooter>
          <Button
            size="sm"
            className="mt-3"
            color="danger"
            onClick={() => {
              closeModal();
            }}
            outline
            style={{
              border: "none",
            }}
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
            value={isSubmitting ? "Submitting" : "Submit"}
            className="primary bg-primary"
          />
        </ModalFooter>
      </FormGroup>
      {loading && (
        <div className="loader-wrapper">
          <div>
            <div className="loader"></div>
            <p>Adding Data...</p>
          </div>
        </div>
      )}
    </form>
  );
}
