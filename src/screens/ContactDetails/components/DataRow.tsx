import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../../styles/colors';

/*  Contact data row
    It is a generic data container

    Props:
        field: name of the data field
        data: data to show
        extraData: extra data for the case it is needed
*/

interface Props {
  field: string;
  data: string;
  extraData?: string;
}

export const DataRow = ({ field, data, extraData }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.field}>{`${field}:`}</Text>
      <View style={styles.dataRow}>
        <Text style={styles.data}>{data}</Text>
        {extraData && <Text style={styles.extraData}>{extraData}</Text>}
      </View>
    </View>
  );
};

const memoizedDataRow = React.memo(DataRow);

export default memoizedDataRow;

const styles = StyleSheet.create({
  container: {
    paddingVertical: '6%',
    borderBottomWidth: 1.5,
    borderBottomColor: colors.grey.light,
  },
  field: { fontSize: 11, color: colors.text.ligth, fontWeight: 'bold' },
  dataRow: {
    flexDirection: 'row',
    marginTop: '2%',
    justifyContent: 'space-between',
  },
  data: { fontSize: 15, color: colors.text.dark, fontWeight: 'bold' },
  extraData: { fontSize: 12, color: '#9e9e9e' },
});
