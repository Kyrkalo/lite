import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryPasswordInput from "../components/PrimaryPasswordInput";
import { globalStyles } from "../styles";
import PrimaryPhoneInput from "../components/PrimaryPhoneInput";

export default function RegisterScreen() {
  const [step, setStep] = useState(1);

  const [error, setError] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [details, setDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    email: "",
  });

  const validatePhone = (): boolean => {
    const valid = details.phone?.length >= 10;
    setError((prevError) => ({
      ...prevError,
      phone: valid ? '' : 'Phone number is required',
    }));
    return valid;
  };

  const validateUsername = (): boolean => {
    const valid = details.username?.length >= 5;
    setError((prevError) => ({
      ...prevError,
      username: valid ? '' : 'Username must be at least 5 characters long.',
    }));
    return valid;
  };

  const validateEmail = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(details.email);
    setError((prevError) => ({
      ...prevError,
      email: valid ? '' : 'Valid email is required.',
    }));
    return valid;
  };

  const validatePassword = (): boolean => {
    const { password, confirmPassword } = details;

    if (password !== confirmPassword) {
      setError((prevError) => ({
        ...prevError,
        password: 'Passwords do not match.',
      }));
      return false;
    }

    if (password.length < 6) {
      setError((prevError) => ({
        ...prevError,
        password: 'Passwords must be at least 6 characters long.',
      }));
      return false;
    }

    if (!/[^\w\s]/.test(password)) {
      setError((prevError) => ({
        ...prevError,
        password: 'Passwords must have at least one non-alphanumeric character.',
      }));
      return false;
    }

    if (!/\d/.test(password)) {
      setError((prevError) => ({
        ...prevError,
        password: 'Passwords must have at least one digit (0-9).',
      }));
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      setError((prevError) => ({
        ...prevError,
        password: 'Passwords must have at least one uppercase letter (A-Z).',
      }));
      return false;
    }

    setError((prevError) => ({ ...prevError, password: '' }));
    return true;
  };

  const handleInput = function (key: string, value: any): void {
    setDetails({ ...details, [key]: value });
  };

  const handleNextStep = function () {
    setStep((prevStep) => {
      switch (prevStep) {
        case 1:
          const isUserNameValid = validateUsername();
          const isEmailValid = validateEmail();
          const isPhoneValid = validatePhone();
          if ( isUserNameValid &&  isEmailValid && isPhoneValid) {
            return prevStep + 1;
          }
          break;
        case 2:
          if (validatePassword()) {
            return prevStep + 1;
          }
          break;
        case 3:
          return prevStep; // Step 3 is the last step
        default:
          return prevStep;
      }
      return prevStep; // Stay on the current step if validation fails
    });
  };

  const handlePrevtStep = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.centeredView}>
        {step === 1 && (
          <>
            <PrimaryPhoneInput
              placeholder="phone"
              returnKey="next"
              isRequired={true}
              error={error.phone}
              onChange={(value) => handleInput("phone", value)}
            />
            <PrimaryInput
              placeholder="username"
              returnKey="next"
              error={error.username}
              isRequired={true}
              onChange={(value) => handleInput("username", value)}
            />
            <PrimaryInput
              placeholder="email"
              returnKey="next"
              error={error.email}
              isRequired={true}
              onChange={(value) => handleInput("email", value)}
            />
          </>
        )}
        {step === 2 && (
          <>
            <PrimaryPasswordInput
              onChange={(value) => handleInput("password", value)}
              returnKey="next"
              placeholder="password"
              error={error.password}
              isRequired={true}
            />
            <PrimaryPasswordInput
              onChange={(value) => handleInput("confirmPassword", value)}
              returnKey="next"
              placeholder="confirm password"
              error={error.confirmPassword}
              isRequired={true}
            />
          </>
        )}
        <View style={globalStyles.row}>
          {step !== 1 && (
            <TouchableOpacity
              style={globalStyles.backButton}
              onPress={handlePrevtStep}
            >
              <Text style={globalStyles.buttonText}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={globalStyles.nextButton}
            onPress={handleNextStep}
          >
            <Text style={globalStyles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
