
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowLeft,
  ChevronRight, 
  CreditCard, 
  Lock, 
  Smartphone,
  BuildingBank,
  Wallet,
  Calendar,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import BookingCard from "@/components/BookingCard";
import { ClassType, Passenger, Train } from "@/lib/types";
import { trains, paymentMethods } from "@/lib/mockData";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const trainId = searchParams.get("train");
  const dateString = searchParams.get("date");
  const classTypeParam = searchParams.get("class") as ClassType | null;
  const passengersString = searchParams.get("passengers");
  
  const [train, setTrain] = useState<Train | null>(null);
  const [date, setDate] = useState(dateString || "");
  const [classType, setClassType] = useState<ClassType | null>(classTypeParam);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Payment method state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [upiId, setUpiId] = useState("");
  
  // Calculate total fare
  const totalFare = train && classType 
    ? train.fare[classType] * passengers.length + Math.round(train.fare[classType] * passengers.length * 0.05)
    : 0;
  
  // Fetch train details and parse passengers
  useEffect(() => {
    if (!trainId || !dateString || !classTypeParam || !passengersString) {
      navigate("/search");
      return;
    }
    
    try {
      const parsedPassengers = JSON.parse(passengersString);
      setPassengers(parsedPassengers);
    } catch (error) {
      toast.error("Invalid passenger information");
      navigate("/search");
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
  }, [trainId, dateString, classTypeParam, passengersString, navigate]);
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };
  
  // Format card expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };
  
  // Handle card number change
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatCardNumber(value);
    
    if (formattedValue.length <= 19) {
      setCardNumber(formattedValue);
    }
  };
  
  // Handle expiry date change
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatExpiryDate(value);
    
    if (formattedValue.length <= 5) {
      setCardExpiry(formattedValue);
    }
  };
  
  // Handle CVV change
  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    
    if (value.length <= 3) {
      setCardCVV(value);
    }
  };
  
  // Validate payment form
  const validatePaymentForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (selectedPaymentMethod === "card") {
      if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
        newErrors.cardNumber = "Valid card number is required";
      }
      
      if (!cardName) {
        newErrors.cardName = "Name on card is required";
      }
      
      if (!cardExpiry || !cardExpiry.includes("/")) {
        newErrors.cardExpiry = "Valid expiry date is required (MM/YY)";
      }
      
      if (!cardCVV || cardCVV.length < 3) {
        newErrors.cardCVV = "Valid CVV is required";
      }
    } else if (selectedPaymentMethod === "upi") {
      if (!upiId || !upiId.includes("@")) {
        newErrors.upiId = "Valid UPI ID is required (e.g., name@upi)";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle payment submission
  const handlePayment = () => {
    if (!validatePaymentForm()) return;
    
    if (!train || !date || !classType || passengers.length === 0) {
      toast.error("Missing required booking information");
      return;
    }
    
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Generate random PNR
      const pnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      
      // Navigate to ticket view with booking details
      navigate(
        `/ticket?pnr=${pnr}&train=${trainId}&date=${date}&class=${classType}&passengers=${passengersString}&fare=${totalFare}`
      );
      
      setProcessingPayment(false);
    }, 2000);
  };
  
  // Go back to passenger details
  const goBack = () => {
    navigate(
      `/booking?train=${trainId}&date=${date}&class=${classType}`
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
      
      {/* Payment Container */}
      <div className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <span>Home</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Search</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Passenger Details</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground font-medium">Payment</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Payment</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-glass overflow-hidden border border-gray-100 mb-6">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="text-lg font-semibold flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-rail" />
                    Secure Payment
                  </h2>
                </div>
                
                <div className="p-5">
                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Payment Method
                    </label>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          className={cn(
                            "flex flex-col items-center justify-center p-4 rounded-lg border transition-all",
                            selectedPaymentMethod === method.type
                              ? "border-rail bg-rail/5"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                          onClick={() => setSelectedPaymentMethod(method.type)}
                        >
                          {method.type === "card" && <CreditCard className="h-6 w-6 mb-2" />}
                          {method.type === "upi" && <Smartphone className="h-6 w-6 mb-2" />}
                          {method.type === "netbanking" && <BuildingBank className="h-6 w-6 mb-2" />}
                          {method.type === "wallet" && <Wallet className="h-6 w-6 mb-2" />}
                          <span className="text-sm">{method.name}</span>
                          
                          {selectedPaymentMethod === method.type && (
                            <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-rail flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Credit/Debit Card Form */}
                  {selectedPaymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">
                          Card Number
                          <span className="text-destructive ml-1">*</span>
                        </Label>
                        <div className="relative mt-1">
                          <Input
                            id="cardNumber"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="1234 5678 9012 3456"
                            className={cn(
                              errors.cardNumber && "border-destructive"
                            )}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="flex space-x-1">
                              <img src="https://raw.githubusercontent.com/tailwindlabs/tailwindui-icons/main/solid/credit-card.svg" 
                                alt="Card" 
                                className="h-5 w-5 text-gray-400" 
                              />
                            </div>
                          </div>
                        </div>
                        {errors.cardNumber && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="cardName">
                          Name on Card
                          <span className="text-destructive ml-1">*</span>
                        </Label>
                        <Input
                          id="cardName"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="John Doe"
                          className={cn(
                            errors.cardName && "border-destructive"
                          )}
                        />
                        {errors.cardName && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.cardName}
                          </p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">
                            Expiry Date
                            <span className="text-destructive ml-1">*</span>
                          </Label>
                          <div className="relative mt-1">
                            <Input
                              id="expiryDate"
                              value={cardExpiry}
                              onChange={handleExpiryChange}
                              placeholder="MM/YY"
                              className={cn(
                                errors.cardExpiry && "border-destructive"
                              )}
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                          {errors.cardExpiry && (
                            <p className="text-destructive text-xs mt-1">
                              {errors.cardExpiry}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="cvv">
                            CVV
                            <span className="text-destructive ml-1">*</span>
                          </Label>
                          <Input
                            id="cvv"
                            type="password"
                            value={cardCVV}
                            onChange={handleCVVChange}
                            placeholder="123"
                            className={cn(
                              errors.cardCVV && "border-destructive"
                            )}
                          />
                          {errors.cardCVV && (
                            <p className="text-destructive text-xs mt-1">
                              {errors.cardCVV}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* UPI Form */}
                  {selectedPaymentMethod === "upi" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="upiId">
                          UPI ID
                          <span className="text-destructive ml-1">*</span>
                        </Label>
                        <div className="relative mt-1">
                          <Input
                            id="upiId"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="yourname@upi"
                            className={cn(
                              errors.upiId && "border-destructive"
                            )}
                          />
                          <Smartphone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                        {errors.upiId && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.upiId}
                          </p>
                        )}
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800">
                        <p>You will receive a payment request on your UPI app. Please approve it to complete the payment.</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Net Banking */}
                  {selectedPaymentMethod === "netbanking" && (
                    <div className="space-y-4">
                      <p className="text-center text-gray-600">
                        This is a demonstration. In a real application, you would select your bank and be redirected to the bank's login page.
                      </p>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Popular Banks</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank"].map((bank) => (
                            <button
                              key={bank}
                              type="button"
                              className="flex items-center p-2 rounded-md border border-gray-200 hover:border-gray-300"
                            >
                              <BuildingBank className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm">{bank}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Mobile Wallets */}
                  {selectedPaymentMethod === "wallet" && (
                    <div className="space-y-4">
                      <p className="text-center text-gray-600">
                        This is a demonstration. In a real application, you would select your wallet provider and complete the payment.
                      </p>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Popular Wallets</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {["Paytm", "PhonePe", "Amazon Pay", "Google Pay"].map((wallet) => (
                            <button
                              key={wallet}
                              type="button"
                              className="flex items-center p-2 rounded-md border border-gray-200 hover:border-gray-300"
                            >
                              <Wallet className="h-4 w-4 mr-2 text-gray-500" />
                              <span className="text-sm">{wallet}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Secure Payment Message */}
                  <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Your payment information is secure. We use encryption to protect your data.
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={goBack}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                
                <Button
                  className="bg-rail hover:bg-rail-dark"
                  onClick={handlePayment}
                  disabled={processingPayment}
                >
                  {processingPayment ? "Processing..." : `Pay ₹${totalFare}`}
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

export default Payment;
