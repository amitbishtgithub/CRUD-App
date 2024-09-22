import React, { useState, useEffect } from "react";
import { Modal } from "reactstrap";

const UncontrolledModal = ({ target, onClose, ...modalProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const triggerElement = document.querySelector(`#${target}`);

    if (!triggerElement) {
      console.error("UncontrolledModal: 'target' element not found in the DOM");
      return;
    }

    const handleClick = () => {
      setIsOpen(true);
    };

    triggerElement.addEventListener("click", handleClick);

    return () => {
      triggerElement.removeEventListener("click", handleClick);
    };
  }, [target]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (onClose && isOpen) {
      onClose(); 
    }
  };

  return <Modal {...modalProps} isOpen={isOpen} toggle={toggleModal} />;
};

export default UncontrolledModal;
