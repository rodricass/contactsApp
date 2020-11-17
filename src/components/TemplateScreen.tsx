import React, { ReactElement } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Header } from 'react-native-elements';
import colors from '../styles/colors';

/* Template to use in the different screens, it has a customizable header

    Props:
        leftComponent: JSX component to be rendered at the left in the header
        centerComponent: JSX component to be rendered at the center in the header
        rightComponent: JSX component to be rendered at the right in the header
        screenStyle: container template view style
        leftComponentStyle: left header component style
        centerComponentStyle: center header component style
        rightComponentStyle: right header component style
        children: children components to be rendered inside the template
*/

interface Props {
  leftComponent?: ReactElement;
  centerComponent?: ReactElement;
  rightComponent?: ReactElement;
  screenStyle?: ViewStyle;
  leftComponentStyle?: ViewStyle;
  centerComponentStyle?: ViewStyle;
  rightComponentStyle?: ViewStyle;
}

const TemplateScreen: React.FunctionComponent<Props> = ({
  leftComponent,
  centerComponent,
  rightComponent,
  screenStyle,
  leftComponentStyle,
  centerComponentStyle,
  rightComponentStyle,
  children,
  ...rest
}) => {
  return (
    <View style={{ ...styles.container, ...screenStyle }} {...rest}>
      <Header
        barStyle="dark-content"
        placement={'center'}
        leftComponent={leftComponent}
        centerComponent={centerComponent}
        rightComponent={rightComponent}
        containerStyle={styles.containerStyle}
        leftContainerStyle={{
          ...styles.leftComponentStyle,
          ...leftComponentStyle,
        }}
        rightContainerStyle={{
          ...styles.rightComponentStyle,
          ...rightComponentStyle,
        }}
        centerContainerStyle={{
          ...styles.centerComponentStyle,
          ...centerComponentStyle,
        }}
      />
      {children}
    </View>
  );
};

export default TemplateScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  containerStyle: {
    backgroundColor: colors.header,
    alignItems: 'flex-end',
    paddingBottom: '3%',
  },
  leftComponentStyle: { marginLeft: -4, marginTop: 5 },
  rightComponentStyle: { marginTop: 5 },
  centerComponentStyle: { justifyContent: 'center' },
});
