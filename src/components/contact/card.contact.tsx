import React from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {ContactDetails} from '../../features/contact/contact.model';

interface ContactCardComponentProps {
  contact: ContactDetails;
  navigation: (id: string) => void;
}

const ContactCardComponent = ({
  contact,
  navigation,
}: ContactCardComponentProps) => {
  return (
    <View
      key={`contact_component_${contact.id}`}
      style={{
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        // elevation: 1,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.2,
      }}>
      <Image
        source={{
          uri: contact?.photo,
        }}
        height={25}
        width={25}
        borderRadius={100}
      />
      <TouchableOpacity
        onPress={() => navigation(contact.id)}
        style={{
          flexDirection: 'row',
          padding: 5,
          flex: 2,
          alignItems: 'center',
        }}>
        <View
          style={{
            marginRight: 10,
          }}></View>
        <View>
          <Text style={{color: '#000000'}}>{contact.firstName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ContactCardComponent;
