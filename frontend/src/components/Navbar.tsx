import { Link } from "react-router";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import useNavbar from "@/logic/useNavbar";

function Navbar() {

  const { isDark, toggleTheme, checkLogin, user, logout, navigate } = useNavbar();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/50 backdrop-blur-md shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="transition-all duration-300 hover:-translate-y-2 hover:shadow-md rounded-md">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-zinc-500 to-zinc-300 border border-zinc-700/50 p-2 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img 
                src="/lock.png" 
                alt="Lock Logo" 
                className="h-full w-full object-contain" 
              />
            </span>
            AuthApp
          </Link>
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          {
            checkLogin() ?
            (
            <div className="flex flex-row items-center justify-center gap-4">
            <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link to="/dashboard/profile" className="text-sm tracking-tight">
              {user?.name}
            </Link>
              <Button onClick={
                () => {
                  logout();
                  navigate("/login");
                }
              } size="lg" variant="outline">
                Logout
              </Button>
            </div>
            ) 
            :
            (
            <div className="flex flex-row items-center justify-center gap-4">
            <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
            >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
            
            <Link to="/signup">
              <Button size="lg">
                Signup
              </Button>
            </Link>
            </div>
            )

          }
        </div>
      </div>
    </header>
  )
}

export default Navbar;