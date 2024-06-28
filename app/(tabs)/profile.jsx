import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Link } from 'expo-router';
import tw from 'twrnc'
const profile = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      // ... Pedometer logic from previous code ...
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={tw`text-xl`}>Steps taken in the last 24 hours: {pastStepCount}</Text>
      <Text style={tw`text-xl`}>Walk! And watch this go up: {currentStepCount}</Text>
      <CircularProgress value={currentStepCount} />
      <Text style={tw`text-2xl`}>Exercise Now <Link style={tw`text-red-400`} href={'/home'}>Go</Link></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap:8,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default profile;
