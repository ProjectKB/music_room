import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import Player from './Player/Player';
import TabBarButton from './TabBarButton';
import {
  faHome,
  faMusic,
  faSearch,
  faCalendar,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import ShowPlayerContext from '../contexts/ShowPlayerContext';

const TabBar = ({state, navigation}) => {
  const {showPlayer} = useContext(ShowPlayerContext);

  return (
    <View>
      {showPlayer ? <Player /> : null}
      <View style={styles.tabBarButtonContainer}>
        {[
          ['Home', faHome, 27],
          ['Playlist', faMusic, 23],
          ['Search', faSearch, 24],
          ['Event', faCalendar, 22],
          ['Chat', faCommentDots, 24],
        ].map(([title, icon, size]) => (
          <TabBarButton
            title={title as string}
            icon={icon as IconDefinition}
            size={size as number}
            navigation={{...navigation}}
            state={{...state}}
            key={title as string}
          />
        ))}
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
    backgroundColor: '#292929',
  },
});
