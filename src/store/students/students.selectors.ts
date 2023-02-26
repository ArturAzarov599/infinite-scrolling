import { TRootState } from "@store/store";
import { IStudent } from "@interfaces/student";

export const getFetchError = (state: TRootState) => state.studentsStore.fetchError;
export const getSkipNumber = (state: TRootState): number => state.studentsStore.skip;
export const getTotalCount = (state: TRootState): number => state.studentsStore.totalCount;
export const getStudents = (state: TRootState): IStudent[] => state.studentsStore.students;
export const getStudentName = (state: TRootState): string => state.studentsStore.studentName;
export const getSelectedUser  = (state: TRootState): IStudent | null => state.studentsStore.selectedStudent;