import { studentsApi } from "@store/students/students.api";
import { studentsStore } from "@store/students/students.store";

const studentsReducer = {
  [studentsStore.name]: studentsStore.reducer,
  [studentsApi.reducerPath]: studentsApi.reducer,
};

export default studentsReducer;
