import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

function Signup() {
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
        <CardContent className="p-6 sm:p-4 flex flex-col gap-6">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
              id="name"
              type="text"
              placeholder="Your Name"
              required
              />
            </div>
           <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
              id="email"
              type="email"
              placeholder="You@example.com"
              required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
              id="password"
              type="password"
              placeholder="••••••••"
              required
              />
            </div>
            <Button type="submit" size="lg" className="w-full h-11 rounded-full mt-2">
              Signup
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
            <p className="text-sm text-muted-foreground text-right mt-4">
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