import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// 1. Define the context
const AuthContext = createContext(null);

// 2. Create an AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Mock login function
  const login = (email, password) => {
    // Simulate API call / validation
    console.log('Attempting login with:', email, password);
    if (email && password) { // Simple validation: any non-empty credentials
      const mockUser = {
        name: 'Test User', // Placeholder name
        email: email,
        id: '123',
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      console.log('Login successful:', mockUser);
      return Promise.resolve(mockUser);
    } else {
      console.log('Login failed: Email or password cannot be empty.');
      return Promise.reject(new Error('Login failed: Email or password cannot be empty.'));
    }
  };

  // Mock signup function
  const signup = (name, email, password) => {
    // Simulate API call / user creation
    console.log('Attempting signup with:', name, email, password);
    if (name && email && password) { // Simple validation
      const mockUser = {
        name: name,
        email: email,
        id: `new-${Math.random().toString(36).substr(2, 9)}`, // Generate a random ID
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      console.log('Signup successful:', mockUser);
      return Promise.resolve(mockUser);
    } else {
      console.log('Signup failed: Name, email, or password cannot be empty.');
      return Promise.reject(new Error('Signup failed: Name, email, or password cannot be empty.'));
    }
  };

  // Mock logout function
  const logout = () => {
    console.log('Logging out user:', user);
    setUser(null);
    setIsAuthenticated(false);
    console.log('Logout successful.');
    return Promise.resolve();
  };

  // 3. Provide the authState and functions through the context value
  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// 4. Create a custom hook for easy consumption of the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined || context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export the context itself if needed, though useAuth is preferred
export default AuthContext;
