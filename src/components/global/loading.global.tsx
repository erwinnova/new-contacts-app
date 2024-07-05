import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useAppSelector} from '../../hooks/redux';

const LoadingSpinner = () => {
  return (
    <View
      style={{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flex: 1,
        height: '100%',
        width: '100%',
        opacity: 0.7,
      }}>
      <Text>ddaiwndi adnioawnda andiwaod nadiww</Text>
      <ActivityIndicator color={'#000000'} size={'large'} />
    </View>
  );
};

export default LoadingSpinner;
