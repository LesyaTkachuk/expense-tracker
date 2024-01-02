import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpensesSummary({ periodName, expenses }) {
  const expensesSum = expenses.reduce((acc, el) => acc + el.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.textPeriod}>{periodName}</Text>
      <Text style={styles.textSum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summary: {},
  textPeriod: {
    fontSize: 14,
    color: GlobalStyles.colors.primary400,
  },
  textSum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});

export default ExpensesSummary;
