import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { axiosBaseQuery } from "@store/mockedAxiosBaseQuery";

import { IStudent } from "@interfaces/student";

type TFetchStudentsParams = {
  skip: number;
  limit: number;
  studentName: string;
};

export type TFetchStudentsResponse = {
  totalRecords: number;
  students: IStudent[];
};

export const studentsApi = createApi({
  reducerPath: "students/api",
  baseQuery: axiosBaseQuery({ baseUrl: "/students" }),
  endpoints: (build) => ({
    fetchStudents: build.query<TFetchStudentsResponse, TFetchStudentsParams>({
      query: (fetchStudentsParams) => ({
        url: "",
        params: fetchStudentsParams,
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchStudentsQuery, useLazyFetchStudentsQuery } = studentsApi;
