
import { Booking, ClassType, Destination, PaymentMethod, Station, Train, User } from "./types";

export const currentUser: User = {
  id: "u1",
  name: "Rahul Sharma",
  email: "rahul.sharma@example.com",
  phone: "9876543210",
  isAdmin: false,
};

export const stations: Station[] = [
  {
    id: "s1",
    name: "New Delhi Railway Station",
    code: "NDLS",
    city: "Delhi",
    state: "Delhi",
  },
  {
    id: "s2",
    name: "Mumbai Central",
    code: "MMCT",
    city: "Mumbai",
    state: "Maharashtra",
  },
  {
    id: "s3",
    name: "Chennai Central",
    code: "MAS",
    city: "Chennai",
    state: "Tamil Nadu",
  },
  {
    id: "s4",
    name: "Howrah Junction",
    code: "HWH",
    city: "Kolkata",
    state: "West Bengal",
  },
  {
    id: "s5",
    name: "Bengaluru City Junction",
    code: "SBC",
    city: "Bengaluru",
    state: "Karnataka",
  },
  {
    id: "s6",
    name: "Ahmedabad Junction",
    code: "ADI",
    city: "Ahmedabad",
    state: "Gujarat",
  },
  {
    id: "s7",
    name: "Jaipur Junction",
    code: "JP",
    city: "Jaipur",
    state: "Rajasthan",
  },
  {
    id: "s8",
    name: "Lucknow Junction",
    code: "LKO",
    city: "Lucknow",
    state: "Uttar Pradesh",
  },
];

export const trains: Train[] = [
  {
    id: "t1",
    name: "Rajdhani Express",
    number: "12301",
    from: stations[0], // New Delhi
    to: stations[1], // Mumbai
    departureTime: "16:00",
    arrivalTime: "08:00",
    duration: "16h 00m",
    distance: "1384 km",
    availableSeats: {
      sleeper: 42,
      ac3Tier: 25,
      ac2Tier: 15,
      acFirstClass: 6,
    },
    fare: {
      sleeper: 755,
      ac3Tier: 1980,
      ac2Tier: 2890,
      acFirstClass: 4850,
    },
  },
  {
    id: "t2",
    name: "Shatabdi Express",
    number: "12002",
    from: stations[0], // New Delhi
    to: stations[6], // Jaipur
    departureTime: "06:05",
    arrivalTime: "10:40",
    duration: "4h 35m",
    distance: "303 km",
    availableSeats: {
      sleeper: 0,
      ac3Tier: 0,
      ac2Tier: 28,
      acFirstClass: 12,
    },
    fare: {
      sleeper: 0,
      ac3Tier: 0,
      ac2Tier: 975,
      acFirstClass: 1850,
    },
  },
  {
    id: "t3",
    name: "Duronto Express",
    number: "12213",
    from: stations[0], // New Delhi
    to: stations[4], // Bengaluru
    departureTime: "22:15",
    arrivalTime: "07:40",
    duration: "33h 25m",
    distance: "2150 km",
    availableSeats: {
      sleeper: 86,
      ac3Tier: 43,
      ac2Tier: 20,
      acFirstClass: 8,
    },
    fare: {
      sleeper: 1150,
      ac3Tier: 2950,
      ac2Tier: 4320,
      acFirstClass: 7250,
    },
  },
  {
    id: "t4",
    name: "Vande Bharat Express",
    number: "22439",
    from: stations[0], // New Delhi
    to: stations[7], // Lucknow
    departureTime: "08:00",
    arrivalTime: "14:00",
    duration: "6h 00m",
    distance: "512 km",
    availableSeats: {
      sleeper: 0,
      ac3Tier: 0,
      ac2Tier: 48,
      acFirstClass: 24,
    },
    fare: {
      sleeper: 0,
      ac3Tier: 0,
      ac2Tier: 1250,
      acFirstClass: 2200,
    },
  },
  {
    id: "t5",
    name: "Tejas Express",
    number: "82501",
    from: stations[1], // Mumbai
    to: stations[5], // Ahmedabad
    departureTime: "06:40",
    arrivalTime: "13:10",
    duration: "6h 30m",
    distance: "493 km",
    availableSeats: {
      sleeper: 0,
      ac3Tier: 35,
      ac2Tier: 22,
      acFirstClass: 0,
    },
    fare: {
      sleeper: 0,
      ac3Tier: 1380,
      ac2Tier: 2350,
      acFirstClass: 0,
    },
  },
];

export const destinations: Destination[] = [
  {
    id: "d1",
    name: "Delhi",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Experience the blend of history and modernity in India's capital city.",
  },
  {
    id: "d2",
    name: "Mumbai",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    description: "Discover the city of dreams and India's financial capital.",
  },
  {
    id: "d3",
    name: "Jaipur",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Visit the Pink City known for its stunning architecture and royal heritage.",
  },
  {
    id: "d4",
    name: "Agra",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    description: "Home to the iconic Taj Mahal, a symbol of eternal love.",
  },
  {
    id: "d5",
    name: "Varanasi",
    image: "https://images.unsplash.com/photo-1561361058-c12e05959dc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Experience spirituality on the banks of the sacred Ganges river.",
  },
  {
    id: "d6",
    name: "Kerala",
    image: "https://images.unsplash.com/photo-1609766428906-9a0258dcef85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "Explore the serene backwaters and lush green landscapes of God's Own Country.",
  },
];

export const bookings: Booking[] = [
  {
    id: "b1",
    pnr: "4528176394",
    userId: currentUser.id,
    train: trains[0], // Rajdhani Express
    date: "2023-10-15",
    classType: "ac2Tier",
    passengers: [
      {
        name: "Rahul Sharma",
        age: 32,
        gender: "male",
        berth: "lower",
      },
      {
        name: "Priya Sharma",
        age: 28,
        gender: "female",
        berth: "upper",
      },
    ],
    status: "confirmed",
    fare: 5780,
    bookingTime: "2023-09-25T14:30:00",
    paymentId: "pay_JK6wqWTYu8",
  },
  {
    id: "b2",
    pnr: "8736125490",
    userId: currentUser.id,
    train: trains[2], // Duronto Express
    date: "2023-11-20",
    classType: "ac3Tier",
    passengers: [
      {
        name: "Rahul Sharma",
        age: 32,
        gender: "male",
        berth: "side-lower",
      },
    ],
    status: "confirmed",
    fare: 2950,
    bookingTime: "2023-10-10T09:45:00",
    paymentId: "pay_KL8xrXUzv9",
  }
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: "pm1",
    type: "card",
    name: "Credit/Debit Card",
    icon: "credit-card",
  },
  {
    id: "pm2",
    type: "upi",
    name: "UPI",
    icon: "smartphone",
  },
  {
    id: "pm3",
    type: "netbanking",
    name: "Net Banking",
    icon: "building-bank",
  },
  {
    id: "pm4",
    type: "wallet",
    name: "Mobile Wallets",
    icon: "wallet",
  },
];

export const adminUser: User = {
  id: "admin1",
  name: "Admin User",
  email: "admin@railbooker.com",
  phone: "9999888877",
  isAdmin: true,
};

export const getTrainsByRoute = (fromStation: string, toStation: string): Train[] => {
  return trains.filter(
    (train) => 
      (train.from.code === fromStation || train.from.name.toLowerCase().includes(fromStation.toLowerCase())) && 
      (train.to.code === toStation || train.to.name.toLowerCase().includes(toStation.toLowerCase()))
  );
};

export const getClassTypeLabel = (classType: ClassType): string => {
  switch (classType) {
    case 'sleeper': return 'Sleeper Class (SL)';
    case 'ac3Tier': return 'AC 3 Tier (3A)';
    case 'ac2Tier': return 'AC 2 Tier (2A)';
    case 'acFirstClass': return 'AC First Class (1A)';
    default: return 'Unknown';
  }
};

export const getClassTypeShortLabel = (classType: ClassType): string => {
  switch (classType) {
    case 'sleeper': return 'SL';
    case 'ac3Tier': return '3A';
    case 'ac2Tier': return '2A';
    case 'acFirstClass': return '1A';
    default: return 'Unknown';
  }
};
