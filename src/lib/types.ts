
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isAdmin: boolean;
}

export interface Station {
  id: string;
  name: string;
  code: string;
  city: string;
  state: string;
}

export interface Train {
  id: string;
  name: string;
  number: string;
  from: Station;
  to: Station;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distance: string;
  availableSeats: {
    sleeper: number;
    ac3Tier: number;
    ac2Tier: number;
    acFirstClass: number;
  };
  fare: {
    sleeper: number;
    ac3Tier: number;
    ac2Tier: number;
    acFirstClass: number;
  };
}

export type ClassType = 'sleeper' | 'ac3Tier' | 'ac2Tier' | 'acFirstClass';

export interface Passenger {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  berth?: 'lower' | 'middle' | 'upper' | 'side-lower' | 'side-upper';
}

export interface Booking {
  id: string;
  pnr: string;
  userId: string;
  train: Train;
  date: string;
  classType: ClassType;
  passengers: Passenger[];
  status: 'confirmed' | 'waiting' | 'cancelled' | 'completed';
  fare: number;
  bookingTime: string;
  paymentId?: string;
}

export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking' | 'wallet';
  name: string;
  icon: string;
}
