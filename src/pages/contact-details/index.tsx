import React, {useEffect} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  deleteContact,
  getContactDetails,
} from '../../features/contact/contact.slice';
import styles from './index.style';
import {ContactDetailProps} from '../../types';
import {onLoading} from '../../features/global-loading/global-loading.slice';

const ContactDetail = ({navigation, route}: ContactDetailProps) => {
  const {id} = route.params;
  const dispatch = useAppDispatch();
  const {contact} = useAppSelector(state => state.contact);

  const initData = async () => {
    dispatch(onLoading(true));
    await dispatch(getContactDetails(id));
    dispatch(onLoading(false));
  };

  const onDeleteBtnPressed = async () => {
    Alert.alert('Delete', 'Are you sure want to delete this contact?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: onConfirmDelete},
    ]);
  };

  const onConfirmDelete = async () => {
    try {
      dispatch(onLoading(true));
      await dispatch(deleteContact(id));
      dispatch(onLoading(false));
      navigation.goBack();
    } catch (error) {
      dispatch(onLoading(false));
    }
  };

  useEffect(() => {
    initData();
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtonContainer}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('ContactUpdate')}>
            <Icon name="edit" size={23} color={'blue'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeleteBtnPressed}>
            <Icon name="trash" size={23} color={'red'} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.contactCard}>
        <Image
          source={{
            uri: contact?.photo,
          }}
          height={100}
          width={100}
          borderRadius={100}
        />
        <Text style={styles.textName}>
          {contact?.firstName} {contact?.lastName}
        </Text>
        <Text style={styles.textAge}>Age: {contact?.age}</Text>
      </View>
    </View>
  );
};

export default ContactDetail;
