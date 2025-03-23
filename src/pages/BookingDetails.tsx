
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Check, 
  ChevronDown, 
  ChevronRight, 
  Plus,
  Trash, 
  User,
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import BookingCard from "@/components/BookingCard";
import { ClassType, Passenger, Train } from "@/lib/types";
import { trains } from "@/lib/mockData";

const BookingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const trainId = searchParams.get("train");
  const dateString = searchParams.get("date");
  const classTypeParam = searchParams.get("class") as ClassType | null;
  
  const [train, setTrain] = useState<Train | null>(null);
  const [date, setDate] = useState(dateString || "");
  const [classType, setClassType] = useState<ClassType | null>(classTypeParam);
  const [passengers, setPassengers] = useState<Passenger[]>([
    { name: "", age: 0, gender: "male" }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Calculate total fare
  const totalFare = train && classType 
    ? train.fare[classType] * passengers.length + Math.round(train.fare[classType] * passengers.length * 0.05)
    : 0;
  
  // Fetch train details
  useEffect(() => {
    if (!trainId || !dateString || !classTypeParam) {
      navigate("/search");
      return;
    }
    
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const foundTrain = trains.find(t => t.id === trainId);
      if (foundTrain) {
        setTrain(foundTrain);
      } else {
        toast.error("Train not found");
        navigate("/search");
      }
      setIsLoading(false);
    }, 1000);
  }, [trainId, dateString, classTypeParam, navigate]);
  
  // Handle passenger details update
  const handlePassengerChange = (index: number, field: keyof Passenger, value: any) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
    
    // Clear error for this field
    if (errors[`passenger_${index}_${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`passenger_${index}_${field}`];
        return newErrors;
      });
    }
  };
  
  // Add new passenger
  const addPassenger = () => {
    if (passengers.length >= 6) {
      toast.error("Maximum 6 passengers allowed per booking");
      return;
    }
    
    setPassengers([...passengers, { name: "", age: 0, gender: "male" }]);
  };
  
  // Remove passenger
  const removePassenger = (index: number) => {
    if (passengers.length === 1) {
      toast.error("At least one passenger is required");
      return;
    }
    
    const updated = [...passengers];
    updated.splice(index, 1);
    setPassengers(updated);
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    passengers.forEach((passenger, index) => {
      if (!passenger.name.trim()) {
        newErrors[`passenger_${index}_name`] = "Name is required";
      }
      
      if (!passenger.age || passenger.age < 1) {
        newErrors[`passenger_${index}_age`] = "Valid age is required";
      }
      
      if (passenger.age > 120) {
        newErrors[`passenger_${index}_age`] = "Age cannot exceed 120";
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleContinue = () => {
    if (!validateForm()) return;
    
    if (!train || !date || !classType) {
      toast.error("Missing required booking information");
      return;
    }
    
    // Navigate to payment page with booking details
    navigate(
      `/payment?train=${trainId}&date=${date}&class=${classType}&passengers=${JSON.stringify(passengers)}`
    );
  };
  
  if (isLoading || !train) {
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
      
      {/* Booking Details Container */}
      <div className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <span>Home</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Search</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground font-medium">Passenger Details</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Passenger Details</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Passenger Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-glass overflow-hidden border border-gray-100 mb-6">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="text-lg font-semibold">
                    Passenger Information
                  </h2>
                </div>
                
                <div className="p-5">
                  {passengers.map((passenger, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "p-4 rounded-lg mb-4",
                        index % 2 === 0 ? "bg-gray-50" : "bg-white border border-gray-100"
                      )}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium flex items-center">
                          <User className="h-4 w-4 mr-2 text-rail" />
                          Passenger {index + 1}
                        </h3>
                        
                        {index > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                            onClick={() => removePassenger(index)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Name */}
                        <div className="space-y-2">
                          <Label htmlFor={`name-${index}`}>
                            Name
                            <span className="text-destructive ml-1">*</span>
                          </Label>
                          <Input
                            id={`name-${index}`}
                            value={passenger.name}
                            onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
                            placeholder="Enter full name"
                            className={cn(
                              errors[`passenger_${index}_name`] && "border-destructive"
                            )}
                          />
                          {errors[`passenger_${index}_name`] && (
                            <p className="text-destructive text-xs mt-1">
                              {errors[`passenger_${index}_name`]}
                            </p>
                          )}
                        </div>
                        
                        {/* Age */}
                        <div className="space-y-2">
                          <Label htmlFor={`age-${index}`}>
                            Age
                            <span className="text-destructive ml-1">*</span>
                          </Label>
                          <Input
                            id={`age-${index}`}
                            type="number"
                            min="1"
                            max="120"
                            value={passenger.age || ""}
                            onChange={(e) => handlePassengerChange(index, "age", parseInt(e.target.value) || 0)}
                            placeholder="Enter age"
                            className={cn(
                              errors[`passenger_${index}_age`] && "border-destructive"
                            )}
                          />
                          {errors[`passenger_${index}_age`] && (
                            <p className="text-destructive text-xs mt-1">
                              {errors[`passenger_${index}_age`]}
                            </p>
                          )}
                        </div>
                        
                        {/* Gender */}
                        <div className="space-y-2">
                          <Label htmlFor={`gender-${index}`}>
                            Gender
                            <span className="text-destructive ml-1">*</span>
                          </Label>
                          <select
                            id={`gender-${index}`}
                            value={passenger.gender}
                            onChange={(e) => handlePassengerChange(index, "gender", e.target.value as any)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-rail focus:ring-rail sm:text-sm"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        {/* Berth Preference */}
                        <div className="space-y-2">
                          <Label htmlFor={`berth-${index}`}>
                            Berth Preference
                          </Label>
                          <select
                            id={`berth-${index}`}
                            value={passenger.berth || ""}
                            onChange={(e) => handlePassengerChange(index, "berth", e.target.value as any || undefined)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-rail focus:ring-rail sm:text-sm"
                          >
                            <option value="">No preference</option>
                            <option value="lower">Lower</option>
                            <option value="middle">Middle</option>
                            <option value="upper">Upper</option>
                            <option value="side-lower">Side Lower</option>
                            <option value="side-upper">Side Upper</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add Passenger Button */}
                  <Button
                    variant="outline"
                    className="w-full mt-2 border-dashed"
                    onClick={addPassenger}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Passenger
                  </Button>
                </div>
              </div>
              
              {/* Continue Button */}
              <div className="flex justify-end">
                <Button
                  className="bg-rail hover:bg-rail-dark"
                  onClick={handleContinue}
                >
                  Continue to Payment
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Booking Summary */}
            <div className="lg:col-span-1">
              {train && date && classType && (
                <BookingCard
                  train={train}
                  date={date}
                  classType={classType}
                  passengers={passengers}
                  totalFare={totalFare}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for conditional class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export default BookingDetails;
