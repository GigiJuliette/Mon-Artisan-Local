export interface ListingUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
}

export interface ListingSpeciality {
  id: number;
  name: string;
}

export interface ListingData {
  id: number;
  title: string;
  description: string;
  status: "waiting" | "approved" | "rejected" | string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: ListingUser;
  specialities: ListingSpeciality[];
  address: string;
  city: string;
}

export interface Listing {
  listing: ListingData;
}
