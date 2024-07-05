import React, {useEffect} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useForm, useController, UseControllerProps} from 'react-hook-form';
import {launchImageLibrary} from 'react-native-image-picker';

import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  addNewContact,
  updateContactDetail,
} from '../../features/contact/contact.slice';
import styles from './index.style';
import {ContactUpdatelProps} from '../../types';
import {onLoading} from '../../features/global-loading/global-loading.slice';
import {DEFAULT_PHOTO} from '../../assets/img/profile-pic';

type FormValues = {
  id: string;
  firstName: string;
  lastName: string;
  age: number | null;
  photo: string;
};

const Input = ({
  name,
  control,
  defaultValue,
}: UseControllerProps<FormValues>) => {
  const {field} = useController({
    control,
    defaultValue,
    name,
  });
  return (
    <TextInput
      value={field.value?.toString()}
      onChangeText={field.onChange}
      style={styles.inputField}
      keyboardType={name === 'age' ? 'numeric' : 'default'}
    />
  );
};

const ContactUpdate = ({navigation}: ContactUpdatelProps) => {
  const dispatch = useAppDispatch();
  const {contact} = useAppSelector(state => state.contact);
  const {isLoading} = useAppSelector(state => state.globalLoading);
  const {control, handleSubmit, setValue, getValues, watch} =
    useForm<FormValues>();

  const watchPhoto = watch('photo', '');

  const onUpdateContact = async (data: FormValues) => {
    dispatch(onLoading(true));
    await dispatch(updateContactDetail(data));
    dispatch(onLoading(false));
    navigation.goBack();
  };

  const onCreateContact = async (data: FormValues) => {
    dispatch(onLoading(true));
    await dispatch(addNewContact(data));
    dispatch(onLoading(false));
    navigation.goBack();
  };

  const onSaveBtnPressed = (data: FormValues) => {
    if (data.id) {
      onUpdateContact(data);
    } else {
      onCreateContact(data);
    }
  };

  const onSelectPhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: true,
    });

    if (result) {
      if (result.assets) {
        const ext = result.assets[0].type;
        if (result.assets?.length > 0) {
          setValue(
            'photo',
            `data:${result.assets[0].type};base64,${result.assets[0].base64}` ||
              '',
          );
        }
      }
    }
  };

  useEffect(() => {
    if (contact) {
      setValue('id', contact.id);
      setValue('photo', contact.photo);
    } else {
      setValue('photo', DEFAULT_PHOTO);
    }
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleSubmit(onSaveBtnPressed)}
          disabled={isLoading}>
          <Text
            style={isLoading ? styles.saveTextDisabled : styles.saveTextActive}>
            Save
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: watchPhoto !== '' ? watchPhoto : DEFAULT_PHOTO,
        }}
        height={50}
        width={50}
        borderRadius={100}
      />

      <TouchableOpacity onPress={onSelectPhoto}>
        <Text>Edit Photo</Text>
      </TouchableOpacity>
      <Text>Firstname</Text>
      <Input
        name="firstName"
        control={control}
        defaultValue={contact?.firstName}
      />
      <Text>Lastname</Text>
      <Input
        name="lastName"
        control={control}
        defaultValue={contact?.lastName}
      />
      <Text>Age</Text>
      <Input name="age" control={control} defaultValue={contact?.age} />
    </View>
  );
};

export default ContactUpdate;
