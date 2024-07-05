import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contactCard: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerButton: {
    marginHorizontal: 15,
  },
  textName: {
    fontSize: 16,
    color: '#000000',
    marginVertical: 8,
  },
  textAge: {
    fontSize: 12,
  },
});

export default styles;
