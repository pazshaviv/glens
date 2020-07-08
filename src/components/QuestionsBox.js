import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper'
import data from '../../assets/questions.js'
import {Dimensions } from "react-native";

const Card = ({ card }) => (
  <View style={styles.questionContainer}>
      <Text>{card.text}</Text>
      {/* <Text style={{ fontFamily: 'ArialRoundedMTBold' }}>{card.text}</Text> */}
  </View>
)

const QuestionsBox = () => {
  // const [index, setIndex] = React.useState(0)
  const screen_width=Dimensions.get('window').width
  // console.log(screen_width)
  return (
    <Swiper
      // stackSize={3}
      // stackSeparation={0.2}
      // stackScale={1}
      animateOverlayLabelsOpacity
      overlayOpacityHorizontalThreshold={1}
      inputOverlayLabelsOpacityRangeX={[-screen_width / 3, -1, 0, 1, screen_width / 3]}
      marginTop={0}
      infinite
      verticalSwipe={false}
      backgroundColor={'transparent'}
      cards={data}
      cardIndex={0}
      renderCard={card => <Card card={card} />}
      disableTopSwipe
      disableBottomSwipe
      animateCardOpacity
      overlayLabels={{
        right: {
          element: <Image style={styles.questionsLabel} source={require('../../assets/like.png')} />,
          title: 'like',
          style: {
            label: {
              
            },
            wrapper: {
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginTop: -15,
              marginLeft: 0
            }
          }
        },
        left: {
          element: <Image style={styles.questionsLabel}  source={require('../../assets/dislike.png')} />,
          title: 'nope',
          style: {
            label: {
              backgroundColor: 'red',
              color: 'white',
              fontSize: 18,
            },
            wrapper: {
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginTop: -15,
              marginLeft: 0
            }
          }
        }
      }}
    />
  )
}

const styles = StyleSheet.create({
  questionContainer: {
    backgroundColor: 'rgba(247,248,250,0.7)',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: '84%',
    borderRadius: 10,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: 'grey'
  },
  questionsLabel: {
    height: 70, 
    width: 70, 
    borderColor: 'white', 
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: 'white'
  }
})

export default QuestionsBox;
