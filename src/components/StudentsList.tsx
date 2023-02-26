import React, { useEffect, FC, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import StudentCard from "@components/StudentCard";

import {
  getFetchError,
  getSkipNumber,
  getStudentName,
  getStudents,
  getTotalCount,
} from "@store/students/students.selectors";
import { useLazyFetchStudentsQuery } from "@store/students/students.api";
import { useStudentsActions } from "@store/students/hooks/studentsActions";

const StudentListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  max-width: 980px;
  max-height: 500px;
`;

const Box = styled.div``;

const SEARCHING_TEXT: string =
  "Searching will start after three or more characters are in the search field";

const StudentsList: FC = () => {
  const students = useSelector(getStudents);
  const skip = useSelector(getSkipNumber);
  const totalCount = useSelector(getTotalCount);
  const studentName = useSelector(getStudentName);
  const [fetchStudents, { isFetching }] = useLazyFetchStudentsQuery();
  const { setSelectedUser } = useStudentsActions();
  const listInnerRef = useRef<any>();
  const fetchStudentsError = useSelector(getFetchError);
  const hasMore = totalCount >= students.length;

  const onFetchStudents = (skipStudents: number): void => {
    fetchStudents({
      limit: 20,
      skip: skipStudents,
      studentName,
    });
  };

  const onScroll = (): void => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight && hasMore)
        onFetchStudents(skip);
    }
  };

  useEffect(() => {
    if (!students.length && (!studentName || studentName.length >= 3))
      onFetchStudents(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentName]);

  useEffect(() => {
    if (studentName.length >= 3) onFetchStudents(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentName]);

  useEffect(() => {
    if (fetchStudentsError) onFetchStudents(skip);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStudentsError]);

  return (
    <>
      {studentName && studentName.length < 3 ? (
        <Box>{SEARCHING_TEXT}</Box>
      ) : (
        <>
          {!students.length && !isFetching && (
            <Box>Can't find any matches for name: {studentName}</Box>
          )}
          <StudentListWrapper onScroll={onScroll} ref={listInnerRef}>
            {students.map((student) => (
              <StudentCard
                key={student.id}
                onClick={() => setSelectedUser(student)}
                student={student}
              />
            ))}
          </StudentListWrapper>
          {isFetching && <Box>Loading..</Box>}
        </>
      )}
    </>
  );
};

export default StudentsList;
