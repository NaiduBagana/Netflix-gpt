export const handleerror = (errorCode,error) => {
  let friendlyMessage = "Sign in failed. Please try again.";

  switch (errorCode) {
    case "auth/user-not-found":
      friendlyMessage = "No account found with this email.";
      break;
    case "auth/wrong-password":
      friendlyMessage = "Incorrect password.";
      break;
    case "auth/invalid-email":
      friendlyMessage = "Invalid email address.";
      break;
    case "auth/user-disabled":
      friendlyMessage = "This account has been disabled.";
      break;
    case "auth/too-many-requests":
      friendlyMessage = "Too many failed attempts. Please try again later.";
      break;
    default:
      friendlyMessage = error.message;
  }
  return friendlyMessage;
};
export const handlerror2 = (errorCode,error)=>{
    let friendlyMessage = "Sign up failed. Please try again.";

   
    switch (errorCode) {
      case "auth/email-already-in-use":
        friendlyMessage = "An account with this email already exists.";
        break;
      case "auth/invalid-email":
        friendlyMessage = "Invalid email address.";
        break;
      case "auth/operation-not-allowed":
        friendlyMessage = "Email/password accounts are not enabled.";
        break;
      case "auth/weak-password":
        friendlyMessage = "Password is too weak.";
        break;
      default:
        friendlyMessage = error.message;
    }
    return friendlyMessage;

}
