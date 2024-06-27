import React from "react";
import Modal from "react-bootstrap/Modal";
import AIChatBot from "./AIChatBot";

const AIChatBotContainerModal = (props) => {
  const handleClose = () => {
    props.handleClose();
  };
  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>AI Chat Bot</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AIChatBot />
      </Modal.Body>
    </Modal>
  );
};

export default AIChatBotContainerModal;
