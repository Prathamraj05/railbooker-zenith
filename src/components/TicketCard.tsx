
import { useState, useRef } from "react";
import { ArrowRight, Calendar, ClipboardCheck, Clock, Download, Train as TrainIcon, Users } from "lucide-react";
import { Booking } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { getClassTypeLabel } from "@/lib/mockData";
import { format } from "date-fns";
import { toast } from "sonner";

interface TicketCardProps {
  booking: Booking;
  showActions?: boolean;
}

const TicketCard = ({ booking, showActions = true }: TicketCardProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);
  
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

  // Copy PNR to clipboard
  const handleCopyPNR = () => {
    navigator.clipboard.writeText(booking.pnr);
    setIsCopied(true);
    toast.success("PNR copied to clipboard");
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Download ticket
  const handleDownload = () => {
    // This would be replaced with actual ticket PDF download functionality
    toast.success("Ticket download started");
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-glass">
      <div className="bg-gradient-to-r from-rail to-rail-light p-4 text-white">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">E-Ticket</h3>
          <div className="flex gap-2 items-center text-sm">
            <span>PNR:</span>
            <span className="font-mono font-medium">{booking.pnr}</span>
            <button
              onClick={handleCopyPNR}
              className="ml-1 p-1 rounded hover:bg-white/20 transition-colors"
              aria-label="Copy PNR"
            >
              <ClipboardCheck className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div ref={ticketRef} className="p-5">
        <div className="space-y-6">
          {/* Train Details */}
          <div>
            <div className="flex items-center mb-2">
              <TrainIcon className="w-5 h-5 text-rail mr-2" />
              <h4 className="font-medium">{booking.train.name} ({booking.train.number})</h4>
            </div>
            
            <div className="flex items-center gap-4 mt-3">
              <div>
                <p className="text-lg font-bold">{formatTime(booking.train.departureTime)}</p>
                <p className="text-xs text-muted-foreground">{booking.train.from.code}</p>
                <p className="text-xs text-muted-foreground">{booking.train.from.city}</p>
              </div>
              
              <div className="flex-1 flex flex-col items-center px-2">
                <div className="relative w-full flex items-center justify-center">
                  <div className="absolute left-0 right-0 h-[1px] bg-gray-200"></div>
                  <div className="absolute left-0 w-2 h-2 rounded-full bg-gray-300"></div>
                  <ArrowRight className="relative z-10 text-gray-400 mx-2 bg-white" />
                  <div className="absolute right-0 w-2 h-2 rounded-full bg-rail"></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{booking.train.duration}</p>
              </div>
              
              <div>
                <p className="text-lg font-bold">{formatTime(booking.train.arrivalTime)}</p>
                <p className="text-xs text-muted-foreground">{booking.train.to.code}</p>
                <p className="text-xs text-muted-foreground">{booking.train.to.city}</p>
              </div>
            </div>
          </div>
          
          {/* Journey Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-rail mr-2" />
              <div>
                <p className="text-sm font-medium">Date of Journey</p>
                <p className="text-muted-foreground text-sm">{formatDate(booking.date)}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-rail mr-2" />
              <div>
                <p className="text-sm font-medium">Class</p>
                <p className="text-muted-foreground text-sm">{getClassTypeLabel(booking.classType)}</p>
              </div>
            </div>
          </div>
          
          {/* Passenger Details */}
          <div>
            <div className="flex items-center mb-3">
              <Users className="w-4 h-4 text-rail mr-2" />
              <p className="text-sm font-medium">Passenger Details</p>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Age</th>
                    <th className="px-4 py-2">Gender</th>
                    <th className="px-4 py-2">Berth</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {booking.passengers.map((passenger, index) => (
                    <tr key={index} className="text-sm">
                      <td className="px-4 py-2">{passenger.name}</td>
                      <td className="px-4 py-2">{passenger.age}</td>
                      <td className="px-4 py-2">{passenger.gender === 'male' ? 'M' : passenger.gender === 'female' ? 'F' : 'O'}</td>
                      <td className="px-4 py-2">{passenger.berth || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Status */}
          <div className="flex justify-between items-center border-t border-gray-100 pt-4">
            <div>
              <p className="text-sm font-medium">Booking Status</p>
              <div className="flex items-center mt-1">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  booking.status === 'confirmed' ? 'bg-green-500' : 
                  booking.status === 'waiting' ? 'bg-yellow-500' : 
                  booking.status === 'cancelled' ? 'bg-red-500' : 'bg-blue-500'
                }`}></span>
                <span className="text-sm capitalize">{booking.status}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Total Fare</p>
              <p className="text-lg font-semibold">₹{booking.fare}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      {showActions && (
        <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Ticket
          </Button>
          
          {booking.status === 'confirmed' && (
            <Button 
              variant="destructive"
              className="flex items-center gap-2"
            >
              Cancel Ticket
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketCard;
