import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ContactDetails, UpdateContactForm} from './contact.model';
import contactService from './contact.service';
import {ToastAndroid} from 'react-native';

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface ContactState extends AsyncState {
  contacts: ContactDetails[];
  contact: ContactDetails | null;
}

const initialState: ContactState = {
  contact: null,
  contacts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getContacts = createAsyncThunk('get-contacts', async () => {
  try {
    const res = await contactService.getContacts();
    return res;
  } catch (error: any) {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }
});

export const getContactDetails = createAsyncThunk(
  'get-contact-details',
  async (id: string) => {
    try {
      const res = await contactService.getContactDetails(id);
      return res;
    } catch (error: any) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  },
);

export const addNewContact = createAsyncThunk(
  'add-contact',
  async (contact: UpdateContactForm) => {
    try {
      await contactService.createContact(contact);
      const res = await contactService.getContacts();
      ToastAndroid.show('Create success', ToastAndroid.LONG);
      return res;
    } catch (error: any) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  },
);

export const updateContactDetail = createAsyncThunk(
  'update-contact-details',
  async (contact: ContactDetails) => {
    try {
      const {id, ...rest} = contact;
      await contactService.updateContact(id, rest);
      const res = await contactService.getContactDetails(id);
      ToastAndroid.show('Update success', ToastAndroid.LONG);
      return res;
    } catch (error: any) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  },
);

export const deleteContact = createAsyncThunk(
  'delete-contact',
  async (id: string) => {
    try {
      await contactService.deleteContact(id);
      const res = await contactService.getContacts();
      ToastAndroid.show('Delete success', ToastAndroid.LONG);
      return res;
    } catch (error: any) {
      ToastAndroid.show('failed to delete contact', ToastAndroid.LONG);
    }
  },
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setEmptyPhoto: (state, action) => {
      if (state.contact?.photo) state.contact.photo = action.payload;
    },
    resetContact: state => {
      state.contact = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContacts.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload?.data.data || [];
      })
      .addCase(getContacts.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(getContactDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getContactDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contact = action.payload?.data.data || null;
      })
      .addCase(getContactDetails.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(updateContactDetail.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateContactDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contact = action.payload?.data.data || null;
      })
      .addCase(updateContactDetail.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(addNewContact.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(addNewContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload?.data.data || [];
      })
      .addCase(addNewContact.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(deleteContact.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload?.data.data || state.contacts;
      })
      .addCase(deleteContact.rejected, state => {
        state.isLoading = false;
        state.isError = true;
        state.contacts = state.contacts;
      });
  },
});

export const {setEmptyPhoto, resetContact} = contactSlice.actions;

export default contactSlice.reducer;
