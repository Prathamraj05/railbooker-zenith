
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Calendar,
  Clock,
  Download,
  Home,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Shield,
  Ticket,
  Train,
  TrendingUp,
  Users,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Booking, ClassType, Train as TrainType } from "@/lib/types";
import { bookings, trains } from "@/lib/mockData";

// Mock data for admin dashboard
const totalBookingsToday = 342;
const totalRevenue = 685400;
const activeTrains = 48;
const totalUsers = 1256;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [allTrains, setAllTrains] = useState<TrainType[]>([]);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch data
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setAllTrains(trains);
      setAllBookings(bookings);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Filter trains by search query
  const filterTrains = () => {
    if (!searchQuery) return allTrains;
    
    const query = searchQuery.toLowerCase();
    return allTrains.filter(train => 
      train.name.toLowerCase().includes(query) ||
      train.number.toLowerCase().includes(query) ||
      train.from.name.toLowerCase().includes(query) ||
      train.to.name.toLowerCase().includes(query)
    );
  };
  
  // Filter bookings by search query
  const filterBookings = () => {
    if (!searchQuery) return allBookings;
    
    const query = searchQuery.toLowerCase();
    return allBookings.filter(booking => 
      booking.pnr.toLowerCase().includes(query) ||
      booking.train.name.toLowerCase().includes(query) ||
      booking.train.number.toLowerCase().includes(query)
    );
  };
  
  // Handle train availability update
  const updateTrainAvailability = (trainId: string, classType: ClassType, count: number) => {
    // Update local state (in a real app, this would be an API call)
    setAllTrains(prev => 
      prev.map(train => {
        if (train.id === trainId) {
          return {
            ...train,
            availableSeats: {
              ...train.availableSeats,
              [classType]: count
            }
          };
        }
        return train;
      })
    );
    
    toast.success(`Updated ${classType} seats for ${trains.find(t => t.id === trainId)?.name}`);
  };
  
  // Handle booking status update
  const updateBookingStatus = (bookingId: string, status: "confirmed" | "waiting" | "cancelled" | "completed") => {
    // Update local state (in a real app, this would be an API call)
    setAllBookings(prev => 
      prev.map(booking => {
        if (booking.id === bookingId) {
          return {
            ...booking,
            status
          };
        }
        return booking;
      })
    );
    
    toast.success(`Booking ${bookingId} status updated to ${status}`);
  };
  
  // Log out admin
  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/admin-login");
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className="flex items-center">
              <Train className="h-6 w-6 text-rail-light mr-2" />
              <span className="text-xl font-bold">RailAdmin</span>
            </div>
            <button
              className="md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="py-2">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2 pl-3">Main</p>
              <a href="#" className="flex items-center text-sm p-3 rounded-md bg-gray-700 text-white">
                <BarChart3 className="h-4 w-4 mr-3" />
                Dashboard
              </a>
              <a href="#" className="flex items-center text-sm p-3 rounded-md text-gray-300 hover:text-white hover:bg-gray-700">
                <Train className="h-4 w-4 mr-3" />
                Trains
              </a>
              <a href="#" className="flex items-center text-sm p-3 rounded-md text-gray-300 hover:text-white hover:bg-gray-700">
                <Ticket className="h-4 w-4 mr-3" />
                Bookings
              </a>
              <a href="#" className="flex items-center text-sm p-3 rounded-md text-gray-300 hover:text-white hover:bg-gray-700">
                <Users className="h-4 w-4 mr-3" />
                Users
              </a>
            </div>
            
            <div className="py-2 border-t border-gray-700">
              <p className="text-gray-400 text-xs uppercase tracking-wider mt-4 mb-2 pl-3">Reports</p>
              <a href="#" className="flex items-center text-sm p-3 rounded-md text-gray-300 hover:text-white hover:bg-gray-700">
                <TrendingUp className="h-4 w-4 mr-3" />
                Analytics
              </a>
              <a href="#" className="flex items-center text-sm p-3 rounded-md text-gray-300 hover:text-white hover:bg-gray-700">
                <Download className="h-4 w-4 mr-3" />
                Reports
              </a>
            </div>
            
            <div className="py-2 border-t border-gray-700">
              <p className="text-gray-400 text-xs uppercase tracking-wider mt-4 mb-2 pl-3">System</p>
              <a href="#" className="flex items-center text-sm p-3 rounded-md text-gray-300 hover:text-white hover:bg-gray-700">
                <Settings className="h-4 w-4 mr-3" />
                Settings
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm p-3 rounded-md w-full text-left text-gray-300 hover:text-red-400 hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </button>
            </div>
          </nav>
          
          {/* Admin Info */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <Shield className="h-5 w-5 text-rail-light" />
              </div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-400">admin@railbooker.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? "md:ml-64" : ""}`}>
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
          <button
            className="text-gray-300 md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <h1 className="text-xl font-bold hidden md:block">Admin Dashboard</h1>
          
          {/* Search */}
          <div className="relative ml-auto mr-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Link to="/">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Home className="h-4 w-4 mr-2" />
              View Site
            </Button>
          </Link>
        </header>
        
        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Bookings Today</p>
                  <h3 className="text-2xl font-bold mt-1">{totalBookingsToday}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Ticket className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-4 text-xs font-medium text-green-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+12% from yesterday</span>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">₹{totalRevenue.toLocaleString()}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <div className="mt-4 text-xs font-medium text-green-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+8% from last week</span>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Trains</p>
                  <h3 className="text-2xl font-bold mt-1">{activeTrains}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Train className="h-6 w-6 text-purple-500" />
                </div>
              </div>
              <div className="mt-4 text-xs font-medium text-purple-400 flex items-center">
                <span>On schedule: 42</span>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <h3 className="text-2xl font-bold mt-1">{totalUsers}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-orange-500" />
                </div>
              </div>
              <div className="mt-4 text-xs font-medium text-orange-400 flex items-center">
                <span>New today: 24</span>
              </div>
            </div>
          </div>
          
          {/* Tabs for different sections */}
          <Tabs defaultValue="trains" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 bg-gray-800 border border-gray-700">
              <TabsTrigger 
                value="trains" 
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Manage Trains
              </TabsTrigger>
              <TabsTrigger 
                value="bookings" 
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                Recent Bookings
              </TabsTrigger>
            </TabsList>
            
            {/* Trains Management */}
            <TabsContent value="trains" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Train Management</h2>
                <Button className="bg-rail hover:bg-rail-dark">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Train
                </Button>
              </div>
              
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="bg-gray-800 rounded-xl h-24 border border-gray-700"></div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Train
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Route
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Departure
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Available Seats
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {filterTrains().map((train) => (
                          <tr key={train.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium">{train.name}</div>
                                  <div className="text-sm text-gray-400">{train.number}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">{train.from.name} to {train.to.name}</div>
                              <div className="text-sm text-gray-400">{train.distance}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">{train.departureTime}</div>
                              <div className="flex items-center text-sm text-gray-400">
                                <Clock className="h-3 w-3 mr-1" />
                                {train.duration}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="space-y-1">
                                {train.availableSeats.sleeper > 0 && (
                                  <div className="flex items-center justify-between text-sm">
                                    <span>SL:</span>
                                    <input
                                      type="number"
                                      value={train.availableSeats.sleeper}
                                      onChange={(e) => updateTrainAvailability(train.id, 'sleeper', parseInt(e.target.value))}
                                      className="w-16 bg-gray-700 border border-gray-600 rounded px-2 py-1"
                                      min="0"
                                    />
                                  </div>
                                )}
                                {train.availableSeats.ac3Tier > 0 && (
                                  <div className="flex items-center justify-between text-sm">
                                    <span>3A:</span>
                                    <input
                                      type="number"
                                      value={train.availableSeats.ac3Tier}
                                      onChange={(e) => updateTrainAvailability(train.id, 'ac3Tier', parseInt(e.target.value))}
                                      className="w-16 bg-gray-700 border border-gray-600 rounded px-2 py-1"
                                      min="0"
                                    />
                                  </div>
                                )}
                                {train.availableSeats.ac2Tier > 0 && (
                                  <div className="flex items-center justify-between text-sm">
                                    <span>2A:</span>
                                    <input
                                      type="number"
                                      value={train.availableSeats.ac2Tier}
                                      onChange={(e) => updateTrainAvailability(train.id, 'ac2Tier', parseInt(e.target.value))}
                                      className="w-16 bg-gray-700 border border-gray-600 rounded px-2 py-1"
                                      min="0"
                                    />
                                  </div>
                                )}
                                {train.availableSeats.acFirstClass > 0 && (
                                  <div className="flex items-center justify-between text-sm">
                                    <span>1A:</span>
                                    <input
                                      type="number"
                                      value={train.availableSeats.acFirstClass}
                                      onChange={(e) => updateTrainAvailability(train.id, 'acFirstClass', parseInt(e.target.value))}
                                      className="w-16 bg-gray-700 border border-gray-600 rounded px-2 py-1"
                                      min="0"
                                    />
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
                              >
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))}
                        
                        {filterTrains().length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                              No trains found matching the search criteria
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </TabsContent>
            
            {/* Bookings Management */}
            <TabsContent value="bookings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Recent Bookings</h2>
                <Button 
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="bg-gray-800 rounded-xl h-24 border border-gray-700"></div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            PNR
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Train
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Journey Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Passengers
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {filterBookings().map((booking) => (
                          <tr key={booking.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-mono">{booking.pnr}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium">{booking.train.name}</div>
                              <div className="text-sm text-gray-400">{booking.train.number}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">
                                {new Date(booking.date).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}
                              </div>
                              <div className="flex items-center text-sm text-gray-400">
                                <Calendar className="h-3 w-3 mr-1" />
                                {booking.classType}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">{booking.passengers.length} passenger(s)</div>
                              <div className="text-sm text-gray-400">₹{booking.fare}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={booking.status}
                                onChange={(e) => updateBookingStatus(booking.id, e.target.value as any)}
                                className={`text-sm rounded-full px-3 py-1 font-medium ${
                                  booking.status === 'confirmed' ? 'bg-green-900/20 text-green-400' :
                                  booking.status === 'waiting' ? 'bg-yellow-900/20 text-yellow-400' :
                                  booking.status === 'cancelled' ? 'bg-red-900/20 text-red-400' :
                                  'bg-blue-900/20 text-blue-400'
                                }`}
                              >
                                <option value="confirmed">Confirmed</option>
                                <option value="waiting">Waiting</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="completed">Completed</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
                              >
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                        
                        {filterBookings().length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                              No bookings found matching the search criteria
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
