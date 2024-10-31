import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import GlobalProvider from "../context/GlobalProvider"

// Prevent splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("./fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("./fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("./fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("./fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) {
      console.error("Error loading fonts:", error);
      return;
    }

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;

  return (
    <GlobalProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="/search/[query]" options={{ headerShown: false }} />
    </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});




// function hideAsync(): Promise<boolean>
// Hides the native splash screen immediately. 
// Be careful to ensure that your app has content ready to display when you hide the splash screen,
//  or you may see a blank screen briefly. See the "Usage" section for an example


// Makes the native splash screen (configured in app.json) remain visible until hideAsync is called.

// Important note: It is recommended to call this in global scope without awaiting,
//  rather than inside React components or hooks, because otherwise this might be called too late,
//   when the splash screen is already hidden.

//   return (
//     <>
//       <Text>Header</Text>
//       <Slot />
//       <Text>Footer</Text>
//     </>
//   );
  //   return (
  //     <View>
  //       <Text>RootLayout</Text>
  //     </View>
  //   )

