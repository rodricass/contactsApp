import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../styles/colors';

/*  Contact header component
    Where the name, photo and company are located

    Props:
        name: contact name
        company: contact company name
        image: URL to the contact photo
*/

interface Props {
  name: string;
  company: string;
  image: string;
}

export const ContactHeader = ({ name, company, image }: Props) => {
  const width = Dimensions.get('window').width * 0.35;

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={{ ...styles.image, width }} />
      ) : (
        <View style={{ ...styles.noImage, width }}>
          <FontAwesome5Icon
            name="user"
            color={colors.grey.dark}
            size={65}
            solid
          />
        </View>
      )}
      <Text style={styles.name}>{name}</Text>
      {!!company && <Text style={styles.company}>{company}</Text>}
    </View>
  );
};

export const memoizedContactHeader = React.memo(ContactHeader);

export default memoizedContactHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '7%',
    borderBottomWidth: 1.5,
    borderBottomColor: colors.grey.light,
  },
  image: { resizeMode: 'cover', aspectRatio: 0.9 },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey.light,
    aspectRatio: 0.9,
  },
  name: {
    fontSize: 25,
    color: colors.text.dark,
    marginTop: '3%',
    fontWeight: '900',
  },
  company: {
    color: colors.text.ligth,
  },
});
