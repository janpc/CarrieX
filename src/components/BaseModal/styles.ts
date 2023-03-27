import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0008',
  },
  modalContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'absolute'
  },
  modal: {
    width: '100%',
    paddingHorizontal: 34,
    paddingVertical: 50,
    backgroundColor:'white',
    borderRadius: 30,
    justifyContent: 'center',
  },
});