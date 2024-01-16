import { createContext, useReducer } from "react";
import { dummyExpenses } from "./dummyExpenses";

export const ExpenssesContext = createContext({
  expenses: [],
  addExpense: () => {},
  setExpenses: (expenses) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleetteExpense: (id) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload }, ...state];
    case "SET":
      const invertedArray = action.payload.reverse();
      return invertedArray;
    case "UPDATE":
      return state.reduce(
        (acc, elem) =>
          elem.id === action.payload.id
            ? [...acc, { id: action.payload.id, ...action.payload.expenseData }]
            : [...acc, elem],
        []
      );

    case "DELETE":
      return state.filter((elem) => elem.id !== action.payload);
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpenssesContext.Provider value={value}>
      {children}
    </ExpenssesContext.Provider>
  );
}
