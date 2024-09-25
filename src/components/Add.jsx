import React from "react";
import { Form, useForm } from "react-hook-form";
import "../../src/index.css";
import {
  Col,
  FormGroup,
  Input,
  Label,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

export default function Add() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("Submitting the form", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <div> */}
      <ModalHeader tag="h3"><strong>Add Details</strong></ModalHeader>
      <FormGroup className="m-4">
        <Row>
          <Col sm={12} md={6}>
            <Label>First Name</Label>
            <Input
              className={errors.first_Name ? "input-error" : ""}
              {...register("first_Name", {
                required: true,
                minLength: { value: 3, message: "minimum 3 characters" },
              })}
            />
            {errors.first_Name && (
              <p className="error-msg">{errors.first_Name.message}</p>
            )}
          </Col>
          <Col sm={12} md={6}>
            <Label>Last Name</Label>
            <Input
              className={errors.last_name ? "input-error" : ""}
              {...register("last_name", {
                // required: true,
                // minLength: { value: 3, message: "minimum 3 characters" },
              })}
            />
            {errors.last_name && (
              <p className="error-msg">{errors.last_name.message}</p>
            )}
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <Label>Email</Label>
            <Input
              className={errors.email ? "input-error" : ""}
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && (
              <p className="error-msg">{errors.email.message}</p>
            )}
          </Col>
          <Col sm={12} md={6}>
            <Label>Gender</Label>
            <Input
              className={errors.gender ? "input-error" : ""}
              {...register("gender", {
                // required: true,
                // minLength: { value: 3, message: "minimum 3 characters" },
              })}
            />
            {errors.gender && (
              <p className="error-msg">{errors.gender.message}</p>
            )}
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              className={errors.dob ? "input-error" : ""}
              {...register("dob", {
                required: true,
                // minLength: { value: 3, message: "minimum 3 characters" },
              })}
            />
            {errors.dob && <p className="error-msg">{errors.dob.message}</p>}
          </Col>
        </Row>
        <ModalFooter
          style={{
            width: "70%",
            margin: "auto",
          }}
        >
          <Input
            type="submit"
            disabled={isSubmitting}
            value={isSubmitting ? "Submitting" : "Submit"}
            className="primary bg-primary"
          />
        </ModalFooter>
      </FormGroup>
      {/* </div> */}
    </form>
  );
}
