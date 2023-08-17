import {StyleSheet} from 'react-native';
export const AuthStyles = StyleSheet.create({
  loginContainer: {flex: 4, justifyContent: 'center'},
  authFieldRow: {
    marginHorizontal: 30,
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderBottomWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    flex: 1,
    color: 'black',
  },
});
