import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/quiz");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <button
        onClick={loginWithGoogle}
        className="bg-blue-500 p-4 rounded-lg hover:bg-blue-600"
      >
        Sign in with Google
      </button>
    </div>
  );
}
