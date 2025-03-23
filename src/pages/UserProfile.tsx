
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Edit,
  LogOut,
  Search,
  Ticket,
  Settings,
  User as UserIcon,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import TicketCard from "@/components/TicketCard";
import { Booking } from "@/lib/types";
import { bookings, currentUser } from "@/lib/mockData";

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [completedBookings, setCompletedBookings] = useState<Booking[]>([]);
  const [cancelledBookings, setCancelledBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch user bookings
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      // Filter bookings by status
      setActiveBookings(bookings.filter(booking => 
        booking.status === "confirmed" || booking.status === "waiting"
      ));
      
      setCompletedBookings(bookings.filter(booking => 
        booking.status === "completed"
      ));
      
      setCancelledBookings(bookings.filter(booking => 
        booking.status === "cancelled"
      ));
      
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Filter bookings by search query
  const filterBookings = (bookingsList: Booking[]) => {
    if (!searchQuery) return bookingsList;
    
    const query = searchQuery.toLowerCase();
    return bookingsList.filter(booking => 
      booking.pnr.toLowerCase().includes(query) ||
      booking.train.name.toLowerCase().includes(query) ||
      booking.train.number.toLowerCase().includes(query) ||
      booking.train.from.name.toLowerCase().includes(query) ||
      booking.train.to.name.toLowerCase().includes(query)
    );
  };
  
  // Handle booking cancellation
  const handleCancelBooking = (bookingId: string) => {
    // Simulate API call
    toast.success("Booking cancelled successfully");
    
    // Update local state
    setActiveBookings(prev => prev.filter(booking => booking.id !== bookingId));
    setCancelledBookings(prev => {
      const booking = bookings.find(b => b.id === bookingId);
      if (booking) {
        const updatedBooking = { ...booking, status: "cancelled" as const };
        return [...prev, updatedBooking];
      }
      return prev;
    });
  };
  
  // Log out user
  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* User Profile Container */}
      <div className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-glass overflow-hidden border border-gray-100">
                {/* User Info */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-rail/10 flex items-center justify-center">
                      <UserIcon className="h-8 w-8 text-rail" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg">{currentUser.name}</h2>
                      <p className="text-muted-foreground text-sm">{currentUser.email}</p>
                    </div>
                  </div>
                </div>
                
                {/* Navigation */}
                <div className="p-4">
                  <nav className="space-y-2">
                    <a href="#" className="flex items-center text-sm p-3 rounded-md bg-rail/10 text-rail font-medium">
                      <Ticket className="h-4 w-4 mr-3" />
                      My Bookings
                    </a>
                    <a href="#" className="flex items-center text-sm p-3 rounded-md text-muted-foreground hover:text-foreground hover:bg-gray-100">
                      <UserIcon className="h-4 w-4 mr-3" />
                      Profile
                    </a>
                    <a href="#" className="flex items-center text-sm p-3 rounded-md text-muted-foreground hover:text-foreground hover:bg-gray-100">
                      <CreditCard className="h-4 w-4 mr-3" />
                      Payment Methods
                    </a>
                    <a href="#" className="flex items-center text-sm p-3 rounded-md text-muted-foreground hover:text-foreground hover:bg-gray-100">
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </a>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center text-sm p-3 rounded-md w-full text-left text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </button>
                  </nav>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-xl shadow-glass overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="font-semibold text-xl">My Bookings</h2>
                  
                  {/* Search */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Search by PNR, train..."
                      className="pl-10 w-full max-w-xs"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="p-4">
                  <Tabs defaultValue="active" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="active" className="text-sm">
                        Active Bookings ({activeBookings.length})
                      </TabsTrigger>
                      <TabsTrigger value="completed" className="text-sm">
                        Completed ({completedBookings.length})
                      </TabsTrigger>
                      <TabsTrigger value="cancelled" className="text-sm">
                        Cancelled ({cancelledBookings.length})
                      </TabsTrigger>
                    </TabsList>
                    
                    {/* Active Bookings */}
                    <TabsContent value="active" className="space-y-6">
                      {isLoading ? (
                        <div className="animate-pulse space-y-4">
                          {[1, 2].map(n => (
                            <div key={n} className="bg-gray-100 rounded-xl h-48"></div>
                          ))}
                        </div>
                      ) : filterBookings(activeBookings).length > 0 ? (
                        filterBookings(activeBookings).map(booking => (
                          <div key={booking.id} className="group relative">
                            <TicketCard booking={booking} />
                            
                            {/* Quick Actions */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleCancelBooking(booking.id)}
                                className="h-8"
                              >
                                Cancel Ticket
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center p-8">
                          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Calendar className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium mb-1">No active bookings</h3>
                          <p className="text-muted-foreground">
                            {searchQuery ? "No bookings match your search criteria" : "You don't have any upcoming journeys"}
                          </p>
                          <Button
                            className="mt-4 bg-rail hover:bg-rail-dark"
                            onClick={() => navigate("/search")}
                          >
                            Book a Train
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                    
                    {/* Completed Bookings */}
                    <TabsContent value="completed" className="space-y-6">
                      {isLoading ? (
                        <div className="animate-pulse space-y-4">
                          {[1, 2].map(n => (
                            <div key={n} className="bg-gray-100 rounded-xl h-48"></div>
                          ))}
                        </div>
                      ) : filterBookings(completedBookings).length > 0 ? (
                        filterBookings(completedBookings).map(booking => (
                          <div key={booking.id}>
                            <TicketCard booking={booking} showActions={false} />
                          </div>
                        ))
                      ) : (
                        <div className="text-center p-8">
                          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Ticket className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium mb-1">No completed journeys</h3>
                          <p className="text-muted-foreground">
                            {searchQuery ? "No bookings match your search criteria" : "You haven't completed any journeys yet"}
                          </p>
                        </div>
                      )}
                    </TabsContent>
                    
                    {/* Cancelled Bookings */}
                    <TabsContent value="cancelled" className="space-y-6">
                      {isLoading ? (
                        <div className="animate-pulse space-y-4">
                          {[1, 2].map(n => (
                            <div key={n} className="bg-gray-100 rounded-xl h-48"></div>
                          ))}
                        </div>
                      ) : filterBookings(cancelledBookings).length > 0 ? (
                        filterBookings(cancelledBookings).map(booking => (
                          <div key={booking.id}>
                            <TicketCard booking={booking} showActions={false} />
                          </div>
                        ))
                      ) : (
                        <div className="text-center p-8">
                          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <X className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium mb-1">No cancelled bookings</h3>
                          <p className="text-muted-foreground">
                            {searchQuery ? "No bookings match your search criteria" : "You don't have any cancelled bookings"}
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
