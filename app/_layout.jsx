import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

    const [fontsLoaded, error] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
      });

      useEffect(() => {
        if(error) throw error;

        if(fontsLoaded) SplashScreen.hideAsync();
      },[fontsLoaded, error])

      if(!fontsLoaded && error) return null;

    return(
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    )


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
};

export default RootLayout;

const styles = StyleSheet.create({});
