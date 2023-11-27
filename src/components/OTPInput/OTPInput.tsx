import React, { useRef, useState, KeyboardEvent } from 'react';

interface OtpInputWithValidationProps {
  numberOfDigits: number;
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
}

const OtpInputWithValidation: React.FC<OtpInputWithValidationProps> = ({ numberOfDigits, otp, setOtp }) => {
  const [otpError, setOtpError] = useState<string | null>(null);
  const otpBoxReference = useRef<HTMLInputElement[]>([]);

  function handleChange(value: string, index: number) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handleBackspaceAndEnter(e: KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === "Backspace" && !(e.target as HTMLInputElement).value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && (e.target as HTMLInputElement).value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  return (
    <article className="w-1/2">
      <div className="flex items-center gap-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            ref={(reference) => (otpBoxReference.current[index] = reference as HTMLInputElement)}
            className={`border w-20 h-auto text-white p-3 rounded-md block bg-black focus:border-2 focus:outline-none appearance-none`}
          />
        ))}
      </div>

      <p className={`text-lg text-white mt-4 ${otpError ? 'error-show' : ''}`}>{otpError}</p>
    </article>
  );
};

export default OtpInputWithValidation;
