import { Contact } from './../utils/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import Axios, { AxiosResponse } from 'axios';
import { normalize, schema } from 'normalizr';
import orderBy from 'lodash/orderBy';
import { Alert } from 'react-native';

// Contacts state slice, here is where all the Redux contacts logic is placed

// Normalizr library result interface
export interface NormalizerResult {
  result: string[];
  entities: { contacts: { [id: string]: Contact } };
}

// Normalized generic data storage structure interface
interface NormalizedObjects<T> {
  byId: { [id: string]: T };
  favoriteContacts: string[];
  otherContacts: string[];
}

// Normalized contacts data storage structure interface
interface ContactsState {
  contacts: NormalizedObjects<Contact>;
  loading: boolean;
  error: string | null;
}

// Initial contacts state
const initialState: ContactsState = {
  contacts: {
    byId: {},
    favoriteContacts: [],
    otherContacts: [],
  },
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    getContactDataRequest(state, action: PayloadAction<boolean>) {
      // Set true the loading flag
      state.loading = action.payload;
      // Delete any previous error
      state.error = null;
    },
    getContactsDataSuccess(state, action: PayloadAction<Contact[]>) {
      const contacts = action.payload;

      // Order retrieve contacts alphabetically by name
      const sortedContacts: Contact[] =
        contacts.length > 0 ? orderBy(contacts, ['name'], ['asc']) : [];

      //Use normalizr library to restructure the requested data as a normalized one
      const contactEntity = new schema.Entity('contacts');
      const normalizedData: NormalizerResult = normalize(sortedContacts, [
        contactEntity,
      ]);
      // Fill the contacts byId state object with the normalized contacts data
      state.contacts.byId = normalizedData.entities.contacts;

      // Reset favoriteContacts and otherContacts array as empty arrays to avoid data corruption
      state.contacts.favoriteContacts = [];
      state.contacts.otherContacts = [];
      // Fill the favoriteContacts and otherContacts arrys with corresponding contacts id
      sortedContacts.map((contact) => {
        if (contact.isFavorite) {
          state.contacts.favoriteContacts.push(contact.id);
        } else {
          state.contacts.otherContacts.push(contact.id);
        }
      });
      // Set false the loading flag and deletes any previous error
      state.loading = false;
      state.error = null;
    },
    switchFavoriteContact(state, action: PayloadAction<string>) {
      // Retrieve the corresponding contact data
      const contact = state.contacts.byId[action.payload];
      const name = contact.name;
      const favorite = contact.isFavorite;

      // Set the array where is located this contact ('favorite' or not)
      const fromArray = favorite
        ? state.contacts.favoriteContacts
        : state.contacts.otherContacts;

      // Set the array where the contact is going to be moved on
      const toArray = favorite
        ? state.contacts.otherContacts
        : state.contacts.favoriteContacts;

      // Search for the correct id in the fromArray and remove it
      const fromIndex = fromArray.indexOf(action.payload);
      if (fromIndex !== -1) {
        fromArray.splice(fromIndex, 1);
      }

      // Search in the sorted toArray for the correct index where to add the contact id
      let i = 0;
      while (name.localeCompare(state.contacts.byId[toArray[i]].name) > 0) {
        i++;
      }

      // If index found then push the contact id in the appropiate place
      if (i < toArray.length) {
        toArray.splice(i, 0, action.payload);
      }

      // Switch the contact isFavorite status
      contact.isFavorite = !contact.isFavorite;
      console.info(state);
    },
    getContactDataFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    cleanError(state) {
      // Deletes any previous error
      state.error = null;
    },
  },
});

// Slice actions to export
export const {
  getContactDataRequest,
  getContactsDataSuccess,
  getContactDataFailure,
  switchFavoriteContact,
  cleanError,
} = contactsSlice.actions;

// Slice reducer to export
export default contactsSlice.reducer;

// Async action, uses Redux-Thunk to perform the contacts data retrieving
export const fetchContactsData = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getContactDataRequest(true));
    const response: AxiosResponse<
      Contact[]
    > = await Axios.get(
      'https://s3.amazonaws.com/technical-challenge/v3/contacts.json',
      { timeout: 8000 },
    );
    const contactsData = response.data;
    dispatch(getContactsDataSuccess(contactsData));
  } catch (error) {
    dispatch(getContactDataFailure(error.message));
    Alert.alert(
      'Error',
      'An error has been occur retrieven the contact list',
      [
        {
          text: 'OK',
          onPress: () => {
            dispatch(cleanError());
          },
        },
      ],
      { cancelable: false },
    );
  }
};
