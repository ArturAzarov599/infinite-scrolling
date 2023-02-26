import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";

import { useStudentsActions } from "@store/students/hooks/studentsActions";

import SearchBarImage from "@assets/images/search-bar-48px.png";

const InputContainer = styled.div`
  min-width: 250px;
  max-width: 500px;
  width: 33.3333vw;
  height: 35px;
  border: 2px solid #dd571c;
  border-radius: 16px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 0 8px;
`;

const Input = styled.input`
  border: 0;
  outline: 0;
  background: transparent;
`;

const SearchBarImg = styled.img``;

const SearchBar: FC = () => {
  const { changeStudentName } = useStudentsActions();

  return (
    <InputContainer>
      <Input
        placeholder="Search for a students"
        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
          changeStudentName(value);
        }}
      />
      <SearchBarImg
        height="20px"
        width="20px"
        src={SearchBarImage}
        alt="search bar icon"
      />
    </InputContainer>
  );
};

export default SearchBar;
