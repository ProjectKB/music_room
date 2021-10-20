/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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
  conversation: any;
  conversationName: string;
};

const ChatMessageElement = (props: ChatMessageElementProps) => {
  const getDateFormat = (msg: Message, date: Date, index: number) => {
    const minutes = date.getMinutes();
    const timeStr = `${date.getHours()}:${
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

  /*

    * color
    * espace between msg:
        * espace between msg:
            * +5mn
            * -5mn with prev -> border modified depends on sender
            * -5mn with next -> border modified depends on sender
            * -5mn with next & prev -> border modified depends on sender

  */

  const getMessageStyle = (msg: Message, date: Date, index: number) => {
    const minutes = date.getMinutes();

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

  const date = new Date(props.msg.date);
  const dateToDisplay = getDateFormat(props.msg, date, props.index);
  const dateChangeable = !dateToDisplay.display;
  const [showDate, setShowDate] = useState(dateToDisplay.display);

  return (
    <>
      {showDate && (
        <View style={{alignItems: 'center'}}>
          <Text>{dateToDisplay.content}</Text>
        </View>
      )}
      <TouchableOpacity
        style={{alignItems: 'flex-end'}}
        onPress={() => dateChangeable && setShowDate(!showDate)}>
        <Text style={styles.message} key={props.msg.date}>
          {props.msg.content}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default ChatMessageElement;

const styles = StyleSheet.create({
  message: {
    color: 'white',
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginTop: 5,
    borderRadius: 20,
  },
});
