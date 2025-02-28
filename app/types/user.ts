// Define the User structure
export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  notes: string;
  going: boolean | null;
  partyId?: string;
}

// Define the Groups type where partyId (string) maps to an array of Users
export type Groups = Record<string, User[]>;

// Define the EditingParty type
export interface EditingParty {
  partyId: string;
  users: User[];
}
