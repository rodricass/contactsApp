import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SectionList, StyleSheet, Text } from 'react-native';
import { fetchContactsData } from '../../redux/contactsSlice';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../redux/rootReducer';
import ContactSnippet from './components/ContactSnippet';
import colors from '../../styles/colors';
import TemplateScreen from '../../components/TemplateScreen';
import { SectionListData } from '../../utils/interfaces';

//  List of contacts

const Contacts = () => {
  const dispatch = useDispatch();

  // Fetch all the contacts data at once when the component is mounted
  useEffect(() => {
    dispatch(fetchContactsData());
  }, []);

  // Retrieve the favorite contacts list
  const selectFavoriteContacts = createSelector(
    (state: RootState) => state.contacts,
    (contacts) => contacts.favoriteContacts,
  );
  const favoriteContacts = useSelector(selectFavoriteContacts);

  // Retrieve the other contacts list
  const selectOtherContacts = createSelector(
    (state: RootState) => state.contacts,
    (contacts) => contacts.otherContacts,
  );
  const otherContacts = useSelector(selectOtherContacts);

  // Specify the contact id as a unique key for each item of the list
  const _keyExtrator = (id: string) => id;
  // Specify how each list item is gonna be rendered
  const _renderItem = ({ item }: { item: string }) => (
    <ContactSnippet contactId={item} />
  );
  // Specify how each list section is gonna be rendered
  const _renderSectionHeader = ({ section: { title } }: SectionListData) => (
    <Text style={styles.section}>{title}</Text>
  );

  // Header center component JSX
  const centerComponent = <Text style={styles.headerText}>Contacts</Text>;

  return (
    <TemplateScreen centerComponent={centerComponent}>
      <SectionList
        sections={[
          { title: 'FAVORITE CONTACTS', data: favoriteContacts },
          { title: 'OTHER CONTACTS', data: otherContacts },
        ]}
        keyExtractor={_keyExtrator}
        renderItem={_renderItem}
        renderSectionHeader={_renderSectionHeader}
        stickySectionHeadersEnabled={true}
      />
    </TemplateScreen>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  section: {
    fontSize: 11,
    backgroundColor: colors.grey.light,
    paddingVertical: '1%',
    paddingLeft: '2.5%',
    color: colors.text.dark,
    fontWeight: 'bold',
  },
  headerText: { fontSize: 16, fontWeight: 'bold' },
});
