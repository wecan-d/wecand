import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
  margin: 0 0 10px;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ModalMessage = styled.p`
  margin: 0 0 20px;
  font-size: 1rem;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  cancelText,
  confirmText,
  showOverlay = true,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (showOverlay) {
    return (
      <Overlay onClick={handleOverlayClick}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalTitle>{title}</ModalTitle>
          <ModalMessage>{message}</ModalMessage>
          <ButtonContainer>
            {cancelText && <CancelButton onClick={onClose}>{cancelText}</CancelButton>}
            <ConfirmButton onClick={onConfirm}>{confirmText}</ConfirmButton>
          </ButtonContainer>
        </ModalContent>
      </Overlay>
    );
  }

  // showOverlay = false
  return (
    <ModalContent>
      <ModalTitle>{title}</ModalTitle>
      <ModalMessage>{message}</ModalMessage>
      <ButtonContainer>
        {cancelText && <CancelButton onClick={onClose}>{cancelText}</CancelButton>}
        <ConfirmButton onClick={onConfirm}>{confirmText}</ConfirmButton>
      </ButtonContainer>
    </ModalContent>
  );
};

export default ConfirmModal;
