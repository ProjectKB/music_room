import React, {useState, useEffect} from 'react';
import ShowPlayerContext from '../contexts/ShowPlayerContext';
import PlaylistContext, {playlistTemplate} from '../contexts/PlaylistContext';
import SongIndexContext from '../contexts/SongIndexContext';
import FetchContext from '../contexts/FetchContext';
import UserContext, {userTemplate} from '../contexts/UserContext';
import MultiModalContext, {
  MultiModalStatus,
} from '../contexts/MultiModalContext';
import FlashMessage from 'react-native-flash-message';
import {DefineUser} from '../api/AuthEndpoint';
import {PlaylistType} from '../types/Types';

const AppContent = (props: {children: React.ReactNode}) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [playlistPlayed, setPlaylistPlayed] = useState(
    playlistTemplate as PlaylistType,
  );
  const [songIndex, setSongIndex] = useState(-1);
  const [mustFetch, setMustFetch] = useState(false);
  const [multiModalContext, setMultiModalContext] =
    useState<MultiModalStatus>('hidden');

  const [user, setUser] = useState(userTemplate);

  useEffect(() => {
    DefineUser().then(res => (res ? setUser(res.data) : null));
  }, []);

  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
        <ShowPlayerContext.Provider value={{showPlayer, setShowPlayer}}>
          <SongIndexContext.Provider value={{songIndex, setSongIndex}}>
            <MultiModalContext.Provider
              value={{multiModalContext, setMultiModalContext}}>
              <PlaylistContext.Provider
                value={{playlistPlayed, setPlaylistPlayed}}>
                <FetchContext.Provider value={{mustFetch, setMustFetch}}>
                  {props.children}
                </FetchContext.Provider>
              </PlaylistContext.Provider>
            </MultiModalContext.Provider>
          </SongIndexContext.Provider>
        </ShowPlayerContext.Provider>
      </UserContext.Provider>
      <FlashMessage position="top" />
    </>
  );
};

export default AppContent;
