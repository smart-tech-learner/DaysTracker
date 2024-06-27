import React from "react";
import Modal from "react-bootstrap/Modal";
import ChangePassword from "./ChangePassword";
import Button from "react-bootstrap/Button";

const ChangePasswordModal = (props) => {
  const handleClose = () => {
    props.handleClose();
  };
  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ChangePassword handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
