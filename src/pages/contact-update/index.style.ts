import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputField: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
  },
  saveTextActive: {
    fontWeight: '600',
    color: 'blue',
    fontSize: 16,
  },
  saveTextDisabled: {
    fontWeight: '600',
    color: 'grey',
    fontSize: 16,
  },
});

export default styles;
