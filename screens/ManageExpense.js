import { useLayoutEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/ui/IconButton";
import Button from "../components/ui/Button";
import { ExpenssesContext } from "../store/expensesContex";
import { GlobalStyles } from "../constants/styles";

function ManageExpense({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useContext(ExpenssesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditingMode = !!editedExpenseId;

  function deleteExpenseHandler() {
    deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    isEditingMode
      ? updateExpense("e-3", {
          description: "Bread White",
          amount: 3.45,
          date: new Date("2023-12-19"),
        })
      : addExpense({
          description: "Test Purchase",
          amount: 75.75,
          date: new Date(),
        });
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditingMode ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditingMode]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditingMode ? "Update" : "Add"}
        </Button>
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "36%",
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
