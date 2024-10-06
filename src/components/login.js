import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = "1051622212201-vgnvmtvfqjgi5ot3vsqp0rmsnd71uf02.apps.googleusercontent.com";

function Login() {

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user:", res.profileObj);
    // You can handle the response, send to your backend, or navigate the user here
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED! res:", res);
    // Handle failure scenarios here
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}

export default login;