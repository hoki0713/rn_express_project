import React from 'react';
import { Image } from 'react-native';

const Logo = props => {
  return (
    <Image style={props.style} source={require("../assets/diary.png")} />
  );
};

export default Logo;