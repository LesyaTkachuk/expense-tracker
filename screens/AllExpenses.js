import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenssesContext } from "../store/expensesContex";

function AllExpenses() {
  const { expenses } = useContext(ExpenssesContext);

  return (
    <View style={styles.container}>
      <ExpensesOutput expenses={expenses} expensesPeriod="Total" fallbackText="No registered expenses found! Add one!" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {},
});

export default AllExpenses;
