import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "@store/rootReducer";
import { studentsApi } from "@store/students/students.api";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(studentsApi.middleware)
});

export type TRootState = ReturnType<typeof store.getState>;

export default store;