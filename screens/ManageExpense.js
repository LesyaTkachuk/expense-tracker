import { useLayoutEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/ui/IconButton";
import { ExpenssesContext } from "../store/expensesContex";
import { GlobalStyles } from "../constants/styles";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useContext(ExpenssesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditingMode = !!editedExpenseId;
  const selectedExpense = expenses.find((el) => el.id === editedExpenseId);

  function deleteExpenseHandler() {
    deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function submitHandler(expenseData) {
    isEditingMode
      ? updateExpense(editedExpenseId, expenseData)
      : addExpense(expenseData);
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditingMode ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditingMode]);

  return (
    <View style={styles.container}>
      <ExpenseForm
        expense={selectedExpense}
        onCancel={cancelHandler}
        onSubmit={submitHandler}
        buttonLabel={isEditingMode ? "Update" : "Add"}
      />
      {isEditingMode && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  text: {},
});

export default ManageExpense;
