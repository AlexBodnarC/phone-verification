import { Button } from 'antd';
import logo from '../icons/Vector.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OtpInputWithValidation from '../components/OTPInput/OTPInput';
import PhoneNumberValidation from '../components/Phone/PhoneValidation';
import { ConfirmationResult, RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setPhoneNumber, setUid, setToken, setAuth } from '../redux/phoneSlice';
import { selectUsers } from '../redux/userSlice';

export const LoginPage = () => {
  const [phoneNumberInputValue, setPhoneNumberInputValue] = useState('');
  const [isCodeSending, setIsCodeSending] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<null | ConfirmationResult>(null);

  //const phoneNumberRedux = useSelector(selectPhoneNumber);
  //const uidRedux = useSelector(selectUid);
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  //const { isAuthenticated } = useAuth();

  const handleChechIsPhoneExist = () => {
    return users.find((user) => user.phoneNumber === phoneNumberInputValue);
  }

  // verification code
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  
  const auth = getAuth();
  const navigate = useNavigate();

  let recaptchaVerifier: RecaptchaVerifier | undefined;

  const initializeRecaptcha = () => {
    // Ensure reCAPTCHA is initialized only once
    if (!recaptchaVerifier) {
      recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
        'size': 'invisible',
        'callback': () => {
        },
      });
    }
  };

  const phone = '+' + phoneNumberInputValue;

  const handleSendCode = async () => {
    try {
      initializeRecaptcha(); // Ensure reCAPTCHA is initialized before sending the code

      const result = await signInWithPhoneNumber(auth, phone, recaptchaVerifier!);
      setConfirmationResult(result); // Set confirmationResult
      setIsCodeSending(true);
      console.log('SMS verification code sent successfully!');
    } catch (error) {
      console.error('Error sending SMS code:', error);
    }
  };

  const handleConfirm = async () => {
    try {
      if (confirmationResult !== null) {
        // Verify the code entered by the user
        const response = await confirmationResult.confirm(otp.join(''));

        dispatch(setPhoneNumber(phoneNumberInputValue));
        dispatch(setUid(response.user.uid)); // Dispatch uid to Redux store
        const token = response.user.uid;
  
        // Set the token and auth state in the Redux store
        dispatch(setToken(token));
        dispatch(setAuth(true));
        const result = handleChechIsPhoneExist();

        result && navigate('/');
        !result && navigate('/registration')

        console.log('User signed in successfully!');
      } else {
        console.error('Confirmation result is null. Make sure to send the verification code first.');
      }
    } catch (error) {
      console.error('Error confirming verification code:', error);
    }
  };
 
  return (
    <div className="flex items-center justify-center h-screen">
      {!isCodeSending && (
        <div className="p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-3 items-center">
          <img src={logo} alt='logo' className="mb-4" />

          <h3 className="text-white text-2xl font-semibold mb-2">Let's get you started</h3>
          <p className="text-gray-500">Sign in or create an account.</p>
        
          <div id='sign-in-button'></div>

          <div className='flex flex-col w-full gap-10'>
            <PhoneNumberValidation 
              phoneNumber={phoneNumberInputValue}
              onChange={setPhoneNumberInputValue}
            />

            <Button onClick={handleSendCode} type="primary" className="bg-purple-500 hover:bg-purple-600 w-full">
              Continue
            </Button>
          </div>

          <div className="mt-4 flex justify-center gap-1">
            <p className="text-gray-500">Having trouble?</p>
            <Link to="/" className="text-white hover:underline">
              Contact us
            </Link>
          </div>
        </div>
        )}

        {isCodeSending && (
          <>
          <div>
            <div className='flex flex-col text-center'>
              <h3 className="text-white text-2xl font-semibold mb-2">Verify</h3>
              <p className="text-gray-500 mb-6">{`Enter the code we've sent to${phoneNumberInputValue}`}</p>
            </div>

            <OtpInputWithValidation numberOfDigits={6} otp={otp} setOtp={setOtp} />

            <p>Resent code</p>

            <div className='flex gap-6'>
              <Button 
                onClick={() => setIsCodeSending(false)} 
                type="primary" 
                className="bg-purple-500 hover:bg-purple-600 w-full"
              >
                Back
              </Button>

              <Button 
                onClick={handleConfirm} 
                type="primary" 
                className="bg-purple-500 hover:bg-purple-600 w-full"
              >
                Continue
              </Button>
            </div>
          </div>
          </>
        )
      }
    </div>
  );
};
