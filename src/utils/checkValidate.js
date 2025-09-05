// utils/validate.js

export const checkValidate = (
  email,
  password,
  isSignIn,
  firstName = "",
  lastName = "",
  confirmPassword = ""
) => {
  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Password validation regex (at least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character)
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Name validation regex (only letters and spaces, at least 2 characters)
  const nameRegex = /^[A-Za-z\s]{2,}$/;

  // Check email
  if (!email) {
    return "Email is required";
  }

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  // Check password
  if (!password) {
    return "Password is required";
  }

  if (!passwordRegex.test(password)) {
    return "Password must be at least 8 characters with uppercase, lowercase, number and special character";
  }

  // Additional validations for Sign Up
  if (!isSignIn) {
    // Check first name
    if (!firstName) {
      return "First name is required";
    }

    if (!nameRegex.test(firstName)) {
      return "First name must contain only letters and be at least 2 characters";
    }

    // Check last name
    if (!lastName) {
      return "Last name is required";
    }

    if (!nameRegex.test(lastName)) {
      return "Last name must contain only letters and be at least 2 characters";
    }

    // Check confirm password
    if (!confirmPassword) {
      return "Please confirm your password";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
  }

  // If all validations pass
  return null;
};
