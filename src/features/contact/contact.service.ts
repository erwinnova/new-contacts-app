import axios from '../../config/axios';
import {
  GetContactDetailsResponse,
  GetContactsResponse,
  UpdateContactForm,
} from './contact.model';

const getContacts = async () => {
  const response = await axios.get<GetContactsResponse>('/contact');
  return response;
};

const getContactDetails = async (id: string) => {
  const response = await axios.get<GetContactDetailsResponse>(`/contact/${id}`);
  return response;
};

const createContact = async (body: UpdateContactForm) => {
  const response = await axios.post(`/contact`, body);
  return response;
};

const updateContact = async (id: string, body: UpdateContactForm) => {
  const response = await axios.put(`/contact/${id}`, body);
  return response;
};

const deleteContact = async (id: string) => {
  const response = await axios.delete(`/contact/${id}`);
  return response;
};

const contactService = {
  getContacts,
  getContactDetails,
  updateContact,
  createContact,
  deleteContact,
};

export default contactService;
