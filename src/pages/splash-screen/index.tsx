import React, {useEffect} from 'react';
import {View, Image, StatusBar} from 'react-native';
import {SplashScreenProps} from '../../types';

const SplashScreen = ({navigation}: SplashScreenProps) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#4586DF',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{width: 160, height: 100}}
        source={require('../../assets/img/icon.png')}></Image>
      <StatusBar hidden={true} />
    </View>
  );
};

export default SplashScreen;
