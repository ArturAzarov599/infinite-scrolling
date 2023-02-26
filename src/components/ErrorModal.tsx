import React, { FC } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { getFetchError } from "@store/students/students.selectors";

const ModalErrorWrapper = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
  padding: 5px;
  background-color: #ff0000;
  border-radius: 8px;
  z-index: 3;
`;

const ErrorModal: FC = () => {
  const fetchStudentsError = useSelector(getFetchError);

  return (
    <>
      {fetchStudentsError && (
        <ModalErrorWrapper>
          {fetchStudentsError?.data.message} ({fetchStudentsError.status})
        </ModalErrorWrapper>
      )}
    </>
  );
};

export default ErrorModal;
