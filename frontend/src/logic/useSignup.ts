import type RegisterData from "@/models/regiserData";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { registerUser } from "@/services/authService";

function useSignup() {
    const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
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
    console.log(data);

    if (data.name.trim() === "") {
      toast.error("Name is required !");
      return;
    }

    if (data.email.trim() === "") {
      toast.error("Email is required !");
      return;
    }

    if (data.password.trim() === "") {
      toast.error("Password is required !");
      return;
    }

    try {
      setLoading(true);
      const result = await registerUser(data);
      console.log(result);
      toast.success("User registered successfully");
      setData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Error in registering the user");
      setError(error)
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
    handleFormSubmit,
    };
}

export default useSignup;