import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {Shield, Lock, Key} from "lucide-react";

function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <section className="flex flex-col items-start text-left animate-in fade-in-0 slide-in-from-left-55 duration-1000">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        Authentication
                        <span className="block text-muted-foreground">
                            done beautifully.
                        </span>
                    </h1>
                    <p className="mt-6 max-w-lg text-base sm:text-lg text-muted-foreground">
                        Secure sign-in, seamless registration, and protected user
                        experiences with a modern authentication workflow.
                    </p>
                    <div className="mt-10 w-full flex flex-row gap-4">
                        <Link to="./signup" className="w-auto">
                            <Button size="lg">
                                Get Started
                            </Button>
                        </Link>
                        <a 
                        href={import.meta.env.VITE_BACKEND_API_DOCS_URL} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-auto"
                        >
                        <Button size="lg" variant="outline">
                            API Doc
                        </Button>
                        </a>
                    </div>
                </section>

                <section className="flex flex-col gap-6 animate-in fade-in-0 slide-in-from-right-55 duration-1000">
                    
                    <Card className="border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
                    <CardContent className="p-5 sm:p-6 flex gap-4 items-start">
                        <Lock className="mt-1 h-6 w-6 shrink-0 text-muted-foreground" />
                        <div>
                        <h3 className="mb-1 text-lg font-bold text-foreground">JWT Authentication</h3>
                        <p className="text-sm text-muted-foreground">
                            Secure stateless authentication using access tokens, refresh tokens, and HttpOnly cookies.
                        </p>
                        </div>
                    </CardContent>
                    </Card>

                    <Card className="border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
                    <CardContent className="p-5 sm:p-6 flex gap-4 items-start">
                        <Shield className="mt-1 h-6 w-6 shrink-0 text-muted-foreground" />
                        <div>
                        <h3 className="mb-1 text-lg font-bold text-foreground">Role-Based Access</h3>
                        <p className="text-sm text-muted-foreground">
                            Fine-grained authorization with roles and protected resources to ensure secure access.
                        </p>
                        </div>
                    </CardContent>
                    </Card>

                    <Card className="border border-border bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
                    <CardContent className="p-5 sm:p-6 flex gap-4 items-start">
                        <Key className="mt-1 h-6 w-6 shrink-0 text-muted-foreground" />
                        <div>
                        <h3 className="mb-1 text-lg font-bold text-foreground">Access Control</h3>
                        <p className="text-sm text-muted-foreground">
                            Control permissions and restrict sensitive operations with secure, configurable access policies.
                        </p>
                        </div>
                    </CardContent>
                    </Card>

                </section>
            </div>

            <div className="mt-10 border-t border-border pt-10 text-center">
                <section className="flex flex-col items-center justify-center text-center animate-in fade-in-0 slide-in-from-bottom-55 duration-1000">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-foreground">
                        Ready to get started?
                    </h2>

                    <p className="mt-4 max-w-md text-sm sm:text-base text-muted-foreground">
                        Create an account today and experience a modern, secure, and incredibly fast authentication workflow.
                    </p>
                    <Link to="/signup" className="mt-8">
                        <Button size="lg">
                            Create Account
                        </Button>
                    </Link>
                </section>
            </div>
        </div>
    </main>
  )
}

export default Home;