import { Stack } from "expo-router";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Text } from "react-native";
import LoginScreen from "@/components/LoginScreen";
import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return null;
    }
  },
};
const CLERK_PUBLISHABLE_KEY =
  "pk_test_ZGl2aW5lLWdsb3d3b3JtLTEuY2xlcmsuYWNjb3VudHMuZGV2JA";
export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <Text>Hello</Text>
      </SignedIn>
      <SignedOut>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        {/* <LoginScreen /> */}
      </SignedOut>
    </ClerkProvider>
  );
}
