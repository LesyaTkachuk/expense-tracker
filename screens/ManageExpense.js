import { useLayoutEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/ui/IconButton";
import { ExpenssesContext } from "../store/expensesContex";
import { GlobalStyles } from "../constants/styles";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {
  storeExpense,
  updateExpense as updateExpenseOnBackend,
  deleteExpense as deleteExpenseOnBackend,
} from "../utils/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useContext(ExpenssesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditingMode = !!editedExpenseId;
  const selectedExpense = expenses.find((el) => el.id === editedExpenseId);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);

    try {
      await deleteExpenseOnBackend(editedExpenseId);
      deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (e) {
      setError("Could not delete expense! Please try again later");
      setIsSubmitting(false); // not necessary as we close the screen
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function submitHandler(expenseData) {
    setIsSubmitting(true);

    try {
      if (isEditingMode) {
        const response = await updateExpenseOnBackend(
          editedExpenseId,
          expenseData
        );
        updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (e) {
      setError("Could not save data - please try again later");
      setIsSubmitting(false);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditingMode ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditingMode]);
  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

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
