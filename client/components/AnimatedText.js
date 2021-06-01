/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import TextTicker from 'react-native-text-ticker';

const AnimatedText = props => {
  const AnimatedTextCallback = useCallback(() => {
    return (
      <TextTicker
        duration={10000}
        loop
        scroll={false}
        repeatSpacer={50}
        marqueeDelay={1000}>
        {props.text}
      </TextTicker>
    );
  }, [props.callback]);

  return <AnimatedTextCallback />;
};

export default AnimatedText;
