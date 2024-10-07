import React, { useState } from 'react';

export default function SignupForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Email validation for @gmail.com
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Only allows Gmail addresses
    return emailRegex.test(email);
  };

  // Password validation (minimum 8 characters, including a number and a special character)
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid Gmail address (e.g., example@gmail.com)');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and include a number and a special character');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    if (!emailError && !passwordError && (isLogin || !confirmPasswordError)) {
      if (isLogin) {
        alert('Logged in successfully!');
      } else {
        alert('Signed up successfully!');
        setIsSignedUp(true);
        setIsLogin(true); // Switch to login view after sign-up
      }
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <div className='form-toggle'>
          <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>SignUp</button>
        </div>
        <form className='form' onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <h2>Login Form</h2>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSignedUp} // Email pre-filled after sign-up
              />
              {emailError && <p className='error'>{emailError}</p>}
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className='error'>{passwordError}</p>}
              <a href='#'>Forgot Password?</a>
              <button type='submit'>Login</button>
              <p>Not a Member? <a href='#' onClick={() => setIsLogin(false)}>Signup now</a></p>
            </>
          ) : (
            <>
              <h2>Signup Form</h2>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className='error'>{emailError}</p>}
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <p className='error'>{passwordError}</p>}
              <input
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPasswordError && <p className='error'>{confirmPasswordError}</p>}
              <button type='submit'>SignUp</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
