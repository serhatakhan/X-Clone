# Firebase X Clone

This project is a X clone social media platform developed with React and **Firebase**. Users can tweet, view and interact with other users tweets through this platform.

## Features

* **`AuthPage`** component is used to authenticate users such as registering, logging in, and resetting passwords. It manages users using the Firebase Authentication API and redirects the user to the home page after login or registration.

* **`Nav`** component creates the navigation bar of the user interface. This component allows the user to log out and navigate to various pages. While logged in with Firebase Authentication, it shows user information and offers logout functionality.

* **`Main`** component creates the home page view and displays tweets created by users by communicating with Firebase Firestore. Live data is streamed using Firestore's **onSnapshot** method, and tweets added by users are dynamically updated.

* **`Firebase Authentication:`** Used to manage users' authentication. User registration and login operations are carried out using methods such as createUserWithEmailAndPassword and signInWithEmailAndPassword.

* **`Firestore Database:`** Firestore database was used to store users' tweets. Data is monitored and updated live using methods such as collection and onSnapshot.

* **`Firebase Storage:`** Firebase Storage was used in the project for features such as file upload and image storage. For example, user profile pictures and the image files they sent were stored this way.

## Used Technologies

-React Router Dom

-React Toastify

-Tailwind

-Firebase

-Uuid

-React Icons

-Moment

## Screen Gif





