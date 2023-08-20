/**
 * Date: 18/05/2023
 * Author: Majorel Sophie
 * Version: 1.0.0
 * ------------------------------------------------------------------------------------------------------------
 *
 */

import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

// Utilitaire
import Tools from '../utilities/Tools'; // charge index.js

const UserProfilePicture = ({ photoUri, onPhotoPress }) => {
    return (
        <TouchableOpacity onPress={onPhotoPress}>
            <Image
                source={
                    photoUri
                        ? { uri: photoUri }
                        : require('../assets/images/Default_UserProfilePicture.png')
                }
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    backgroundColor: Tools.color.light.antiquewhite,
                }}
            />
        </TouchableOpacity>
    );
};

export default UserProfilePicture;
