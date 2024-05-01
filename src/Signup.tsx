import React, { FormEvent } from 'react';
import "./SignUp.css"; // Make sure to create a corresponding CSS file
import abstractArt from "/Users/omnisceo/Desktop/LucidTrade_Project/lucidtrade/src/photos/LoginPic1.png";
import logoIcon from "/Users/omnisceo/Desktop/LucidTrade_Project/lucidtrade/src/photos/transparent.svg";

const SignUp = () => {
  // Function to handle form submission with proper TypeScript typing
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const target = event.target as typeof event.target & {
      firstName: { value: string };
      lastName: { value: string };
      email: { value: string };
      phoneNumber: { value: string };
      password: { value: string };
      confirmPassword: { value: string };
    };

    // Creating an object to hold form data
    const formData = {
      firstName: target.firstName.value,
      lastName: target.lastName.value,
      email: target.email.value,
      phoneNumber: target.phoneNumber.value,
      password: target.password.value,
      confirmPassword: target.confirmPassword.value
    };

    // Sending the POST request to your API
    try {
      const response = await fetch(' http://localhost:8080/api/auth/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json(); // Assuming the server responds with JSON
      console.log(data); // Logging the response to the console

      // You can redirect the user or clear the form here, depending on your application's needs
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <header className="login-header">
          <img src={logoIcon} alt="Logo" className="logo" />
          <h1>Welcome to LucidTrade</h1>
          <p>Kindly fill in your details below to create an account</p>
        </header>

        <form className="login-form-emailAndPassword" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <h2 className="EmailPassword">First Name</h2>
            <input name="firstName" type="text" placeholder="First Name" required />
          </div>
          <div className="input-wrapper">
            <h2 className="EmailPassword">Last Name</h2>
            <input name="lastName" type="text" placeholder="Last Name" required />
          </div>
          <div className="input-wrapper">
            <h2 className="EmailPassword">Email Address</h2>
            <input name="email" type="email" placeholder="Email Address" required />
          </div>
          <div className="input-wrapper">
            <h2 className="EmailPassword">Phone Number</h2>
            <input name="phoneNumber" type="text" placeholder="Phone Number" required />
          </div>
          <div className="input-wrapper">
            <h2 className="EmailPassword">Password</h2>
            <input name="password" type="password" placeholder="Password" required />
          </div>
          <div className="input-wrapper">
            <h2 className="EmailPassword">Confirm Password</h2>
            <input name="confirmPassword" type="password" placeholder="Confirm Password" required />
          </div>

          <div className="terms-container">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">I agree to terms & conditions</label>
          </div>

          <button type="submit" className="login-button">Login</button>

          <div className="separator">Or</div>
          <button type="button" className="google-button">Login with Google</button>
        </form>

        <footer className="login-footer">
          <p>Don't have an account yet? <a href="/signup">Create Account</a></p>
        </footer>
      </div>
      <div className="login-graphics">
        <img src={abstractArt} alt="Abstract Art" />
      </div>
    </div>
  );
};

export default SignUp;