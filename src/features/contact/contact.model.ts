export interface ContactDetails {
  id: string;
  firstName: string;
  lastName: string;
  age: number | null;
  photo: string;
}

export interface ContactApiResponse {
  message: string;
}

export interface GetContactsResponse extends ContactApiResponse {
  data: ContactDetails[];
}

export interface GetContactDetailsResponse extends ContactApiResponse {
  data: ContactDetails;
}

export interface UpdateContactForm {
  firstName: string;
  lastName: string;
  age: number | null;
  photo: string;
}
