import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import type { AxiosRequestConfig, AxiosError } from "axios";

import { students } from "@mocks/studentsData";

const mock = new MockAdapter(axios, { delayResponse: 3000 });

mock.onGet("/students").reply((config: AxiosRequestConfig) => {
  const randomNumber = Math.round(Math.random() * 5);
  const is401Error = randomNumber === 5;
  const is403Error = randomNumber === 4;

  if (is401Error) return [401, { message: `You aren't authorized` }];

  if (is403Error) return [403, { message: `Forbidden action` }];

  const { studentName, skip } = config.params;

  if (studentName.length >= 3) {
    const filteredStudentsByName = students.filter(({ name }) =>
      name.toLowerCase().includes(studentName.toLowerCase())
    );

    return [
      200,
      {
        totalRecords: filteredStudentsByName.length,
        students: filteredStudentsByName.splice(skip, 20),
      },
    ];
  }

  return [
    200,
    {
      totalRecords: students.length,
      students: students.splice(skip, 20),
    },
  ];
});

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
