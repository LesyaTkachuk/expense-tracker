import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../utils/date";
import { ExpenssesContext } from "../store/expensesContex";

function RecentExpenses() {
  const { expenses } = useContext(ExpenssesContext);

  const recentExpenses = expenses.filter((el) => {
    const todayDate = new Date();
    const dateSevenDaysAgo = getDateMinusDays(todayDate, 7);
    return el.date > dateSevenDaysAgo && el.date <= todayDate;
  });

  return (
    <View style={styles.container}>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Last 7 days"
        fallbackText="No expenses registered for the last 7 days"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {},
});

export default RecentExpenses;
