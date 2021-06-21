import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import CustomModal from '../CustomModal';
import SearchAddSongModal from './SearchAddSongModal';
import SearchSongList from './SearchSongList';

const SearchSong = props => {
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  const [modalVisibility, setModalVisibility] = useState(false);
  const [songToAdd, setSongToAdd] = useState(undefined);
  const [playlistCollection, setPlaylistCollection] = useState(undefined);

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
            playlistCollection={playlistCollection}
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
