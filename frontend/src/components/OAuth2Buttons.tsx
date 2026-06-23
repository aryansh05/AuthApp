import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";

function OAuth2Buttons() {
  return (
    <div className="flex flex-col items-center w-full gap-4 py-2">
        <a 
        href={import.meta.env.VITE_OAUTH_GOOGLE} 
        rel="noopener noreferrer" 
        className="w-full"
        >
        <Button size="lg" type="button" variant="outline" className="w-full h-11 rounded-full">
        <FcGoogle />
        <span>Continue with Google</span>
        </Button>
    </a>
        <a 
        href={import.meta.env.VITE_OAUTH_GITHUB} 
        rel="noopener noreferrer" 
        className="w-full"
        >
        <Button  size="lg" type="button" variant="outline" className="w-full h-11 rounded-full">
        <FaGithub />
        <span>Continue with Github</span>
        </Button>
    </a>
    </div>
  )
}

export default OAuth2Buttons;