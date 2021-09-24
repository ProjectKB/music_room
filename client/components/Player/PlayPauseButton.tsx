import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

type PlayPauseButtonProps = {
  color: string;
  size: number;
  songState: string;
  faTrue: any;
  faFalse: any;
};

const PlayPauseButton = (props: PlayPauseButtonProps) => (
  <FontAwesomeIcon
    color={props.color}
    size={props.size}
    icon={
      props.songState === 'paused' || props.songState === 'ended'
        ? props.faTrue
        : props.faFalse
    }
  />
);

export default PlayPauseButton;
