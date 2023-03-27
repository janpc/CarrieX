import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    opacity: 0.5
  },
  modal: {
    padding: 20,
    marginTop: 'auto',
    backgroundColor:'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor:'white',
    borderBottomColor: 'rgba(58, 53, 65, 0.12)',
    borderBottomWidth: 1,
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    padding: 26,
  },
  footer: {
    flex: 1,
    backgroundColor: '#ddd',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    color: 'black',
    padding: 20,
    backgroundColor: '#ddd',
    borderTopWidth: 2,
    borderTopColor: '#ddd',
  }
});