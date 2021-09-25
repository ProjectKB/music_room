import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {PlaylistType, Setter, Song} from '../../types/Types';
import CustomModal from '../CustomModal';
import SearchAddSongModal from './SearchAddSongModal';
import SearchSongList from './SearchSongList';

type SearchSongProps = {
  playlistCollection: PlaylistType[];
  collection: PlaylistType[] | Song[];

  setMaxResults: Setter<number>;
  setCollection: Setter<PlaylistType[] | Song[]>;
};

const SearchSong = (props: SearchSongProps) => {
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  const [modalVisibility, setModalVisibility] = useState(false);
  const [songToAdd, setSongToAdd] = useState(undefined);

  return (
    <>
      <ScrollView
        style={styles.searchListContainer}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            props.setMaxResults(maxResults => maxResults + 10);
          }
        }}
        scrollEventThrottle={400}>
        <SearchSongList
          searchCollection={props.collection}
          setSongToAdd={setSongToAdd}
          setModalVisibility={setModalVisibility}
          playlistCollection={props.playlistCollection}
        />
      </ScrollView>
      <CustomModal
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        secu={true}
        Component={() => (
          <SearchAddSongModal
            songToAdd={songToAdd}
            setModalVisibility={setModalVisibility}
            playlistCollection={props.playlistCollection}
          />
        )}
      />
    </>
  );
};

export default SearchSong;

const styles = StyleSheet.create({
  searchListContainer: {
    margin: 15,
    marginBottom: 10,
  },
});
