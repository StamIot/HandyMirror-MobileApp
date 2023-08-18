import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

// Utilitaire
import * as Utilities from '../src/utilities/utilities';

const UserProfilePicture = ({ photoUri, onPhotoPress }) => {
    return (
        <TouchableOpacity onPress={onPhotoPress}>
            <Image source={photoUri ? { uri: photoUri } : require('../assets/images/Default_UserProfilePicture.png')} style={{ width: 100, height: 100, borderRadius: 100, backgroundColor: Utilities.color.light.antiquewhite }} />
        </TouchableOpacity>
    );
};

export default UserProfilePicture;
