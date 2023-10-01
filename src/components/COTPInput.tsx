import React from 'react';
import OtpInputs from 'react-native-otp-inputs';

export const COTPInput = (props: {handleChange: (value: string) => void}) => {
  const otpRef = React.useRef<any>(null);
  return (
    <OtpInputs
      clearTextOnFocus
      handleChange={props.handleChange}
      keyboardType="phone-pad"
      numberOfInputs={4}
      ref={otpRef}
      autofillFromClipboard={false}
      inputStyles={{color: 'black', textAlign: 'center'}}
      inputContainerStyles={{
        borderColor: 'black',
        borderBottomWidth: 1,
      }}
      autoFocus
    />
  );
};
