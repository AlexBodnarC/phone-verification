import React, { FC, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

type PhoneNumberValidationProps = {
  phoneNumber: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const PhoneNumberValidation: FC<PhoneNumberValidationProps> = (props) => {
  const { phoneNumber, onChange } = props;
  const [valid, setValid] = useState(true);

  console.log(phoneNumber);
  const handleChange = (value) => {
    onChange(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  return (
    <div className='w-full'>
      <label>
        Phone Number:
        <PhoneInput
          country={'us'}
          value={phoneNumber}
          onChange={handleChange}
          inputProps={{
            required: true,
            style: {
              width: '100%',
              background: '#222024',
              color: 'white',
              marginBottom: '0px'
            },
          }}
          buttonStyle={{
            background: '#222024',
          }}
          dropdownStyle={{
            padding: "0px"
          }}
        />
      </label>
      {!valid && (
        <p style={{ color: 'red' }}>Please enter a valid phone number.</p>
      )}
    </div>
  );
};

export default PhoneNumberValidation;
