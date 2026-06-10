import type LoginData from "@/models/LoginData";
import { loginUser } from "@/services/AuthService";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function useLogin() {
    const[data, setData] = useState<LoginData>({
        email:"",
        password: ""
    })
    const[loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    };
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData((value) => ({
        ...value,
        [event.target.name]: event.target.value,
        }));
    };

  const handleFormSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    if (data.email.trim() === "") {
      toast.error("Input required");
      return;
    }
    if (data.password.trim() === "") {
      toast.error("Input required");
      return;
    }

    try {
      setLoading(true);
      const userInfo = await loginUser(data);
      toast.success("Login success");
      console.log(userInfo)
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
      toast.error("Error in login the user");
      setError(error);
    }finally{
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    showPassword,
    togglePasswordVisibility,
    handleInputChange,
    handleFormSubmit
  };
}

export default useLogin;