import React, { FC } from "react";
import styled from "styled-components";

import { IStudent } from "@interfaces/student";

const StudentCardWrapper = styled.div`
  flex: 0 0 18%;
  background-color: #dd571c;

  border: 1px solid black;
  border-radius: 16px;

  margin: 5px 15px 0 0;
`;

const StudentImage = styled.img`
  width: 100%;
  border-radius: 16px 16px 0 0;
`;

const StudentInfo = styled.div`
  padding: 5px;
`;

const StudentName = styled.h4``;

const StudentAdditionalInformation = styled.h5``;

interface IStudentCardProps {
  student: IStudent;
  onClick: () => void;
}

const StudentCard: FC<IStudentCardProps> = ({
  student: { name, avatarURL, lecturesAttended, totalLectures }, onClick
}) => (
  <StudentCardWrapper onClick={onClick}>
    <StudentImage src={`${avatarURL}`} />
    <StudentInfo>
      <StudentName>{name}</StudentName>
      <StudentAdditionalInformation>
        Lecture attended: {lecturesAttended}
      </StudentAdditionalInformation>
      <StudentAdditionalInformation>
        Total lectures : {totalLectures}
      </StudentAdditionalInformation>
    </StudentInfo>
  </StudentCardWrapper>
);

export default StudentCard;
