import { useState } from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "../../components/ui/Button";
import Input from "./Input";

const ExpenseForm = ({ expense, onCancel, onSubmit, buttonLabel }) => {
  // approach with separate states
  //   const [amountValue, setAmountValue] = useState("");
  //   const [dateValue, setDateValue] = useState("");
  //   const [descriptionValue, setDescriptionValue] = useState("");

  //   const amountChangedHandler = (enteredAmount) => {
  //     setAmountValue(enteredAmount);
  //   };

  //   const dateChangedHandler = (enteredDate) => {
  //     setDateValue(enteredDate);
  //   };

  //   const descriptionChangedHandler = (enteredDescription) => {
  //     setDescriptionValue(enteredDescription);
  //   };

  const [inputData, setInputValues] = useState({
    amount: {
      value: expense?.amount ? expense?.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: expense?.date ? expense?.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: expense?.description ? expense?.description : "",
      isValid: true,
    },
  });

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputValues((prevState) => ({
      ...prevState,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  };

  function confirmHandler() {
    const expenseData = {
      amount: +inputData.amount.value.trim(),
      date: new Date(inputData.date.value.trim()),
      description: inputData.description.value.trim(),
    };

    const isValidAmount =
      !Number.isNaN(expenseData.amount) && expenseData.amount > 0;
    const isValidDate = expenseData.date.toString() !== "Invalid Date";
    const isValidDescription = expenseData.description.length > 0;

    if (!isValidAmount || !isValidDate || !isValidDescription) {
      setInputValues((prevState) => ({
        amount: { value: prevState.amount.value, isValid: isValidAmount },
        date: { value: prevState.date.value, isValid: isValidDate },
        description: {
          value: prevState.description.value,
          isValid: isValidDescription,
        },
      }));
      return;
    }

    onSubmit(expenseData);
  }

  const isFormInvalid =
    !inputData.amount.isValid ||
    !inputData.date.isValid ||
    !inputData.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.row}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!inputData.amount.isValid}
          inputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (value) => inputChangedHandler("amount", value),
            value: inputData.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!inputData.date.isValid}
          inputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            value: inputData.date.value,
            onChangeText: inputChangedHandler.bind(this, "date"),
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputData.description.isValid}
        inputConfig={{
          multiline: true,
          value: inputData.description.value,
          onChangeText: inputChangedHandler.bind(this, "description"),
          //   autoCapitalize: "none",
          //   autoCorrect: true,
          //   autoComplete: "none",
        }}
      />
      {isFormInvalid && (
        <Text style={styles.error}>
          Form input data are invalid. Please correct
        </Text>
      )}

      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {buttonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: { flex: 1 },
  title: {
    color: GlobalStyles.colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  multiline: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "36%",
  },
  error: {
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    marginBottom: 8,
  },
});
