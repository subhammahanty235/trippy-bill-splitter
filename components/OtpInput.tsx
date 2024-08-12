import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface OTPInputProps {
  codeLength?: number;
  onCodeFilled: (code: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ codeLength = 6, onCodeFilled }) => {
  const [otp, setOtp] = useState<string[]>(Array(codeLength).fill(''));
  const inputs = useRef<Array<TextInput | null>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setCurrentIndex(index)
    setOtp(newOtp);

    if (text.length > 0 && index < codeLength - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (text.length === 0 && index > 0) {
      inputs.current[index - 1]?.focus();
    }

    if (newOtp.every((value) => value.length > 0)) {
      onCodeFilled(newOtp.join(''));
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          style={[styles.inputBox, {borderColor: index === currentIndex ? "#ef4f5f":"#f9d7da"}]}
          onChangeText={(text) => handleChangeText(text, index)}
          value={digit}
          keyboardType="numeric"
          maxLength={1}
          ref={(input) => (inputs.current[index] = input)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height:50,
    // backgroundColor:"black"
  },
  inputBox: {
    marginBottom:20,
    width: 55,
    height: 55,
    borderWidth: 1,
    // borderColor: '#f9d7da',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 25,
    marginRight: 10,
    fontWeight:'500',
    backgroundColor: '#fff',
  },
});

export default OTPInput;
