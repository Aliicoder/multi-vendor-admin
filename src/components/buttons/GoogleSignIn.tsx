import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "@/store/Reducers/authReducer";
import { useGoogleLoginMutation } from "@/store/apiSlices/authSlice";
import { ReactNode } from "react";
import { errorToast } from "@/lib/utils";

interface GoogleAuthProviderProps {
  children: ReactNode;
}

export const GoogleSignInButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [googleLogin] = useGoogleLoginMutation();
  const location = useLocation();
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const { credential } = credentialResponse;

      if (!credential) {
        throw new Error("No credential received from Google");
      }

      const response = await googleLogin({ token: credential }).unwrap();
      dispatch(setCredentials(response.user));
      navigate(location?.state?.from || "/");
    } catch (error: any) {
      errorToast(error.data.message);
    }
  };

  const handleError = () => {
    console.log("Google login failed");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap
      text="continue_with" // or "signin_with" depending on your preference
      shape="rectangular" // or "pill", "circle"
      theme="filled_blue" // or "outline", "filled_black"
    />
  );
};

export const GoogleAuthProvider: React.FC<GoogleAuthProviderProps> = ({
  children,
}) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};
