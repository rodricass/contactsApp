import { createSelector } from '@reduxjs/toolkit';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootState } from '../../../redux/rootReducer';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../styles/colors';

/*  List of contacts specific contact snippet
    It is a generic contact snippet

    Props:
        contactId: id of the contact to render
*/

interface Props {
  contactId: string;
}

export const ContactSnippet = ({ contactId }: Props) => {
  const width = Dimensions.get('window').width * 0.13;
  const navigation = useNavigation();

  // Retrieve only the necessary contact data from the store
  const selectContactData = createSelector(
    (state: RootState) => state.contacts.byId,
    (contacts) => {
      const fullContact = contacts[contactId];

      return {
        name: fullContact?.name,
        companyName: fullContact?.companyName,
        isFavorite: fullContact?.isFavorite,
        smallImageURL: fullContact?.smallImageURL,
      };
    },
  );
  const { name, companyName, isFavorite, smallImageURL } = useSelector(
    selectContactData,
    shallowEqual,
  );

  // Contact snippet on press function handlers. On press it redirects you to the details screen of this specific contact
  const _onPressHandler = () => {
    navigation.navigate('ContactDetails', { contactId });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={_onPressHandler}>
      <View style={styles.imageContainer}>
        {smallImageURL ? (
          <Image
            source={{ uri: smallImageURL }}
            style={{ ...styles.smallImage, width }}
          />
        ) : (
          <View style={{ ...styles.noImage, width }}>
            <FontAwesome5Icon
              name="user"
              color={colors.grey.dark}
              size={25}
              solid
            />
          </View>
        )}
      </View>
      <View
        style={{
          ...styles.dataContainer,
        }}>
        <View style={styles.favoriteContainer}>
          {isFavorite && (
            <FontAwesome5Icon
              name="star"
              color={colors.yellow}
              size={13}
              solid
            />
          )}
        </View>
        <View>
          <Text style={styles.name}>{name}</Text>
          {companyName && companyName !== '' ? (
            <Text style={styles.companyName}>{companyName}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const memoizedContactSnippet = React.memo(ContactSnippet);

export default memoizedContactSnippet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '4%',
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignContent: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: colors.grey.light,
  },
  smallImage: { resizeMode: 'cover', aspectRatio: 0.9 },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey.light,
    aspectRatio: 0.9,
  },
  dataContainer: {
    flex: 1,
    paddingVertical: '3%',
    flexDirection: 'row',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: { fontSize: 19, color: colors.text.dark },
  companyName: { fontSize: 14, color: colors.text.ligth },
  favoriteContainer: {
    width: '12%',
    paddingTop: '2%',
    alignItems: 'flex-end',
    paddingRight: '1.3%',
  },
});
