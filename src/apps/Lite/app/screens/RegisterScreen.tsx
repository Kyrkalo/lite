import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryPasswordInput from "../components/PrimaryPasswordInput";
import { styles } from "../styles";
import PrimaryPhoneInput from "../components/PrimaryPhoneInput";

export default function RegisterScreen() {

  const [step, setStep] = useState(1);

  const [details, setDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    email: "",
  });

  const handleInput = function (key: string, value: any): void {
    setDetails({ ...details, [key]: value });
    console.log(details);
  };

  const handleNextStep = function () {
    setStep((prev) => prev + 1);
  };

  const handlePrevtStep = function () {
    setStep((prev) => prev - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        {step === 1 && (
          <>
            <PrimaryPhoneInput
              value={details.username}
              placeholder="phone"
              returnKey="next"
              onChange={(value) => handleInput("phone", value)}
            />
            <PrimaryInput
              value={details.username}
              placeholder="user name"
              returnKey="next"
              onChange={(value) => handleInput("username", value)}
            />
            <PrimaryInput
              value={details.username}
              placeholder="email"
              returnKey="next"
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
            />
            <PrimaryPasswordInput
              onChange={(value) => handleInput("confirmPassword", value)}
              returnKey="next"
              placeholder="confirm password"
            />
          </>
        )}
        <View style={styles.row}>
          {step !== 1 && (
            <>
              <TouchableOpacity
                style={[
                  styles.backButton,
                  {
                    //backgroundColor: enableLogin ? '#c6cbef' : '#A9A9A9'
                  },
                ]}
                //disabled={enableLogin}
                onPress={handlePrevtStep}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            style={[
              styles.nextButton,
              {
                //backgroundColor: enableLogin ? '#c6cbef' : '#A9A9A9'
              },
            ]}
            //disabled={enableLogin}
            onPress={handleNextStep}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
