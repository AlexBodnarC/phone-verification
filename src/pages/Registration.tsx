import { Button, Input, Form as AntForm } from "antd";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from "react";

import avatar from '../icons/Avatar-1.svg';
import { useSelector } from "react-redux";
import { selectPhoneNumber, selectUid } from "../redux/phoneSlice";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../main";
import { useNavigate } from "react-router-dom";

export interface FormValues {
  firstName: string;
  lastName: string;
  position: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  position: Yup.string().required('Position is required'),
});

export const RegistrationPage = () => {
  const phoneNumberRedux = useSelector(selectPhoneNumber);
  const userUid = useSelector(selectUid)

  const [isFieldsFilled, setIsFieldsFilled] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    position: '',
  });

  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleAddUser = async (
    uid: string,
    phoneNumberRedux: string,
    position: string,
    userLastName: string,
    userName: string,

    ) => {
    try {
      const newUser = {
        UID: uid,
        phoneNumber: phoneNumberRedux,
        position: position,
        userLastName: userLastName,
        userName: userName,
      };

      // Add a new user to the "users" collection
      const docRef = await addDoc(collection(firestore, 'users'), newUser);

      console.log('New user added with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding new user:', error);
    }
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    position: '',
  };

  const handleSubmit = async () => {
    try {
      if (userUid !== null && phoneNumberRedux != null) {
        await handleAddUser(
          userUid,
          phoneNumberRedux,
          formValues.position,
          formValues.lastName,
          formValues.firstName,
        );
        setIsFieldsFilled(true);
  
        console.log("success create user");
      } else {
        console.log('Cannot create new user!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error handling form submission:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {!isFieldsFilled && (
          <div className="p-8 rounded-lg shadow-md w-full max-w-md flex flex-col items-center gap-2">
            <h3 style={{ color: 'white' }}>Personal information</h3>
            <h5 style={{ color: 'grey' }}>Tell us a little bit about yourself</h5>
  
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="flex flex-col gap-6 w-full">
                <div className="flex gap-6">
                  <Field name="firstName">
                    {({ field }) => (
                      <div className="flex flex-col">
                        <Input
                          {...field}
                          placeholder="First name"
                          onChange={(e) => {
                            handleChange('firstName', e.target.value);
                            field.onChange(e);
                          }}
                        />
                        <ErrorMessage name="firstName" component="div" style={{ color: 'red' }} />
                      </div>
                    )}
                  </Field>
  
                  <Field name="lastName">
                    {({ field }) => (
                      <div className="flex flex-col">
                        <Input
                          {...field}
                          placeholder="Last name"
                          onChange={(e) => {
                            handleChange('lastName', e.target.value);
                            field.onChange(e);
                          }}
                        />
                        <ErrorMessage name="lastName" component="div" style={{ color: 'red' }} />
                      </div>
                    )}
                  </Field>
                </div>
  
                <Field name="position">
                    {({ field }) => (
                      <div className="flex flex-col">
                        <Input
                          {...field}
                          placeholder="Position"
                          onChange={(e) => {
                            handleChange('position', e.target.value);
                            field.onChange(e);
                          }}
                        />
                        <ErrorMessage name="position" component="div" style={{ color: 'red' }} />
                      </div>
                    )}
                  </Field>
  
                  <AntForm.Item>
                    <Button 
                      htmlType="submit" 
                      type="primary" 
                      className="bg-purple-500 hover:bg-purple-600 w-full text-white"
                    >
                      Submit
                    </Button>
                  </AntForm.Item>
              </Form>
            </Formik>
          </div>
        )}
  
        {isFieldsFilled && (
          <div className="p-8 rounded-lg shadow-md w-full max-w-md flex flex-col items-center gap-6">
            <h3 style={{ color: 'white' }}>Profile picture</h3>
            <h5 style={{ color: 'grey' }}>Add a cool pic to be easily recognizable.</h5>
  
            <img src={avatar} alt="default avatar" />
  
            <Button 
              type="primary" 
              className="bg-purple-500 hover:bg-purple-600 w-full text-white"
              onClick={() => navigate('/')}
            >
              Submit
            </Button>
          </div>
        )}
    </div>
  );
};
