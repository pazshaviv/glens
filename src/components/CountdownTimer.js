import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import ProgressCircle from 'react-native-progress-circle'
// import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AnimatedProgressWheel from 'react-native-progress-wheel';

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const CountdownTimer = ({ time }) => {
    let [count, setCount] = useState(time);

    useInterval(() => {
        count > 0 ?
            setCount(count - 1)
            : null
    }, 1000);

    return (
        <>
        <View style={styles.progressCircle}>
            <AnimatedProgressWheel
                size={55}
                width={3}
                color={'rgb(51, 133, 255)'}
                backgroundColor={'rgb(64, 64, 64)'}
                progress={0}
                animateFromValue={100}
                duration={(time + 2) * 1000}></AnimatedProgressWheel>
            <View style={styles.timeContainer}>
                <Text style={styles.time}>{count}</Text>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    progressCircle: {
        marginBottom: 7,
        transform: [{ rotate: '270deg'}]
    },
    timeContainer: {
        position: 'absolute',
        width: 55,
        height: 55,
        borderRadius: 50,
        backgroundColor: 'transparent',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 0,
        justifyContent: 'center',
    },
    time: {
        fontSize: 22,
        transform: [{ rotate: '90deg'}]
    }
})

export default CountdownTimer;
