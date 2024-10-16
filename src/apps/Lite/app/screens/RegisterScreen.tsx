import React, { useRef, useState } from "react";
import { View } from "react-native";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryPasswordInput from "../components/PrimaryPasswordInput";
import { globalStyles } from "../styles";
import PrimaryPhoneInput from "../components/PrimaryPhoneInput";
import PrimaryButton from "../components/PrimaryButton";
import PrimaryEmailInput from "../components/PrimaryEmailInput";

export default function RegisterScreen() {

  const [step, setStep] = useState(1);

  const [details, setDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    email: "",
  });

  const emailRef = useRef<any>(null);
  const usernameRef = useRef<any>(null);
  const phoneRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const confirmPasswordRef = useRef<any>(null);

  const handleInput = function (key: string, value: any): void {
    setDetails({ ...details, [key]: value });
  };

  const handleNextStep = function () {
    setStep((prevStep) => {
      switch (prevStep) {
        case 1:

          const isUserNameValid = usernameRef.current?.validate();
          const isEmailValid  = emailRef.current?.validate();
          const isPhoneValid = phoneRef.current?.validate();
          if ( isUserNameValid && isEmailValid && isPhoneValid) {
            return prevStep + 1;
          }
          break;
        case 2:
          const isPassworValid = passwordRef.current?.validate();
          const isConfirmPasswordValid = confirmPasswordRef.current?.validate();
          if (isPassworValid && isConfirmPasswordValid) {
            return prevStep + 1;
          }
          break;
        case 3:
          return prevStep; 
        default:
          return prevStep;
      }
      return prevStep;
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
              ref={phoneRef}
              value={details.phone}
              placeholder="phone"
              returnKey="next"
              isRequired={true}
              onChange={(value) => handleInput("phone", value)}
            />
            <PrimaryInput
              ref={usernameRef}
              value={details.username}
              placeholder="username"
              returnKey="next"
              isRequired={true}
              min={5}
              onChange={(value) => handleInput("username", value)}
            />
            <PrimaryEmailInput
              ref={emailRef}
              value={details.email}
              placeholder="email"
              returnKey="next"
              error="Valid email is required."
              isRequired={true}
              onChange={(value) => handleInput("email", value)}
            />
          </>
        )}
        {step === 2 && (
          <>
            <PrimaryPasswordInput
              ref={passwordRef}
              value={details.password}
              onChange={(value) => handleInput("password", value)}
              returnKey="next"
              placeholder="password"
              isRequired={true}
            />
            <PrimaryPasswordInput
              ref={confirmPasswordRef}
              value={details.confirmPassword}
              onChange={(value) => handleInput("confirmPassword", value)}
              returnKey="next"
              placeholder="confirm password"
              isRequired={true}
            />
          </>
        )}
        <View style={globalStyles.row}>
          {step !== 1 && (
            <PrimaryButton 
              text="Back"
              onPress={handlePrevtStep}
              buttonStyle={globalStyles.backButton} 
              textStyle={globalStyles.buttonText}/>
          )}
           <PrimaryButton 
              text="Next"
              onPress={handleNextStep}
              buttonStyle={globalStyles.nextButton} 
              textStyle={globalStyles.buttonText}/>
        </View>
      </View>
    </View>
  );
}
