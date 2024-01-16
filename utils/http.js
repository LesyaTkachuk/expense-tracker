import axios from "axios";

const BACKEND_URL =
  "https://expense-tracker-4111b-default-rtdb.europe-west1.firebasedatabaseapp/";

export async function storeExpense(expenseData) {
  const response = await axios.post(BACKEND_URL + "expenses.json", expenseData);
  const id = response.data.name; // just because Firebase return us id as name prop of response data
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export async function updateExpense(id, expenseData) {
  return await axios.put(BACKEND_URL + `expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
  return await axios.delete(BACKEND_URL + `expenses/${id}.json`);
}
