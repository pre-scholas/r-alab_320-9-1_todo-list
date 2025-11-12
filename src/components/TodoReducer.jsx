// todoReducer.js
import { initialState } from "./TodoItems";
// export const initialState = {
//     tasks: [],
// };

export const todoReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    { id: Date.now(), text: action.payload, completed: false },
                ],
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
            };
        case 'TOGGLE_COMPLETE':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload
                        ? { ...task, completed: !task.completed }
                        : task
                ),
            };
        default:
            return state;
    }
  };