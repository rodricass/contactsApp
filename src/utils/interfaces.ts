// Global interfaces to be used throughout the app

export interface Contact {
  name: string;
  id: string;
  companyName: string;
  isFavorite: boolean;
  smallImageURL: string;
  largeImageURL: string;
  emailAddress: string;
  birthdate: string;
  phone?: {
    work?: string;
    home?: string;
    mobile?: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
}

export type RootStackParamList = {
  ContactDetails: { contactId: string };
};

export interface SectionListData {
  section: {
    title?: string;
    data?: any;
  };
}
