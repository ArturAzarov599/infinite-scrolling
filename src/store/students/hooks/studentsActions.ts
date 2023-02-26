import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { studentsStore } from "@store/students/students.store";

export const useStudentsActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(studentsStore.actions, dispatch);
};