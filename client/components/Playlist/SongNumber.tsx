/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';
import {PlaylistType} from '../../types/Types';

const SongNumber = (playlist: PlaylistType) => {
  const songNumber = playlist.songs !== undefined ? playlist.songs.length : 0;

  return (
    <Text style={{color: 'white'}}>
      {songNumber.toString()} song{songNumber > 1 ? 's' : ''}
    </Text>
  );
};

export default SongNumber;
