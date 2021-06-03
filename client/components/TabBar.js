/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import Player from './Player';
import TabBarButton from './TabBarButton';
import {
  faHome,
  faMusic,
  faSearch,
  faCalendar,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import ShowPlayerContext from '../contexts/ShowPlayerContext';
import SongIndexContext from '../contexts/SongIndexContext';

const TabBar = ({state, navigation}) => {
  const {showPlayer, setShowPlayer} = useContext(ShowPlayerContext);
  const {songIndex, setSongIndex} = useContext(SongIndexContext);

  const PlayerCallback = useCallback(
    () => (showPlayer ? <Player /> : null),
    [songIndex],
  );

  return (
    <View>
      <PlayerCallback />
      <View style={styles.tabBarButtonContainer}>
        <TabBarButton
          title="Home"
          icon={faHome}
          size={27}
          navigation={{...navigation}}
          state={{...state}}
        />
        <TabBarButton
          title="Playlist"
          icon={faMusic}
          size={23}
          navigation={{...navigation}}
          state={{...state}}
        />
        <TabBarButton
          title="Search"
          icon={faSearch}
          size={24}
          navigation={{...navigation}}
          state={{...state}}
        />
        <TabBarButton
          title="Event"
          icon={faCalendar}
          size={22}
          navigation={{...navigation}}
          state={{...state}}
        />
        <TabBarButton
          title="Chat"
          icon={faCommentDots}
          size={24}
          navigation={{...navigation}}
          state={{...state}}
        />
      </View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBarButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: 'white',
  },
});
