
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, 
  CalendarIcon, 
  ArrowRight, 
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { stations } from "@/lib/mockData";

const Hero = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  // Handle form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromStation && toStation && date) {
      navigate(`/search?from=${fromStation}&to=${toStation}&date=${format(date, "yyyy-MM-dd")}`);
    }
  };

  // Handle selection of stations
  const handleSelectFromStation = (station: string) => {
    setFromStation(station);
    setShowFromDropdown(false);
  };

  const handleSelectToStation = (station: string) => {
    setToStation(station);
    setShowToDropdown(false);
  };

  // Handle clicks outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter stations based on input
  const filteredFromStations = stations.filter(station => 
    station.name.toLowerCase().includes(fromFilter.toLowerCase()) || 
    station.code.toLowerCase().includes(fromFilter.toLowerCase()) ||
    station.city.toLowerCase().includes(fromFilter.toLowerCase())
  );
  
  const filteredToStations = stations.filter(station => 
    station.name.toLowerCase().includes(toFilter.toLowerCase()) || 
    station.code.toLowerCase().includes(toFilter.toLowerCase()) ||
    station.city.toLowerCase().includes(toFilter.toLowerCase())
  );

  return (
    <div className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/40"></div>
        <img 
          src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3084&q=80" 
          alt="Indian Railway" 
          className="object-cover w-full h-full"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 md:px-8">
        <div className="max-w-4xl w-full text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            Explore India by Rail
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 md:mb-12">
            Book your train journey with ease and comfort
          </p>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-glass p-6 max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* From Station */}
                <div className="relative" ref={fromRef}>
                  <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="from"
                      className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-rail focus:ring-rail sm:text-sm"
                      placeholder="Enter city or station"
                      value={fromStation || fromFilter}
                      onChange={(e) => {
                        setFromFilter(e.target.value);
                        setFromStation("");
                        setShowFromDropdown(true);
                      }}
                      onFocus={() => setShowFromDropdown(true)}
                    />
                  </div>
                  
                  {/* From Dropdown */}
                  {showFromDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {filteredFromStations.length > 0 ? (
                        filteredFromStations.map((station) => (
                          <div
                            key={station.id}
                            className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                            onClick={() => handleSelectFromStation(station.name)}
                          >
                            <div className="font-medium">{station.name}</div>
                            <div className="text-xs text-gray-500">{station.code} • {station.city}, {station.state}</div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">No stations found</div>
                      )}
                    </div>
                  )}
                </div>

                {/* To Station */}
                <div className="relative" ref={toRef}>
                  <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="to"
                      className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-rail focus:ring-rail sm:text-sm"
                      placeholder="Enter city or station"
                      value={toStation || toFilter}
                      onChange={(e) => {
                        setToFilter(e.target.value);
                        setToStation("");
                        setShowToDropdown(true);
                      }}
                      onFocus={() => setShowToDropdown(true)}
                    />
                  </div>
                  
                  {/* To Dropdown */}
                  {showToDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {filteredToStations.length > 0 ? (
                        filteredToStations.map((station) => (
                          <div
                            key={station.id}
                            className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                            onClick={() => handleSelectToStation(station.name)}
                          >
                            <div className="font-medium">{station.name}</div>
                            <div className="text-xs text-gray-500">{station.code} • {station.city}, {station.state}</div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">No stations found</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Date Picker */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Journey
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-gray-300 bg-white",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Search Button */}
              <Button 
                type="submit"
                className="w-full md:w-auto px-8 py-6 md:ml-auto bg-rail hover:bg-rail-dark transition-colors flex items-center justify-center gap-2 text-base"
              >
                <Search className="h-5 w-5" />
                <span>Search Trains</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
