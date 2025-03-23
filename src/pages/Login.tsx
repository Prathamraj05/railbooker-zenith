
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, TrainFront, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { adminUser, currentUser } from "@/lib/mockData";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // For demo, we'll use the mock data for authentication
      if (isAdmin) {
        if (email === adminUser.email && password === "admin123") {
          toast.success("Admin login successful");
          navigate("/admin-dashboard");
        } else {
          toast.error("Invalid admin credentials");
        }
      } else {
        if (email === currentUser.email && password === "user123") {
          toast.success("Login successful");
          navigate("/profile");
        } else {
          toast.error("Invalid credentials");
        }
      }
      
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center">
            <TrainFront className="h-8 w-8 text-rail" />
            <span className="ml-2 text-2xl font-bold">RailBooker</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            {isAdmin ? "Admin Login" : "Welcome Back"}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {isAdmin 
              ? "Enter your credentials to access the admin dashboard" 
              : "Please sign in to your account to continue"
            }
          </p>
        </div>
        
        <div className="bg-white shadow-glass rounded-xl p-8 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">Remember me</Label>
              </div>
              <a href="#" className="text-sm font-medium text-rail hover:text-rail-dark">
                Forgot password?
              </a>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-rail hover:bg-rail-dark"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setIsAdmin(!isAdmin)}
              className="text-sm text-gray-600 hover:text-rail flex items-center gap-1"
            >
              <User className="h-4 w-4" />
              {isAdmin ? "User Login" : "Admin Login"}
            </button>
            
            {!isAdmin && (
              <div className="text-sm">
                <span className="text-gray-600">Don't have an account?</span>{" "}
                <Link to="/signup" className="font-medium text-rail hover:text-rail-dark">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-rail">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
