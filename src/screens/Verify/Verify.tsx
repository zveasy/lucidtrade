import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { API, ApiData, NavigateApiData } from "../../api";
import { ScreenRoutes } from "../../App/Routes";

import abstractArt from "../../../src/photos/LoginPic1.png";
import logoIcon from "../../../src/photos/transparent.png";
import "./Verify.css";


const Verify = () => {
  const apiInstance = API.getInstance();
  const navigation = useNavigate();
  const location = useLocation();
  const formData = location.state;
  const [timer, setTimer] = useState(390); // 6 minutes and 30 seconds
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const nextIndex = index + 1;
      if (
        event.target.value.length === 1 &&
        nextIndex < inputRefs.current.length
      ) {
        const nextInput = inputRefs.current[nextIndex];
        if (nextInput) {
          nextInput.focus();
        }
      }
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Collecting the verification code from input fields
    const code = inputRefs.current
      .filter((input): input is HTMLInputElement => input !== null)
      .map((input) => input.value)
      .join("");

    const updatedFormData: ApiData = {
      ...formData,
      verificationCode: code,  // Add verification code to the existing form data
    };

    const apiData: NavigateApiData = {
      navigate: true,
      destination: ScreenRoutes.Loading,
      navigation: navigation
    }

    apiInstance.post('auth/register', updatedFormData, apiData, 'Verify');
  };


  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="verify-container">
      <div className="verify-form">
        <header className="verify-header">
          <div className="centered-container">
            <div>
              <img src={logoIcon} alt="Logo" className="verify-logo" />
            </div>
            <div>
              <h1>Verify that it’s you</h1>
            </div>
            <div>
              <p>
                Please check your inbox and enter the verification code you just
                received on your email address ending with example.com.
              </p>
            </div>
          </div>

        </header>

        <form onSubmit={handleSubmit} className="verify-code">
          <div className="input-wrapper">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)} // Assign ref safely
                name="code"
                type="text"
                maxLength={1}
                required
                className="code-input"
                autoComplete="off"
                pattern="\d*"
                onChange={handleChange(index)}
              />
            ))}
          </div>
          <div className="timer-resend">
            <span className="timer">Time left: {formatTime()}</span>
            <button
              type="button"
              className="resend-button"
              onClick={() => setTimer(390)}
            >
              Resend code
            </button>
          </div>

          <button type="submit" className="login-button">
            Verify
          </button>
          <button type="button" className="google-button">
            Cancel
          </button>
        </form>
      </div>
      <div className="verify-graphics">
        <img src={abstractArt} alt="Abstract Art" />
      </div>
    </div>
  );
};

export default Verify;
