import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import gameData from '../components/GameData';
import { ICarousel } from '../types';

const [items, setItem] = useState<ICarousel['items']>(gameData);
const [index, setIndex] = useState<ICarousel['index']>(0);

const _renderItem = ({item,index}: ICarousel ) => (
  <View>
    <Text></Text>
    <Text></Text>
  </View>
);

const GameCard = () => {
  <View style={styles.carousel}>
    <Text></Text>
    <Carousel 
      layout={"default"}
      ref={ref => carousel = ref}
      data={items}
      sliderWidth={300}
      itemWidth={300}
      renderItem={this._renderItem}
      onSnapToItem = { i => setIndex(() => i) } 
    />
  </View>
};

export default GameCard;

const styles = StyleSheet.create({
  carousel: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center'
  },
  item: {
    
  }
});