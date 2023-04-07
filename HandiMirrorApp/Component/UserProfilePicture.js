import React from "react";
import { Image, TouchableOpacity } from 'react-native';
import  { Color } from  "../GlobalStyles"

const UserProfilePicture = ({ photoUri, onPhotoPress }) => {
  return (
    <TouchableOpacity onPress={onPhotoPress}>
        <Image
        source={photoUri ? { uri: photoUri } : require('../assets/Default_UserProfilePicture.png')}
        style={{ width: 100, height: 100, borderRadius: 100, backgroundColor: Color.antiquewhite}}
        />
    </TouchableOpacity>
  );
}

export default UserProfilePicture;