import React, {useEffect} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {FAB} from 'react-native-elements';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {getContacts, resetContact} from '../../features/contact/contact.slice';
import ContactCardComponent from '../../components/contact/card.contact';
import {onLoading} from '../../features/global-loading/global-loading.slice';
import {HomeScreenProps} from '../../types';
import {Text} from 'react-native-svg';

const Home = ({navigation}: HomeScreenProps) => {
  const dispatch = useAppDispatch();
  const {contacts} = useAppSelector(state => state.contact);
  const {isLoading} = useAppSelector(state => state.globalLoading);

  const initData = async () => {
    dispatch(onLoading(true));
    await dispatch(getContacts());
    dispatch(onLoading(false));
  };

  const onBtnCreatePressed = () => {
    dispatch(resetContact());
    navigation.navigate('ContactUpdate');
  };

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Contacts',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('ContactUpdate')}>
          <Text>New</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <FlatList
        data={contacts}
        renderItem={({item}) => (
          <ContactCardComponent
            key={item.id}
            contact={item}
            navigation={() =>
              navigation.navigate('ContactDetails', {id: item.id})
            }
          />
        )}
        onEndReachedThreshold={0.5}
        refreshing={isLoading}
        onRefresh={initData}
      />
      <FAB
        title="+"
        placement="right"
        onPress={onBtnCreatePressed}
        titleStyle={{fontSize: 24}}
      />
    </View>
  );
};

export default Home;
