import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Mail, User, LockKeyhole, EyeOff, Eye } from "lucide-react";
import useSignup from "@/logic/useSignup";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { ErrorIcon } from "react-hot-toast";

function Signup() {

  const { data, error, loading, showPassword, togglePasswordVisibility, handleInputChange, handleFormSubmit } = useSignup()

  return (
    <main className="min-h-screen w-full bg-background text-foreground flex items-center justify-center  animate-in fade-in-0 slide-in-from-bottom-55 duration-1000">
      <Card className="w-full max-w-md border border-border bg-card/60 backdrop-blur-xl shadow-xl">
          <CardHeader className="text-center tracking-tight">
            <CardTitle className="font-bold text-2xl">
              Create your account
            </CardTitle>
              <CardDescription>
                Join the app to experience true authentication.
              </CardDescription>
          </CardHeader>

      {error && (
        <div className="px-6">
          <Alert variant="destructive" className="flex items-center justify-center w-full">
           <ErrorIcon className="h-4 w-4 shrink-0" />
            <AlertTitle>
              {error?.response?.data?.message || error?.message || "Error in registering the user"}
            </AlertTitle>
          </Alert>
        </div>
        )}
        <CardContent className="p-6 sm:p-4 flex flex-col gap-6">
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative w-full">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input 
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={data.name}
                  onChange={handleInputChange}
                  required
                  className="pl-10 h-11"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative w-full">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input 
                  id="email"
                  type="email"
                  placeholder="You@example.com"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                  required
                  className="pl-10 h-11"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative w-full">
                <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  name="password"
                  value={data.password}
                  onChange={handleInputChange}
                  required
                  className="pl-10 h-11"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <Button disabled={loading} type="submit" size="lg" className="w-full h-11 rounded-full mt-2">
             {loading
              ? (
                <span className="flex flex-row gap-2 text-muted-foreground">
                  <Spinner className="h-5 w-5"/>
                  Please wait..
                </span>
              ) : (
                <span>
                  Signup
                </span>
              )
              }
            </Button>
          </form>
          <div className="flex py-2 items-center">
            <div className="grow border-t border-border"></div>
            <span className="shrink mx-4 text-xs uppercase text-muted-foreground tracking-wider">Or</span>
            <div className="grow border-t border-border"></div>
          </div>
          <div className="flex flex-col items-center w-full gap-4 py-2">
            <Link to="/google" className="w-full">
              <Button size="lg" variant="outline" className="w-full h-11 rounded-full">
                <FcGoogle />
                <span>Continue with Google</span>
              </Button>
            </Link>
            <Link to="/github" className="w-full">
              <Button  size="lg" variant="outline" className="w-full h-11 rounded-full">
                <FaGithub />
                <span>Continue with Github</span>
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                <span>Login</span>
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default Signup;