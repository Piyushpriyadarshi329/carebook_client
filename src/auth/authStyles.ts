import {StyleSheet} from 'react-native';
export const AuthStyles = StyleSheet.create({
  loginContainer: {justifyContent: 'center', marginTop: 5},
  authFieldRow: {
    marginHorizontal: 30,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderBottomWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    width: '80%',
    color: 'black',
  },
  text: {
    marginLeft: 10,
    flex: 1,
    color: 'black',
  },
});
