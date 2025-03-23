
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  CalendarIcon, 
  Filter, 
  FilterX, 
  MapPin, 
  Search as SearchIcon,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import TrainCard from "@/components/TrainCard";
import { Train } from "@/lib/types";
import { getTrainsByRoute, stations } from "@/lib/mockData";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  // Set initial state from URL params
  const [fromStation, setFromStation] = useState(searchParams.get("from") || "");
  const [toStation, setToStation] = useState(searchParams.get("to") || "");
  const [date, setDate] = useState<Date | undefined>(
    searchParams.get("date") ? new Date(searchParams.get("date")!) : new Date()
  );
  
  // Filter states
  const [departureTime, setDepartureTime] = useState<string[]>([]);
  const [classTypes, setClassTypes] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Train[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Perform search on initial load or when search params change
  useEffect(() => {
    if (fromStation && toStation) {
      handleSearch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
  
  // Handle form submission
  const handleSearch = () => {
    if (!fromStation || !toStation || !date) return;
    
    // Update URL with search params
    const params = new URLSearchParams();
    params.set("from", fromStation);
    params.set("to", toStation);
    params.set("date", format(date, "yyyy-MM-dd"));
    navigate(`/search?${params.toString()}`);
    
    setIsLoading(true);
    
    // Simulate API call to search trains
    setTimeout(() => {
      const results = getTrainsByRoute(fromStation, toStation);
      setSearchResults(results);
      setIsLoading(false);
    }, 1000);
  };
  
  // Filter trains by departure time
  const filterTrainsByDepartureTime = (train: Train) => {
    if (departureTime.length === 0) return true;
    
    const hour = parseInt(train.departureTime.split(":")[0]);
    
    return departureTime.some(filter => {
      switch (filter) {
        case "morning":
          return hour >= 5 && hour < 12;
        case "afternoon":
          return hour >= 12 && hour < 17;
        case "evening":
          return hour >= 17 && hour < 21;
        case "night":
          return hour >= 21 || hour < 5;
        default:
          return true;
      }
    });
  };
  
  // Filter trains by class type
  const filterTrainsByClassType = (train: Train) => {
    if (classTypes.length === 0) return true;
    
    return classTypes.some(classType => {
      switch (classType) {
        case "sleeper":
          return train.availableSeats.sleeper > 0;
        case "ac3tier":
          return train.availableSeats.ac3Tier > 0;
        case "ac2tier":
          return train.availableSeats.ac2Tier > 0;
        case "acfirstclass":
          return train.availableSeats.acFirstClass > 0;
        default:
          return true;
      }
    });
  };
  
  // Toggle departure time filter
  const toggleDepartureTime = (value: string) => {
    setDepartureTime(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };
  
  // Toggle class type filter
  const toggleClassType = (value: string) => {
    setClassTypes(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setDepartureTime([]);
    setClassTypes([]);
  };
  
  // Filter the results
  const filteredTrains = searchResults
    .filter(filterTrainsByDepartureTime)
    .filter(filterTrainsByClassType);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Search Container */}
      <div className="pt-24 pb-16 px-4 md:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Find Trains</h1>
          
          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* From Station */}
            <div className="md:col-span-3">
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
                  value={fromStation}
                  onChange={(e) => setFromStation(e.target.value)}
                />
              </div>
            </div>
            
            {/* To Station */}
            <div className="md:col-span-3">
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
                  value={toStation}
                  onChange={(e) => setToStation(e.target.value)}
                />
              </div>
            </div>
            
            {/* Date Picker */}
            <div className="md:col-span-3">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Journey
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-gray-300",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
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
            
            {/* Search Button */}
            <div className="md:col-span-3 flex items-end">
              <Button 
                onClick={handleSearch}
                className="w-full bg-rail hover:bg-rail-dark flex items-center justify-center gap-2"
                disabled={!fromStation || !toStation || !date || isLoading}
              >
                <SearchIcon className="h-4 w-4" />
                <span>{isLoading ? "Searching..." : "Search Trains"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results Container */}
      <div className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Title with Filter Toggle */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {searchResults.length > 0 
                ? `${filteredTrains.length} Trains Found`
                : "Search for Trains"}
            </h2>
            
            {searchResults.length > 0 && (
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                {isFilterOpen ? <FilterX className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
                {isFilterOpen ? "Hide Filters" : "Show Filters"}
              </Button>
            )}
          </div>
          
          {/* Filters and Results Grid */}
          <div className={cn(
            "grid gap-6",
            isFilterOpen ? "grid-cols-1 md:grid-cols-4" : "grid-cols-1"
          )}>
            {/* Filters Panel */}
            {isFilterOpen && (
              <div className="md:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Filters</h3>
                    <Button 
                      variant="ghost" 
                      className="h-8 px-2 text-sm"
                      onClick={clearFilters}
                    >
                      Clear All
                    </Button>
                  </div>
                  
                  {/* Departure Time Filter */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2">Departure Time</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-rail focus:ring-rail"
                          checked={departureTime.includes("morning")}
                          onChange={() => toggleDepartureTime("morning")}
                        />
                        <span className="text-sm">Morning (5:00 AM - 11:59 AM)</span>
                      </label>
                      
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-rail focus:ring-rail"
                          checked={departureTime.includes("afternoon")}
                          onChange={() => toggleDepartureTime("afternoon")}
                        />
                        <span className="text-sm">Afternoon (12:00 PM - 4:59 PM)</span>
                      </label>
                      
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-rail focus:ring-rail"
                          checked={departureTime.includes("evening")}
                          onChange={() => toggleDepartureTime("evening")}
                        />
                        <span className="text-sm">Evening (5:00 PM - 8:59 PM)</span>
                      </label>
                      
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-rail focus:ring-rail"
                          checked={departureTime.includes("night")}
                          onChange={() => toggleDepartureTime("night")}
                        />
                        <span className="text-sm">Night (9:00 PM - 4:59 AM)</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Class Type Filter */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Class Type</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-rail focus:ring-rail"
                          checked={classTypes.includes("sleeper")}
                          onChange={() => toggleClassType("sleeper")}
                        />
                        <span className="text-sm">Sleeper Class (SL)</span>
                      </label>
                      
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-rail focus:ring-rail"
                          checked={classTypes.includes("ac3tier")}
                          onChange={() => toggleClassType("ac3tier")}
                        />
                        <span className="text-sm">AC 3 Tier (3A)</span>
                      </label>
                      
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-rail focus:ring-rail"
                          checked={classTypes.includes("ac2tier")}
                          onChange={() => toggleClassType("ac2tier")}
                        />
                        <span className="text-sm">AC 2 Tier (2A)</span>
                      </label>
                      
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-rail focus:ring-rail"
                          checked={classTypes.includes("acfirstclass")}
                          onChange={() => toggleClassType("acfirstclass")}
                        />
                        <span className="text-sm">AC First Class (1A)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Results */}
            <div className={isFilterOpen ? "md:col-span-3" : "col-span-1"}>
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="bg-white rounded-xl h-48 shadow-sm"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {searchResults.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <SearchIcon className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No Trains Found</h3>
                        <p className="text-muted-foreground">
                          {fromStation && toStation
                            ? "No trains found for this route. Please try a different route or date."
                            : "Please enter origin and destination to search for trains."}
                        </p>
                      </div>
                    </div>
                  ) : filteredTrains.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <X className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No Matching Trains</h3>
                        <p className="text-muted-foreground mb-4">
                          No trains match your current filters. Try adjusting your filter criteria.
                        </p>
                        <Button variant="outline" onClick={clearFilters}>
                          Clear All Filters
                        </Button>
                      </div>
                    </div>
                  ) : (
                    filteredTrains.map(train => (
                      <TrainCard key={train.id} train={train} date={date ? format(date, "yyyy-MM-dd") : ""} />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
