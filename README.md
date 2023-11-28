# React + TypeScript + Vite
### Clone the project
```bash
git clone https://github.com/AlexBodnarC/phone-verification.git
```
### Navigate to the Project Directory
```bash
cd phone-verification
```
### Install Dependencies
```bash
yarn
```
### Firebase Configuration
- Create a Firebase project in the Firebase Console.
- Enable the "Phone" sign-in method in the "Authentication" section.
- Create a Firestore database and set up a collection named **users**.
- In the project settings, obtain the Firebase configuration.
- Create a new file named .env in the root of your React project.
- Add the following lines to your .env file, replacing the values with the Firebase configuration:

### Put your firebase keys to .env file 
```dotenv
REACT_APP_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_auth_domain
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_storage_bucket
REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_APP_ID=your_app_id
REACT_APP_MEASUREMENT_ID=your_measurement_id
```
### Run the Project
```bash
yarn dev
```

### Open the Project in Your Browser
Visit http://localhost:5173/  in your browser to see the project in action.
