import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Image } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'; // Assuming this is a custom hook in your project

// Call WebBrowser.maybeCompleteAuthSession() to handle any potential pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  // Warm up the browser for faster authentication flow (if applicable)
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive && setActive({ session: createdSessionId });
        console.log('Signed in successfully!');
      } else {
        // Handle cases where a session ID wasn't created (e.g., MFA required)
        console.log('Additional steps needed (MFA, etc.)');
        // Use signIn or signUp functions provided by useOAuth for further actions
      }
    } catch (error) {
      console.error("OAuth Error:", error);
    }
  }, []);

  return (
    <View style={tw`flex flex-1 justify-center items-center text-white`}>
      <Image style={tw`absolute w-full h-full -z-10`} source={require('../assets/images/gym1.jpg')} />
      <Text style={tw`text-center text-3xl font-bold mt-10 mx-10 text-white`}>Your ultimate Workout Plan is Here!</Text>
      <Text style={tw`text-center text-sm text-gray-600 mt-2 mx-10 text-white`}>Find Exercise and Keep Track on your plan</Text>
      <TouchableOpacity onPress={onPress} style={tw`bg-green-500 mt-10 rounded px-4 py-2 rounded-3xl w-8/12 p-3`}>
        <Text style={tw`text-white text-center font-bold text-2xl`}>Get Started</Text>
      </TouchableOpacity>
      <View style={tw`flex flex-row mt-4`}>
        <Text style={tw`font-bold text-white`}>Don't have an account? </Text>
        <Text style={tw`text-green-400 font-bold`}>Sign Up</Text>
      </View>
    </View>
  );
};

export default LoginScreen;
