import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const PlayPauseButton = props => (
  <FontAwesomeIcon
    color={props.color}
    size={props.size}
    icon={props.songState === 'paused' ? props.faTrue : props.faFalse}
  />
);

export default PlayPauseButton;
