// Change the imports to get the action creators

import {
  cleanError,
  getContactDataFailure,
  getContactDataRequest,
  getContactsDataSuccess,
  switchFavoriteContact,
} from '../src/redux/contactsSlice';

import reducer from '../src/redux/contactsSlice';

const contactsArray = [
  {
    name: 'Scooby Doo',
    id: '17',
    companyName: 'Mystery Incorporated',
    isFavorite: false,
    smallImageURL:
      'https://s3.amazonaws.com/technical-challenge/v3/images/scooby-doo-small.jpeg',
    largeImageURL:
      'https://s3.amazonaws.com/technical-challenge/v3/images/scooby-doo-large.jpeg',
    emailAddress: 'Scooby.Doo@mysteryincorporated.com',
    birthdate: '1920-08-19',
    phone: {
      mobile: '202-783-8287',
    },
    address: {
      street: '400 1st St Nw',
      city: 'Washington',
      state: 'DC',
      country: 'US',
      zipCode: '10038',
    },
  },
  {
    name: 'Hermione Granger',
    id: '5',
    companyName: 'Gryffindor',
    isFavorite: true,
    smallImageURL:
      'https://s3.amazonaws.com/technical-challenge/v3/images/hermione-granger-small.jpg',
    largeImageURL:
      'https://s3.amazonaws.com/technical-challenge/v3/images/hermione-granger-large.jpg',
    emailAddress: 'Hermione.Granger@gryffindor.com',
    birthdate: '1964-02-10',
    phone: {
      work: '815-467-1244',
      home: '815-467-0487',
      mobile: '815-467-5007',
    },
    address: {
      street: '641 W Lake St',
      city: 'Chicago',
      state: 'IL',
      country: 'US',
      zipCode: '60661',
    },
  },
];

describe('actions', () => {
  it('should create an action to add a todo set the get request begining', () => {
    const expectedAction = {
      type: getContactDataRequest.type,
      payload: true,
    };
    expect(getContactDataRequest(true)).toEqual(expectedAction);
  });
  it('should create an action to add a todo set the get request ending', () => {
    const expectedAction = {
      type: getContactDataRequest.type,
      payload: false,
    };
    expect(getContactDataRequest(false)).toEqual(expectedAction);
  });
  it('should create an action to save the contacts data', () => {
    const expectedAction = {
      type: getContactsDataSuccess.type,
      payload: contactsArray,
    };
    expect(getContactsDataSuccess(contactsArray)).toEqual(expectedAction);
  });
  it('should create an action to swicht the contact favorite field', () => {
    const expectedAction = {
      type: switchFavoriteContact.type,
      payload: '1',
    };
    expect(switchFavoriteContact('1')).toEqual(expectedAction);
  });
  it('should create an action to set the request failure', () => {
    const expectedAction = {
      type: getContactDataFailure.type,
      payload: 'error',
    };
    expect(getContactDataFailure('error')).toEqual(expectedAction);
  });
  it('should create an action to delete the errors', () => {
    const expectedAction = {
      type: cleanError.type,
    };
    expect(cleanError()).toEqual(expectedAction);
  });
});

describe('reducer', () => {
  it('should set the loading flag as true', () => {
    expect(reducer(undefined, getContactDataRequest(true))).toEqual({
      contacts: {
        byId: {},
        favoriteContacts: [],
        otherContacts: [],
      },
      loading: true,
      error: null,
    });
  });
  it('should set the loading flag as false', () => {
    expect(reducer(undefined, getContactDataRequest(false))).toEqual({
      contacts: {
        byId: {},
        favoriteContacts: [],
        otherContacts: [],
      },
      loading: false,
      error: null,
    });
  });
  it('should save the contact successfully', () => {
    expect(reducer(undefined, getContactsDataSuccess(contactsArray))).toEqual({
      contacts: {
        byId: { '17': contactsArray[0], '5': contactsArray[1] },
        favoriteContacts: ['5'],
        otherContacts: ['17'],
      },
      loading: false,
      error: null,
    });
  });
  it('should set the request error', () => {
    expect(reducer(undefined, getContactDataFailure('error'))).toEqual({
      contacts: {
        byId: {},
        favoriteContacts: [],
        otherContacts: [],
      },
      loading: false,
      error: 'error',
    });
  });
  it('should clean the request error', () => {
    expect(
      reducer(
        {
          contacts: {
            byId: {},
            favoriteContacts: [],
            otherContacts: [],
          },
          loading: false,
          error: 'error',
        },
        cleanError(),
      ),
    ).toEqual({
      contacts: {
        byId: {},
        favoriteContacts: [],
        otherContacts: [],
      },
      loading: false,
      error: null,
    });
  });
});
