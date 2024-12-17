import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {number, object} from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = object().shape({
  passwordLength: number()
    .min(6, 'Password should be greater then 6 characters')
    .max(50, 'Password should be lower then 50 characters')
    .required('Password Length is required'),
});

const Home = () => {
  const [Password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characters = '';

    const lowerCaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberCharacters = '0123456789';
    const symbolCharacters = '!@#$%^&*()_+';

    if (lowerCase) characters += lowerCaseCharacters;
    if (upperCase) characters += upperCaseCharacters;
    if (numbers) characters += numberCharacters;
    if (symbols) characters += symbolCharacters;

    const password = generatePassword(characters, passwordLength);
    setPassword(password);
    setIsPassGenerated(true);
  };

  const generatePassword = (characters: string, passwordLength: number) => {
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <View>
      <Text style={styles.mainHeading}>Password Generator</Text>
      <View>
        <Formik
          initialValues={{passwordLength: ''}}
          validationSchema={PasswordSchema}
          onSubmit={values => generatePasswordString(+values.passwordLength)}>
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleSubmit,
            handleReset,
          }) => (
            <View>
              <View style={styles.inputContainer}>
                <View>
                  <Text style={styles.label}>Enter Password Length</Text>
                  {touched.passwordLength && errors.passwordLength && (
                    <Text style={styles.textError}>
                      {errors.passwordLength}
                    </Text>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  value={values.passwordLength}
                  onChangeText={handleChange('passwordLength')}
                  placeholder="Ex. 8"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.checkboxLabel}>Use Lower Case</Text>
                <BouncyCheckbox
                  useBuiltInState={false}
                  isChecked={lowerCase}
                  onPress={() => setLowerCase(prev => !prev)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.checkboxLabel}>Use Upper Case</Text>
                <BouncyCheckbox
                  useBuiltInState={false}
                  isChecked={upperCase}
                  onPress={() => setUpperCase(prev => !prev)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.checkboxLabel}>Use Numbers</Text>
                <BouncyCheckbox
                  useBuiltInState={false}
                  isChecked={numbers}
                  onPress={() => setNumbers(prev => !prev)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.checkboxLabel}>Use Symbols</Text>
                <BouncyCheckbox
                  useBuiltInState={false}
                  isChecked={symbols}
                  onPress={() => setSymbols(prev => !prev)}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  disabled={!isValid}
                  style={styles.generateButton}
                  onPress={() => handleSubmit()}>
                  <Text style={styles.generateButtonText}>
                    Generate Password
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={() => {
                    handleReset();
                    resetPasswordState();
                  }}>
                  <Text style={styles.generateButtonText}>Reset Password</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
      {isPassGenerated && (
        <View style={styles.passwordContainer}>
          <Text style={styles.label}>Generated Password</Text>
          <Text style={{color: 'white', fontWeight: '500'}}>
            Long press to copy
          </Text>
          <Text selectable style={styles.passwordText}>
            {Password}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainHeading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'white',
    fontFamily: 'sans-serif',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    borderRadius: 5,
    fontSize: 20,
    padding: 10,
    width: 100,
    textShadowColor: 'white',
  },
  textError: {
    color: 'red',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checkboxLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  generateButton: {
    backgroundColor: '#4CAF50',
    width: '45%',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '45%',
    borderRadius: 5,
    marginVertical: 10,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  passwordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FCAF70',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  passwordText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
