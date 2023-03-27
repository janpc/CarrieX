import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderColor: 'rgba(58, 53, 65, 0.23)',
    padding: 15,
    borderRadius: 6,
    textTransform: 'uppercase',
    fontSize: 18,
    marginBottom: 5,
  },
  labelStyle: {
    color: 'rgba(58, 53, 65, 0.68)',
    fontSize: 15,
    marginBottom: -10,
    marginLeft: 10,
    backgroundColor: '#fff',
    zIndex: 1,
    paddingHorizontal: 5,
    marginRight: 'auto',
  },
  error: {
    color: '#DF0000',
    borderColor: '#DF0000'
  }
});