import { useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowLeft, 
  Building, 
  Check, 
  ChevronRight, 
  CreditCard, 
  Shield, 
  Smartphone 
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PaymentMethod } from "@/lib/types";
import { paymentMethods } from "@/lib/mockData";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const trainId = searchParams.get("train");
  const dateString = searchParams.get("date");
  const classTypeParam = searchParams.get("class");
  const passengersString = searchParams.get("passengers");
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  
  useEffect(() => {
    if (selectedPaymentMethod) {
      setTimeout(() => {
        setPaymentSuccessful(true);
      }, 2000);
    } else {
      setPaymentSuccessful(false);
    }
  }, [selectedPaymentMethod]);
  
  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };
  
  const handleContinueToTicket = () => {
    if (!trainId || !dateString || !classTypeParam || !passengersString) {
      toast.error("Missing booking information");
      navigate("/search");
      return;
    }
    
    const pnr = `PNR${Math.floor(Math.random() * 1000000)}`;
    const fare = 1200;
    
    navigate(
      `/ticket?pnr=${pnr}&train=${trainId}&date=${dateString}&class=${classTypeParam}&passengers=${passengersString}&fare=${fare}`
    );
  };
  
  const goToBookingDetails = () => {
    navigate(`/booking?train=${trainId}&date=${dateString}&class=${classTypeParam}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <span>Home</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Search</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>Passenger Details</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-foreground font-medium">Payment</span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Payment</h1>
          
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Choose a payment method</CardTitle>
              <CardDescription>
                Select your preferred payment method to proceed
              </CardDescription>
            </CardHeader>
            
            <CardContent className="grid gap-6">
              <RadioGroup onValueChange={handlePaymentMethodSelect}>
                {paymentMethods.map((method: PaymentMethod) => (
                  <div key={method.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={method.id} id={method.id} className="peer shrink-0 h-5 w-5 border rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-70" />
                    <Label htmlFor={method.id} className="cursor-pointer peer-checked:text-foreground">
                      <div className="flex items-center">
                        {method.icon && (
                          <span className="mr-2">{method.icon}</span>
                        )}
                        <span>{method.name}</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              {selectedPaymentMethod && (
                <div className="border rounded-md p-4 bg-gray-50">
                  <h3 className="text-lg font-semibold mb-2">
                    {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                  </h3>
                  
                  {selectedPaymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input type="text" id="cardNumber" placeholder="Enter card number" />
                      </div>
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input type="text" id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input type="text" id="cvv" placeholder="CVV" />
                      </div>
                    </div>
                  )}
                  
                  {selectedPaymentMethod === "upi" && (
                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input type="text" id="upiId" placeholder="Enter UPI ID" />
                    </div>
                  )}
                  
                  {selectedPaymentMethod === "netbanking" && (
                    <div>
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input type="text" id="bankName" placeholder="Enter Bank Name" />
                    </div>
                  )}
                  
                  {selectedPaymentMethod === "wallet" && (
                    <div>
                      <Label htmlFor="walletNumber">Wallet Number</Label>
                      <Input type="text" id="walletNumber" placeholder="Enter Wallet Number" />
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-end">
              <Button 
                className="bg-rail hover:bg-rail-dark disabled:bg-gray-300"
                disabled={!selectedPaymentMethod || paymentSuccessful}
                onClick={handleContinueToTicket}
              >
                {paymentSuccessful ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Payment Successful!
                  </>
                ) : (
                  "Pay Now"
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <Button
            variant="ghost"
            className="mt-4 flex items-center"
            onClick={goToBookingDetails}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Booking Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
