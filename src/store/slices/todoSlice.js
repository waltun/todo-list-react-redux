import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    list: [],
  },
  reducers: {
    setTodos: (state, { payload }) => {
      state.list = payload;
    },
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
    toggleDoneTodo: (state, action) => {
      state.list = state.list.map((todo) => {
        return todo.id === action.payload
          ? {
              ...todo,
              done: !todo.done,
            }
          : todo;
      });
    },
  },
});

export const { addTodo, deleteTodo, toggleDoneTodo, setTodos } =
  todoSlice.actions;
export default todoSlice.reducer;
