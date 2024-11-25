import React, { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryPasswordInput from "../components/PrimaryPasswordInput";
import { globalStyles } from "../styles";
import PrimaryPhoneInput from "../components/PrimaryPhoneInput";
import PrimaryButton from "../components/PrimaryButton";
import PrimaryEmailInput from "../components/PrimaryEmailInput";
import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
import { RootDrawerParamList } from "../types/rootDrawerParamList";

export default function RegisterScreen() {

  const [step, setStep] = useState(1);
  const navigation = useNavigation<NavigationProp<RootDrawerParamList>>();
  const [details, setDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    email: "",
  });

  useFocusEffect(useCallback(() => {
    setStep(1);
    setDetails({...details});
  }, []));

  const emailRef = useRef<any>(null);
  const usernameRef = useRef<any>(null);
  const phoneRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const confirmPasswordRef = useRef<any>(null);

  const handleInput = function (key: string, value: any): void {
    setDetails({ ...details, [key]: value });
  };

  const handleNextStep = function () {
    let currentStep = step;
    switch(currentStep) {
      case 1:
        const isUserNameValid = usernameRef.current?.validate();
        const isEmailValid  = emailRef.current?.validate();
        const isPhoneValid = phoneRef.current?.validate();
        if ( isUserNameValid && isEmailValid && isPhoneValid) {
          currentStep = currentStep + 1;
        }
        break;
      case 2:
        const isPassworValid = passwordRef.current?.validate();
        const isConfirmPasswordValid = confirmPasswordRef.current?.validate();
        if (isPassworValid && isConfirmPasswordValid) {
          currentStep = currentStep + 1;
        }
        break;
      case 3:
        default:
        break;
    }

    setStep((prevStep) => prevStep = currentStep);
  };

  const handlePrevtStep = () => {
    setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
    if (step === 1) {
      navigation.navigate('PreLogin');
    }
  };

  return (
    <View style={globalStyles.modalContainer}>
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
              confirm = {true}
              value={details.password}
              onChange={(value) => handleInput("password", value)}
              returnKey="next"
              placeholder="password"
              min={7}
              confirmPlaceholder="confirmPlaceholder"              
              isRequired={true}
            />
          </>
        )}
        <View style={globalStyles.row}>
          
            <PrimaryButton 
              text="Back"
              onPress={handlePrevtStep}
              buttonStyle={globalStyles.backButton} 
              textStyle={globalStyles.buttonText}/>
          
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
