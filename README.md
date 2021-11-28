# Kyoo
Kyoo is a web application that allows students, TAs, Professors to have better office hour experience. 

## Top level Directory layout
```
.
├── build                   # Compiled files - run yarn build to generate this directory
├── src                     # Source files 
└── README.md
```

## src Directory layout
```
.
├── ...
├── src                     # Source files
│   ├── __tests__           # Testing files
│   ├── components          # Major components
│   ├── style               # uclaTheme css
│   └── constants           # Constant values used across the project including Routing info
│     
└── ...
```
## components Directory layout
```
├── ...
├── src                     # Source files
│   ├── ...         
│   ├── components          # Major components
│   │   ├── Firebase        # Firebase component that communicates with firestore backend
│   │   ├── ForgetPassword  # Reset password component
│   │   ├── SignIn          # Sign in component
│   │   ├── SignOut         # Sign out component
│   │   ├── SignUp          # Sign up component
│   │   ├── Ticket          # Ticket components including createTicket, editTicket, resolveTicket etc
│   │   ├── Queue           # Queue components including createQueue, editQueue etc
│   │   └── User            # User components including userPage, updateUserInfo etc
│   │     
│   └── ...    
│     
└── ...
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\



