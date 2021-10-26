/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Conversation} from '../../types/Types';

const days = ['mon', 'tue', 'wed', 'thi', 'fri', 'sat', 'sun'];

const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

type ChatElementProps = {
  lastElem: boolean;
  friendName: string;
  conversation: Conversation;
  navigation: any;
};

const ChatElement = (props: ChatElementProps) => {
  const [flex, setFlex] = useState(false);

  const lastMessage = props.conversation.messages.slice(-1)[0];
  const messageToShow =
    lastMessage.from !== props.friendName
      ? 'You: ' + lastMessage.content
      : lastMessage.content;

  const date = new Date(lastMessage.date);
  const dateNow = Date.now();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const moreThanToday = dateNow > date.getTime() + 2073600000;
  const moreThanWeek = dateNow > date.getTime() + 14515200000;

  const paddingBottom = {paddingBottom: props.lastElem ? 0 : 15};

  const timeToShow = () => {
    if (moreThanWeek) {
      return ` • ${date.getDay()} ${months[date.getMonth()]}.`;
    } else if (moreThanToday) {
      return ` • ${days[date.getDay()]}.`;
    } else {
      return ` • ${hours < 10 ? '0' + hours : hours}:${
        minutes < 10 ? '0' + minutes : minutes
      }`;
    }
  };

  const onTextLayout = (e: any) => {
    setFlex(e.nativeEvent.lines.length > 1);
  };

  return (
    <TouchableOpacity
      style={[{flexDirection: 'row'}, paddingBottom]}
      onPress={() =>
        props.navigation.navigate('Chat Detail', {
          conversationName: props.friendName,
        })
      }>
      <Image
        style={styles.imageContainer}
        source={require('../../assets/img/default_avatar.png')}
      />
      <View style={{justifyContent: 'center', flex: 1}}>
        <Text style={styles.friendName}>{props.friendName}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{color: 'white', flex: flex ? 1 : 0}}
            numberOfLines={1}
            onTextLayout={onTextLayout}>
            {messageToShow}
          </Text>
          <Text style={{color: 'white'}}>{timeToShow()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatElement;

const styles = StyleSheet.create({
  imageContainer: {
    height: 70,
    width: 70,
    marginRight: 10,
  },
  friendName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
});
