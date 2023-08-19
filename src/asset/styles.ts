import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  screenContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  scroll: {
    alignSelf: 'stretch',
  },
  scrollContainer: {
    alignSelf: 'stretch',
    flexGrow: 1,
  },
  flexRowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gap10: {
    gap: 10,
  },
});
