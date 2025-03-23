
import { ClassType, Passenger, Train } from "@/lib/types";
import { getClassTypeLabel } from "@/lib/mockData";
import { format } from "date-fns";
import { ArrowRight, Calendar, Clock, Train as TrainIcon, Users } from "lucide-react";

interface BookingCardProps {
  train: Train;
  date: string;
  classType: ClassType;
  passengers: Passenger[];
  totalFare: number;
}

const BookingCard = ({ train, date, classType, passengers, totalFare }: BookingCardProps) => {
  // Format time to 12-hour format
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour, 10);
    const period = hourNum >= 12 ? "PM" : "AM";
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${period}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "EEE, dd MMM yyyy");
  };

  return (
    <div className="bg-white rounded-xl shadow-glass overflow-hidden border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold">Booking Summary</h3>
      </div>
      
      <div className="p-5">
        <div className="space-y-6">
          {/* Train Details */}
          <div>
            <div className="flex items-center mb-2">
              <TrainIcon className="w-5 h-5 text-rail mr-2" />
              <h4 className="font-medium">{train.name} ({train.number})</h4>
            </div>
            
            <div className="flex items-center gap-4 mt-3">
              <div>
                <p className="text-lg font-bold">{formatTime(train.departureTime)}</p>
                <p className="text-xs text-muted-foreground">{train.from.code}</p>
                <p className="text-xs text-muted-foreground">{train.from.city}</p>
              </div>
              
              <div className="flex-1 flex flex-col items-center px-2">
                <div className="relative w-full flex items-center justify-center">
                  <div className="absolute left-0 right-0 h-[1px] bg-gray-200"></div>
                  <div className="absolute left-0 w-2 h-2 rounded-full bg-gray-300"></div>
                  <ArrowRight className="relative z-10 text-gray-400 mx-2 bg-white" />
                  <div className="absolute right-0 w-2 h-2 rounded-full bg-rail"></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{train.duration}</p>
              </div>
              
              <div>
                <p className="text-lg font-bold">{formatTime(train.arrivalTime)}</p>
                <p className="text-xs text-muted-foreground">{train.to.code}</p>
                <p className="text-xs text-muted-foreground">{train.to.city}</p>
              </div>
            </div>
          </div>
          
          {/* Journey Details */}
          <div className="space-y-3">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-rail mr-2" />
              <div>
                <p className="text-sm font-medium">Date of Journey</p>
                <p className="text-muted-foreground text-sm">{formatDate(date)}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-rail mr-2" />
              <div>
                <p className="text-sm font-medium">Class</p>
                <p className="text-muted-foreground text-sm">{getClassTypeLabel(classType)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Users className="w-4 h-4 text-rail mr-2 mt-1" />
              <div>
                <p className="text-sm font-medium">Passengers</p>
                <div className="text-muted-foreground text-sm">
                  {passengers.length} {passengers.length === 1 ? 'passenger' : 'passengers'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Fare Details */}
          <div className="space-y-2 border-t border-gray-100 pt-4 mt-4">
            <div className="flex justify-between text-sm">
              <span>Base Fare</span>
              <span>₹{train.fare[classType]} × {passengers.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>GST & Charges</span>
              <span>₹{Math.round(totalFare * 0.05)}</span>
            </div>
            <div className="flex justify-between font-semibold text-base border-t border-gray-100 pt-2 mt-2">
              <span>Total Amount</span>
              <span>₹{totalFare}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
