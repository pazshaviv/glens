import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, Animated } from 'react-native';
// import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import {AntDesign, Feather} from 'react-native-vector-icons/Ionicons';
import QuestionsBox from '../components/QuestionsBox'
import CountdownTimer from '../components/CountdownTimer'

const VideoScreen = ({ navigation }) => {
    const [showQuestions, setShowQuestions] = useState(true)
    const toggleShowQuestions = () => setShowQuestions(!showQuestions)

    return (
        <View style={styles.screen}>
            <ImageBackground source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/glens-tom.appspot.com/o/photos%2F0JJYEqIQrKg53s33BrRDY7Abkez1%2F6b59cc15-d918-40a0-9145-e79a2a66cfb8?alt=media' }} style={{ width: '100%', height: '100%' }}>
                <View style={styles.headerMenu}>
                    <TouchableOpacity>
                        <Image style={styles.switchCamera}source={require('../../assets/switch-camera.png')} />
                        {/* <MaterialCommunityIcons name="camera-switch" style={styles.switchCamera} /> */}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleShowQuestions}>
                    <Image style={styles.questionsButton}source={require('../../assets/questionsButton.png')} />
                    </TouchableOpacity>
                </View>

                {showQuestions ? 
                <View style={styles.questionsBoxContainer}>
                    <QuestionsBox />
                </View>
                 : null}

                <View style={styles.bottomMenu}>
                    {/* <Ionicons style={styles.timer} name='ios-timer' size={50} /> */}
                    <View style={styles.timerContainer}>
                        <CountdownTimer time={60}/>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image source={require('../../assets/buttonVideoChatHangUp.png')} />
                    </TouchableOpacity>
                    <Image style={styles.selfSquare} source={require('../../assets/self-video.png')} />
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    window: {
        flex: 1,
        flexDirection: 'column',
    },
    headerMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginTop: 40
    },
    questionsButton: {
        width: 54,
        height: 54,
        marginRight: 30
    },
    switchCamera: {
        width: 50,
        height: 50,
        marginLeft: 30
    },
    bottomMenu: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        top: 10,
        marginBottom: 36
    },
    selfSquare: {
        width: 100,
        height: 150,
        marginRight: 10,
        marginBottom: 8
    },
    timerContainer: {
        marginLeft: 30
    },
    questionsBoxContainer: {
        marginTop: -72,
        height: 250,
        borderColor: 'green',
        borderWidth: 0,
        width: '1%'
    }
});

export default VideoScreen;
