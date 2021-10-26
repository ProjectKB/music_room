/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Message} from '../../types/Types';

const months = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

type ChatMessageElementProps = {
  msg: Message;
  index: number;
  messagesNbr: number;
  conversation: any;
  conversationName: string;
};

const ChatMessageElement = (props: ChatMessageElementProps) => {
  const getDateFormat = (msg: Message, date: Date, index: number) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeStr = `${hours < 10 ? '0' + hours : hours}:${
      minutes < 10 ? '0' + minutes : minutes
    }`;
    const dateStr = `${months[date.getMonth()]} ${date.getDate()}, `;

    if (index === 0) {
      return {content: dateStr + timeStr, display: true};
    } else {
      const prevDate = new Date(props.conversation.messages[index - 1].date);
      const dayDif = prevDate.getDay() !== date.getDay();
      const minDif = date.getTime() > prevDate.getTime() + 600000;

      return {
        content: dayDif ? dateStr + timeStr : timeStr,
        display: dayDif || minDif,
      };
    }
  };

  const getMessageStyle = (msg: Message, date: Date, index: number) => {
    let noRadiusTop: boolean;
    let noRadiusBottom: boolean;
    let noExtraMarge: boolean;

    const msgFromUs = msg.from !== props.conversationName;

    if (index === 0) {
      const nextMsg = props.conversation.messages[index + 1];

      if (nextMsg) {
        const nextLessThanFive =
          date.getTime() > new Date(nextMsg.date).getTime() - 300000;
        const nextSameSender = msg.from === nextMsg.from;

        noRadiusBottom = nextLessThanFive && nextSameSender;
        noExtraMarge = nextLessThanFive;
      }
    } else if (index === props.messagesNbr) {
      const prevMsg = props.conversation.messages[index - 1];

      const prevLessThanFive =
        date.getTime() < new Date(prevMsg.date).getTime() + 300000;
      const prevSameSender = msg.from === prevMsg.from;

      noRadiusTop = prevLessThanFive && prevSameSender;
    } else {
      const prevMsg = props.conversation.messages[index - 1];
      const nextMsg = props.conversation.messages[index + 1];

      const prevLessThanFive =
        date.getTime() < new Date(prevMsg.date).getTime() + 300000;
      const nextLessThanFive =
        date.getTime() > new Date(nextMsg.date).getTime() - 300000;
      const prevSameSender = msg.from === prevMsg.from;
      const nextSameSender = msg.from === nextMsg.from;

      noRadiusTop = prevLessThanFive && prevSameSender;
      noRadiusBottom = nextLessThanFive && nextSameSender;
      noExtraMarge = nextLessThanFive;
    }

    return {
      alignement: {alignItems: msgFromUs ? 'flex-end' : 'flex-start'},
      message: {
        backgroundColor: msgFromUs ? '#ff4884' : '#606570',
        borderTopLeftRadius: msgFromUs ? 20 : noRadiusTop ? 5 : 20,
        borderBottomLeftRadius: msgFromUs ? 20 : noRadiusBottom ? 5 : 20,
        borderTopRightRadius: msgFromUs ? (noRadiusTop ? 5 : 20) : 20,
        borderBottomRightRadius: msgFromUs ? (noRadiusBottom ? 5 : 20) : 20,
        marginRight: !msgFromUs ? 100 : 0,
        marginLeft: !msgFromUs ? 0 : 100,
        marginBottom: noExtraMarge ? 3 : 13,
        color: msgFromUs ? 'black' : 'white',
      },
    };
  };

  const date = new Date(props.msg.date);
  const dateToDisplay = getDateFormat(props.msg, date, props.index);
  const msgStyle = getMessageStyle(props.msg, date, props.index);
  const dateChangeable = !dateToDisplay.display;
  const [showDate, setShowDate] = useState(dateToDisplay.display);

  return (
    <>
      {showDate && (
        <View style={{alignItems: 'center', marginBottom: 3}}>
          <Text style={{color: '#a1a1a1'}}>{dateToDisplay.content}</Text>
        </View>
      )}
      <TouchableOpacity
        style={msgStyle.alignement as StyleProp<ViewStyle>}
        onPress={() => dateChangeable && setShowDate(!showDate)}>
        <Text
          style={[styles.message, msgStyle.message as StyleProp<ViewStyle>]}
          key={props.msg.date}>
          {props.msg.content}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default ChatMessageElement;

const styles = StyleSheet.create({
  message: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
});
