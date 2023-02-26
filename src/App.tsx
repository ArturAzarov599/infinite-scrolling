import React, { FC } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import SearchBar from "@components/SearchBar";
import ErrorModal from "@components/ErrorModal";
import StudentsList from "@components/StudentsList";
import StudentModal from "@components/StudentModal";

import { getSelectedUser } from "@store/students/students.selectors";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  padding: 25px;
`;

const App: FC = () => {
  const selectedUser = useSelector(getSelectedUser);

  return (
    <Wrapper>
      <ErrorModal/>
      <SearchBar />
      {selectedUser && <StudentModal />}
      <StudentsList />
    </Wrapper>
  );
};

export default App;
