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
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(58, 53, 65, 0.87)'
  },
  infoText: {
    fontSize: 12,
    color: 'rgba(58, 53, 65, 0.87)'
  },
  deliveryContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  delivered: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(58, 53, 65, 0.38)'

  },
  delivery: {
    fontSize: 12,
    fontWeight: '500',
    color: '#DF0000',
  },
  truckContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(223, 0, 0, 0.1)',
    marginRight: 10
  }
});