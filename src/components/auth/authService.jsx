const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

/**
 * Register a new user
 * @param {Object} userData - { name, email, password }
 */
export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
};

/**
 * Login an existing user
 * @param {Object} credentials - { email, password }
 */
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
};

/**
 * Google OAuth Sign-In / Sign-Up
 * Sends Google ID token to POST /api/auth/google
 * @param {string} idToken - Google ID token from frontend
 */
export const googleLoginUser = async (idToken) => {
  const response = await fetch(`${API_BASE_URL}/auth/google`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Google Sign-In failed');
  }

  return data;
};

/**
 * Verify OTP for email verification
 * @param {Object} payload - { email, otp }
 */
export const verifyOtpUser = async ({ email, otp }) => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, otp }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'OTP verification failed');
  }

  return data;
};

/**
 * Resend OTP code to user email
 * @param {Object} payload - { email }
 */
export const resendOtpUser = async ({ email }) => {
  const response = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to resend OTP');
  }

  return data;
};



/**
 * Save token and user details to localStorage
 */
export const saveAuthData = ({ token, user }) => {
  if (token) {
    localStorage.setItem('auth_token', token);
  }
  if (user) {
    localStorage.setItem('auth_user', JSON.stringify(user));
  }
};

/**
 * Get stored user from localStorage
 */
export const getStoredUser = () => {
  try {
    const userStr = localStorage.getItem('auth_user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (err) {
    console.error('Error parsing stored user:', err);
    return null;
  }
};

/**
 * Get stored auth token
 */
export const getStoredToken = () => {
  return localStorage.getItem('auth_token');
};

/**
 * Remove token and user details from localStorage
 */
export const clearAuthData = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
};
