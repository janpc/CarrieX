import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    borderBottomColor: 'rgba(58, 53, 65, 0.12)',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgba(58, 53, 65, 0.87)',
    textTransform: 'uppercase',
  },
  infoText: {
    fontSize: 12,
    color: 'rgba(58, 53, 65, 0.87)'
  },
  iconContainer: {
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