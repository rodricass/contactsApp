/* eslint-disable @typescript-eslint/no-unused-vars */
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createSelector } from '@reduxjs/toolkit';
import moment from 'moment';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import TemplateScreen from '../../components/TemplateScreen';
import { switchFavoriteContact } from '../../redux/contactsSlice';
import { RootState } from '../../redux/rootReducer';
import colors from '../../styles/colors';
import { Contact } from '../../utils/interfaces';
import ContactHeader from './components/ContactHeader';
import { RootStackParamList } from '../../utils/interfaces';
import DataRow from './components/DataRow';

// Contact details screen, here you can see all the data of the contact

const ContactDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Retrieve the contact id sent from the 'Contacts' screen
  const route = useRoute<RouteProp<RootStackParamList, 'ContactDetails'>>();
  const contactId = route.params?.contactId;

  // Retrieve all the contact data from the store
  const selectContactData = createSelector(
    (state: RootState) => state.contacts.byId,
    (contacts) => {
      const fullContact: Contact = contacts[contactId];
      return fullContact;
    },
  );
  const contactData = useSelector(selectContactData);

  // Check wheter all the address fields exists and put it all together
  const address =
    contactData?.address &&
    contactData?.address?.city &&
    contactData?.address?.country &&
    contactData?.address?.state &&
    contactData?.address?.street &&
    contactData?.address?.zipCode
      ? `${contactData.address.street}
${contactData.address.city}, ${contactData.address.state} ${contactData.address.zipCode}, ${contactData.address.country}`
      : null;

  // Check for birthday date and format it in the appropiate way
  let formatedBirthDate;
  if (contactData?.birthdate) {
    const birthdate = moment(contactData.birthdate);
    formatedBirthDate = birthdate.format('MMMM D, YYYY');
  }

  // Header left component go back handler function
  const _onBackHandler = () => {
    navigation.goBack();
  };

  // Header left component JSX
  const leftComponent = (
    <TouchableOpacity
      style={styles.leftComponentContainer}
      onPress={_onBackHandler}>
      <FontAwesome5Icon name="chevron-left" size={20} color="#0288d1" />
      <Text style={styles.leftComponentText}>Contacts</Text>
    </TouchableOpacity>
  );

  // Header right component switch contact favorite status
  const _switchFavorite = () => {
    dispatch(switchFavoriteContact(contactData.id));
  };

  // Header right component JSX
  const rightComponent = (
    <TouchableOpacity onPress={_switchFavorite}>
      <FontAwesome5Icon
        name="star"
        size={18}
        color={colors.yellow}
        solid={contactData?.isFavorite ? true : false}
      />
    </TouchableOpacity>
  );
  return (
    <TemplateScreen
      leftComponent={leftComponent}
      leftComponentStyle={styles.leftComponentStyle}
      rightComponent={rightComponent}>
      <ScrollView style={styles.container}>
        <ContactHeader
          name={contactData?.name}
          company={contactData?.companyName}
          image={contactData?.largeImageURL}
        />
        {!!contactData?.phone?.home && (
          <DataRow
            field="PHONE"
            data={contactData.phone.home}
            extraData="Home"
          />
        )}
        {!!contactData?.phone?.mobile && (
          <DataRow
            field="PHONE"
            data={contactData.phone.mobile}
            extraData="Mobile"
          />
        )}
        {!!contactData?.phone?.work && (
          <DataRow
            field="PHONE"
            data={contactData.phone.work}
            extraData="Work"
          />
        )}
        {!!address && <DataRow field="ADDRESS" data={address} />}
        {!!formatedBirthDate && (
          <DataRow field="BIRTHDATE" data={formatedBirthDate} />
        )}
        {!!contactData?.emailAddress && (
          <DataRow field="EMAIL" data={contactData.emailAddress} />
        )}
      </ScrollView>
    </TemplateScreen>
  );
};

export default ContactDetails;

const styles = StyleSheet.create({
  leftComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftComponentText: {
    color: '#0288d1',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: '8%',
  },
  leftComponentStyle: { paddingLeft: '2%' },
  container: {
    paddingHorizontal: '5%',
  },
});
