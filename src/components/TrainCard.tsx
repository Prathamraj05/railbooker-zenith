import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Clock, 
  CalendarDays, 
  ArrowRight, 
  ChevronsUpDown,
  Compass,
  BedDouble,
  Train as TrainIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ClassType, Train } from "@/lib/types";
import { getClassTypeLabel, getClassTypeShortLabel } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface TrainCardProps {
  train: Train;
  date: string;
}

const TrainCard = ({ train, date }: TrainCardProps) => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  // Function to format time in 12-hour format
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    const hourNum = parseInt(hour, 10);
    const period = hourNum >= 12 ? "PM" : "AM";
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${period}`;
  };

  // Function to check if a class is available
  const isClassAvailable = (classType: ClassType) => {
    return train.availableSeats[classType] > 0;
  };
  
  // Handle class selection
  const handleSelectClass = (classType: ClassType) => {
    setSelectedClass(classType);
  };
  
  // Handle booking
  const handleBook = () => {
    if (selectedClass) {
      navigate(`/booking?train=${train.id}&date=${date}&class=${selectedClass}`);
    }
  };

  // Available classes for this train
  const availableClasses = [
    { type: 'sleeper' as ClassType, available: isClassAvailable('sleeper') },
    { type: 'ac3Tier' as ClassType, available: isClassAvailable('ac3Tier') },
    { type: 'ac2Tier' as ClassType, available: isClassAvailable('ac2Tier') },
    { type: 'acFirstClass' as ClassType, available: isClassAvailable('acFirstClass') },
  ].filter(c => c.available);

  return (
    <div className="bg-white rounded-xl shadow-glass hover:shadow-glass-hover transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Train Info */}
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <TrainIcon className="w-5 h-5 text-rail mr-2" />
              <h3 className="text-lg font-bold text-foreground">{train.name}</h3>
              <div className="ml-2 px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">
                {train.number}
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              <span>{train.duration}</span>
              <span className="mx-2 text-gray-300">|</span>
              <Compass className="w-4 h-4 mr-1" />
              <span>{train.distance}</span>
              <span className="mx-2 text-gray-300">|</span>
              <CalendarDays className="w-4 h-4 mr-1" />
              <span>{new Date(date).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            </div>
          </div>
          
          {/* Journey Times */}
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <div className="text-center">
              <p className="text-xl font-bold">{formatTime(train.departureTime)}</p>
              <p className="text-xs text-muted-foreground">{train.from.code}</p>
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
            
            <div className="text-center">
              <p className="text-xl font-bold">{formatTime(train.arrivalTime)}</p>
              <p className="text-xs text-muted-foreground">{train.to.code}</p>
            </div>
          </div>
        </div>
        
        {/* Train Class Selection */}
        <div className="mt-6">
          <div className="flex flex-wrap gap-2">
            {availableClasses.map(({ type }) => (
              <Button
                key={type}
                variant={selectedClass === type ? "default" : "outline"}
                className={cn(
                  "border-gray-200 px-3 md:px-4",
                  selectedClass === type ? "bg-rail hover:bg-rail-dark" : "hover:bg-gray-50"
                )}
                onClick={() => handleSelectClass(type)}
              >
                <span className="flex flex-col items-start">
                  <span className="text-xs font-normal">{getClassTypeLabel(type)}</span>
                  <span className="font-semibold">₹{train.fare[type]}</span>
                </span>
              </Button>
            ))}
          </div>
          
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="w-full sm:w-auto">
              {selectedClass ? (
                <div className="text-sm text-muted-foreground">
                  <BedDouble className="inline-block w-4 h-4 mr-1" />
                  <span>{train.availableSeats[selectedClass]} seats available in {getClassTypeLabel(selectedClass)}</span>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">Select a class to proceed</div>
              )}
            </div>
            
            <Button 
              className="w-full sm:w-auto bg-rail hover:bg-rail-dark disabled:bg-gray-200 min-w-[120px]"
              disabled={!selectedClass}
              onClick={handleBook}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
      
      {/* Collapsible Details */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="border-t border-gray-100">
          <CollapsibleTrigger className="w-full flex items-center justify-center p-3 text-sm text-muted-foreground hover:bg-gray-50 transition-colors">
            {isOpen ? "Hide Details" : "View Details"}
            <ChevronsUpDown className={cn("ml-2 h-4 w-4 transition-transform", isOpen && "rotate-180")} />
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="bg-gray-50 p-6 animate-accordion-down">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Route Information</h4>
              <div className="flex items-start mb-4">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <div className="w-0.5 h-16 bg-gray-200"></div>
                  <div className="w-3 h-3 rounded-full bg-rail"></div>
                </div>
                <div className="flex flex-col">
                  <div>
                    <p className="font-medium">{formatTime(train.departureTime)} | {train.from.code}</p>
                    <p className="text-sm text-muted-foreground">{train.from.name}</p>
                    <p className="text-xs text-muted-foreground">{train.from.city}, {train.from.state}</p>
                  </div>
                  <div className="my-4 text-xs text-muted-foreground">
                    {train.duration} | {train.distance}
                  </div>
                  <div>
                    <p className="font-medium">{formatTime(train.arrivalTime)} | {train.to.code}</p>
                    <p className="text-sm text-muted-foreground">{train.to.name}</p>
                    <p className="text-xs text-muted-foreground">{train.to.city}, {train.to.state}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Fare Information</h4>
              <div className="space-y-2">
                {availableClasses.map(({ type }) => (
                  <div key={type} className="flex justify-between items-center p-2 rounded bg-white">
                    <div>
                      <p className="font-medium">{getClassTypeLabel(type)}</p>
                      <p className="text-sm text-muted-foreground">Available: {train.availableSeats[type]}</p>
                    </div>
                    <p className="font-semibold">₹{train.fare[type]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default TrainCard;
