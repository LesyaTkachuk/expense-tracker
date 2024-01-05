import { View, Text, StyleSheet, TextInput } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Input = ({ label, inputConfig, style, invalid }) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.errorText]}>{label}</Text>
      <TextInput
        {...inputConfig}
        style={[
          styles.input,
          inputConfig?.multiline && styles.multiline,
          invalid && styles.errorInput,
        ]}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
    // padding: 6,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    fontSize: 18,
    padding: 6,
    borderRadius: 6,
  },
  label: {
    fontSize: 14,
    color: GlobalStyles.colors.primary100,
    marginBottom: 6,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  errorText: {
    color: GlobalStyles.colors.error500,
  },
  errorInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
