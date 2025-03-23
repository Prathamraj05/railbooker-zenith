
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  ChevronRight,
  Download,
  Share,
  Printer,
  ArrowLeft,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import TicketCard from "@/components/TicketCard";
import { Booking, ClassType, Passenger, Train } from "@/lib/types";
import { trains } from "@/lib/mockData";

const TicketView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const pnr = searchParams.get("pnr");
  const trainId = searchParams.get("train");
  const dateString = searchParams.get("date");
  const classTypeParam = searchParams.get("class") as ClassType | null;
  const passengersString = searchParams.get("passengers");
  const fare = searchParams.get("fare") ? parseInt(searchParams.get("fare")!) : 0;
  
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Create booking object
  useEffect(() => {
    if (!pnr || !trainId || !dateString || !classTypeParam || !passengersString || !fare) {
      navigate("/");
      return;
    }
    
    try {
      const parsedPassengers = JSON.parse(passengersString);
      
      // Simulate API call
      setIsLoading(true);
      setTimeout(() => {
        const foundTrain = trains.find(t => t.id === trainId);
        if (foundTrain) {
          const newBooking: Booking = {
            id: `b${Date.now()}`,
            pnr,
            userId: "u1", // From current user (would come from auth)
            train: foundTrain,
            date: dateString,
            classType: classTypeParam,
            passengers: parsedPassengers,
            status: "confirmed",
            fare,
            bookingTime: new Date().toISOString(),
            paymentId: `pay_${Math.random().toString(36).substring(2, 10)}`
          };
          
          setBooking(newBooking);
        } else {
          toast.error("Train information not found");
          navigate("/");
        }
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Invalid booking information");
      navigate("/");
    }
  }, [pnr, trainId, dateString, classTypeParam, passengersString, fare, navigate]);
  
  // Handle download ticket
  const handleDownload = () => {
    toast.success("Ticket download started");
  };
  
  // Share ticket
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Train Ticket - PNR: ${pnr}`,
        text: `My train booking details - PNR: ${pnr}`,
        url: window.location.href
      })
      .then(() => toast.success("Shared successfully"))
      .catch((error) => console.error("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };
  
  // Go to home
  const goToHome = () => {
    navigate("/");
  };
  
  // Go to bookings
  const goToBookings = () => {
    navigate("/profile");
  };
  
  if (isLoading || !booking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24 pb-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-4 mt-8">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Ticket View Container */}
      <div className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <span>Home</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Bookings</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground font-medium">Ticket</span>
          </div>
          
          {/* Success Message */}
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-center mb-8 animate-fade-in">
            <div className="bg-green-100 rounded-full p-2 mr-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="font-semibold text-green-800">Booking Successful!</h2>
              <p className="text-green-700 text-sm">
                Your ticket has been booked successfully. Your PNR number is <span className="font-mono font-medium">{booking.pnr}</span>
              </p>
            </div>
          </div>
          
          {/* Ticket Card */}
          <div className="mb-8">
            <TicketCard booking={booking} />
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Download Ticket
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={handleShare}
            >
              <Share className="h-4 w-4" />
              Share Ticket
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2"
              onClick={() => window.print()}
            >
              <Printer className="h-4 w-4" />
              Print Ticket
            </Button>
          </div>
          
          {/* Navigation Options */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between">
            <Button
              variant="ghost"
              className="flex items-center mb-4 md:mb-0"
              onClick={goToHome}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            
            <Button
              className="bg-rail hover:bg-rail-dark"
              onClick={goToBookings}
            >
              View All Bookings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketView;
