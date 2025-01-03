import React, { useState } from "react";
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
  border-radius: 16px;
  padding: 30px;
  width: 480px;
  height: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  align-items: flex-start;

`;

const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 22px;
  font-weight: bold;
  align-self: center;
  color: #6C54F7;
`;

const InputLabel = styled.label`
  font-size: 18px;
  color: #111;
  font-weight: 500;
`;

const InputField = styled.input`
  width: 100%;
  height: 50px;
  font-size: 17px;
  padding-left: 12px;
  margin-top: 17px;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  gap: 20px;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 10px 20px;
  font-size: 17px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  flex: 1;
  padding: 10px 20px;
  font-size: 17px;
  background-color: #6c54f7;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;


const AddTeamPageModal = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [shortcutName, setShortcutName] = useState("");
  const [shortcutURL, setShortcutURL] = useState("");

  if (!isOpen) return null;

  const clearInput = () => {
    setShortcutName("");
    setShortcutURL("");
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      clearInput();
      onClose();
    }
  };

  const handleCancleButtonClick = () => {
    clearInput();
    onClose();
  }

  const handleAddButtonClick = () => {
    onConfirm(shortcutName, shortcutURL);
    clearInput();
    onClose();
  }

  // if (showOverlay) {
    return (
      <Overlay onClick={handleOverlayClick}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalTitle>팀 페이지 등록하기</ModalTitle>
          <InputLabel>팀 페이지에 등록 할 URL을 입력해주세요</InputLabel>
          <InputField
            type="text"
            value={shortcutName}
            onChange={(e) => setShortcutName(e.target.value)}
            placeholder="바로가기 이름"
          />
          <InputLabel>해당 URL의 저장 명칭을 입력해주세요</InputLabel>
          <InputField
            type="text"
            value={shortcutURL}
            onChange={(e) => setShortcutURL(e.target.value)}
            placeholder="URL"
          />
          <ButtonContainer>
            <CancelButton onClick={handleCancleButtonClick}>취소</CancelButton>
            <ConfirmButton onClick={handleAddButtonClick}>등록하기</ConfirmButton>
          </ButtonContainer>
        </ModalContent>
      </Overlay>
    );
  // }

  // showOverlay = false
  // return (
  //   <ModalContent>
  //     <ModalTitle>{title}</ModalTitle>
  //     <ModalMessage>{message}</ModalMessage>
  //     <ButtonContainer>
  //       {cancelText && <CancelButton onClick={onClose}>{cancelText}</CancelButton>}
  //       <ConfirmButton onClick={onConfirm}>{confirmText}</ConfirmButton>
  //     </ButtonContainer>
  //   </ModalContent>
  // );
};

export default AddTeamPageModal;
