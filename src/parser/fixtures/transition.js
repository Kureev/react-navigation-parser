import React, { PropTypes } from 'react';
import { TouchableOpacity } from 'react-native';

export default function ComponentWithTransition(props) {
  return <TouchableOpacity onClick={props.navigate('foo', {})} />;
}

ComponentWithTransition.propTypes = {
  navigate: PropTypes.func,
};
