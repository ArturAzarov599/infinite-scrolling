import React, { FC } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { getSelectedUser } from "@store/students/students.selectors";
import { useStudentsActions } from "@store/students/hooks/studentsActions";

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  z-index: 2;
  width: 400px;
  height: 400px;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
`;

const ModalTitle = styled.h2`
  margin-top: 20px;
  text-align: center;
  text-transform: uppercase;
`;

const CloseIcon = styled.div`
  align-self: flex-end;
  cursor: pointer;
`;

const Block = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
`;

const BoldText = styled.div`
  font-weight: bold;
`;

const StudentModal: FC = () => {
  const selectedUser = useSelector(getSelectedUser);
  const { setSelectedUser } = useStudentsActions();

  return (
    <ModalWrapper>
      <Modal>
        <CloseIcon onClick={() => setSelectedUser(null)}>X</CloseIcon>
        <ModalTitle>student information</ModalTitle>
        <Block>
          <div>Student name:</div>
          <BoldText>{selectedUser?.name}</BoldText>
        </Block>
        <Block>
          <div>Lectures attended:</div>
          <BoldText>{selectedUser?.lecturesAttended}</BoldText>
        </Block>
        <Block>
          <div>Total lectures:</div>
          <BoldText>{selectedUser?.totalLectures}</BoldText>
        </Block>
        <ul>
          {Object.keys(selectedUser!.marks).map((key) => (
            <li>
              <Block>
                <div>{selectedUser!.marks[key].subjectTitle}:</div>
                <BoldText>
                  {selectedUser!.marks[key].marksObtained}/
                  {selectedUser!.marks[key].totalMarks}
                </BoldText>
              </Block>
            </li>
          ))}
        </ul>
      </Modal>
    </ModalWrapper>
  );
};

export default StudentModal;
