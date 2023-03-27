import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    borderBottomColor: 'rgba(58, 53, 65, 0.12)',
    borderBottomWidth: 1,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgba(58, 53, 65, 0.87)'
  },
  infoText: {
    fontSize: 12,
    color: 'rgba(58, 53, 65, 0.87)'
  },
  date: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  dateText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#DF0000',
  }
});