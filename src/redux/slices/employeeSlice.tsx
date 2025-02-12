import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../../models/Employee';

interface EmployeeState {
  list: Employee[];
}

const initialState: EmployeeState = {
  list: [],
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.list.push(action.payload);
    },
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
