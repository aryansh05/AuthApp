import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";

function Login() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground flex items-center justify-center  animate-in fade-in-0 slide-in-from-bottom-55 duration-1000">
      <Card className="w-full max-w-md border border-border bg-card/60 backdrop-blur-xl shadow-xl">
          <CardHeader className="text-center tracking-tight">
            <CardTitle className="font-bold text-2xl">
              Welcome back
            </CardTitle>
              <CardDescription>
                Enjoy the experience
              </CardDescription>
          </CardHeader>
        <CardContent className="p-6 sm:p-4 flex flex-col gap-6">
          <form className="flex flex-col gap-4">
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
            <Button type="submit" size="lg" className="w-full h-11 rounded-full mt-6">
              Login
            </Button>
          </form>
          <div className="flex flex-col items-center w-full gap-4 py-2">
            <p className="text-sm text-muted-foreground text-right mt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                <span>Signup</span>
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default Login;