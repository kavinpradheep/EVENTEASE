// Define the function
const storeUserDetails = (firstName, lastName, email, password) => {
    const userDetails = {
      firstName,
      lastName,
      email,
      password
    };
  
    // Store the user details in localStorage
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  
    console.log('User details saved to localStorage:', userDetails);
  };
  
  // Export the function separately
  export { storeUserDetails };
  