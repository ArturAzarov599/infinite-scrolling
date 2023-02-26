import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IStudent } from "@interfaces/student";
import {
  studentsApi,
  TFetchStudentsResponse,
} from "@store/students/students.api";

interface IInitialStudentsStore {
  students: IStudent[];
  limit: number;
  skip: number;
  studentName: string;
  totalCount: number;
  selectedStudent: IStudent | null;
  fetchError: IFetchStudentsError | null;
}

interface IFetchStudentsError {
  status: number;
  data: {
    message: string;
  };
}

const initialStudentsStore: IInitialStudentsStore = {
  students: [],
  limit: 20,
  skip: 0,
  studentName: "",
  totalCount: 0,
  selectedStudent: null,
  fetchError: null,
};

export const studentsStore = createSlice({
  name: "studentsStore",
  initialState: initialStudentsStore,
  reducers: {
    changeStudentName: (state, { payload }: PayloadAction<string>) => {
      state.studentName = payload;
      state.skip = 0;
      state.students = [];
    },
    setSelectedUser: (state, { payload }: PayloadAction<IStudent | null>) => {
      state.selectedStudent = payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(
        studentsApi.endpoints.fetchStudents.matchFulfilled,
        (state, { payload }: PayloadAction<TFetchStudentsResponse>) => {
          state.students = state.students.concat(payload.students);
          state.skip = state.skip + state.limit;
          state.totalCount = payload.totalRecords;
          state.fetchError = null;
        }
      )
      .addMatcher(
        studentsApi.endpoints.fetchStudents.matchRejected,
        (state, { payload }: PayloadAction<unknown>) => {
          state.fetchError = payload as IFetchStudentsError;
        }
      ),
});
