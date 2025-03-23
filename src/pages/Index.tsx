
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import { ArrowRight, Calendar, Clock, MapPin, Shield, Star, TrainFront, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Destinations */}
      <FeaturedDestinations />
      
      {/* Features Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Book with RailBooker
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience the best way to book your train tickets with our intuitive platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-glass hover:shadow-glass-hover transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-rail/10 flex items-center justify-center group-hover:bg-rail/20 transition-colors">
                <Ticket className="w-8 h-8 text-rail" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Hassle-Free Booking</h3>
              <p className="text-muted-foreground">
                Book your tickets in just a few clicks with our simple and intuitive interface
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-glass hover:shadow-glass-hover transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-rail/10 flex items-center justify-center group-hover:bg-rail/20 transition-colors">
                <Shield className="w-8 h-8 text-rail" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
              <p className="text-muted-foreground">
                Your payment information is always safe with our secure payment gateway
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-glass hover:shadow-glass-hover transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-rail/10 flex items-center justify-center group-hover:bg-rail/20 transition-colors">
                <Clock className="w-8 h-8 text-rail" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Updates</h3>
              <p className="text-muted-foreground">
                Get instant notifications about your booking status and journey updates
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-16 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rail-dark via-rail to-rail-light opacity-95 z-0"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-white/90 text-lg mb-6">
                Book your train tickets now and experience the comfort and convenience of RailBooker.
              </p>
              <Link to="/search">
                <Button 
                  size="lg" 
                  className="bg-white text-rail hover:bg-gray-100 font-medium"
                >
                  Find Trains 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-full animate-pulse-slow"></div>
                <TrainFront className="w-24 h-24 md:w-32 md:h-32 text-white relative z-10 animate-floating" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-4 md:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TrainFront className="h-6 w-6 text-rail" />
                <span className="text-xl font-semibold text-foreground">RailBooker</span>
              </div>
              <p className="text-muted-foreground">
                Book your train journey with ease and comfort.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-muted-foreground hover:text-rail">Home</Link></li>
                <li><Link to="/search" className="text-muted-foreground hover:text-rail">Find Trains</Link></li>
                <li><Link to="/profile" className="text-muted-foreground hover:text-rail">My Bookings</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-rail">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-rail">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-rail">FAQs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-rail">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-rail">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-rail">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} RailBooker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
