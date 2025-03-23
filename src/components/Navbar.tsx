
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Train, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Check if path is active
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle scroll event to add background to navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-8",
      {
        "py-4 bg-transparent": !isScrolled && location.pathname === "/",
        "py-2 bg-white/80 backdrop-blur-md shadow-sm": isScrolled || location.pathname !== "/"
      }
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <Train className={cn(
            "h-6 w-6 transition-colors",
            isScrolled || location.pathname !== "/" ? "text-rail" : "text-white"
          )} />
          <span className={cn(
            "text-xl font-semibold transition-colors",
            isScrolled || location.pathname !== "/" ? "text-foreground" : "text-white"
          )}>
            RailBooker
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-colors",
              isActivePath("/") 
                ? (isScrolled || location.pathname !== "/" ? "text-rail" : "text-white font-semibold") 
                : (isScrolled || location.pathname !== "/" ? "text-foreground hover:text-rail" : "text-white/90 hover:text-white")
            )}
          >
            Home
          </Link>
          <Link 
            to="/search" 
            className={cn(
              "text-sm font-medium transition-colors",
              isActivePath("/search") 
                ? (isScrolled || location.pathname !== "/" ? "text-rail" : "text-white font-semibold") 
                : (isScrolled || location.pathname !== "/" ? "text-foreground hover:text-rail" : "text-white/90 hover:text-white")
            )}
          >
            Find Trains
          </Link>
          <Link 
            to="/profile" 
            className={cn(
              "text-sm font-medium transition-colors",
              isActivePath("/profile") 
                ? (isScrolled || location.pathname !== "/" ? "text-rail" : "text-white font-semibold") 
                : (isScrolled || location.pathname !== "/" ? "text-foreground hover:text-rail" : "text-white/90 hover:text-white")
            )}
          >
            My Bookings
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button 
              variant="ghost" 
              className={cn(
                "transition-colors",
                isScrolled || location.pathname !== "/" 
                  ? "text-foreground hover:text-rail hover:bg-rail/10" 
                  : "text-white hover:bg-white/20"
              )}
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button 
              variant={isScrolled || location.pathname !== "/" ? "default" : "outline"} 
              className={cn(
                "transition-all",
                isScrolled || location.pathname !== "/" 
                  ? "bg-rail hover:bg-rail-dark" 
                  : "bg-transparent text-white border-white hover:bg-white hover:text-foreground"
              )}
            >
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden"
        >
          {isMenuOpen ? (
            <X className={cn(
              "w-6 h-6",
              isScrolled || location.pathname !== "/" ? "text-foreground" : "text-white"
            )} />
          ) : (
            <Menu className={cn(
              "w-6 h-6",
              isScrolled || location.pathname !== "/" ? "text-foreground" : "text-white"
            )} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-x-0 top-[60px] bg-white shadow-lg p-4 z-40 border-t transition-all duration-300 ease-in-out transform md:hidden",
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        <nav className="flex flex-col space-y-4">
          <Link 
            to="/" 
            className={cn(
              "text-foreground hover:text-rail py-2 transition-colors text-center text-lg",
              isActivePath("/") && "text-rail font-semibold"
            )}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/search" 
            className={cn(
              "text-foreground hover:text-rail py-2 transition-colors text-center text-lg",
              isActivePath("/search") && "text-rail font-semibold"
            )}
            onClick={closeMenu}
          >
            Find Trains
          </Link>
          <Link 
            to="/profile" 
            className={cn(
              "text-foreground hover:text-rail py-2 transition-colors text-center text-lg",
              isActivePath("/profile") && "text-rail font-semibold"
            )}
            onClick={closeMenu}
          >
            My Bookings
          </Link>
          <div className="flex flex-col space-y-2 pt-4 border-t">
            <Link to="/login" onClick={closeMenu}>
              <Button 
                variant="outline" 
                className="w-full"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup" onClick={closeMenu}>
              <Button 
                variant="default" 
                className="w-full bg-rail hover:bg-rail-dark"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
