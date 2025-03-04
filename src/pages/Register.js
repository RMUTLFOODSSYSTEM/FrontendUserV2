import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import Firebase authentication functions
import { useNavigate } from 'react-router-dom'; // For redirection
import './Register.css'; // Import CSS for styling

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To handle error messages
  const [successMessage, setSuccessMessage] = useState(''); // To handle success messages
  const navigate = useNavigate(); // For navigation after successful registration

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage('Registration successful!'); // On successful registration
      setError('');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after 2 seconds
      }, 2000);
    } catch (error) {
      setError('Error registering: ' + error.message); // Show error message if registration fails
      setSuccessMessage('');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="submit-btn">Register</button>
        </form>

        {/* Show success or error messages */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default RegisterPage;
