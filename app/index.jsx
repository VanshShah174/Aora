import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Redirect , router} from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {

  const { isLoading, isLoggedIn } = useGlobalContext();

  if(!isLoading || !isLoggedIn) return <Redirect href="/home" />

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className=" w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[380px]"
            resizeMode="contain"
          />

          <View className="relative mt-5 ">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8 "
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-300 mt-5 text-center">
            Where Creativity Meets Innovation: embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
          title="Continue with Email"
          handlePress={() => router.push("/sign-in")}
          containerStyles = "w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light"/> 
    
    </SafeAreaView>
  );
}

// Here SafeareaView ensures that content doesn't overlaps
// the Statusbar, bottombar with anything like that

// here the statusbar tag is basically used to show the battery percentage and all other tabs while using an app
//         <View className="w-full flex justify-center items-center min-h-[85vh] px-4">
// here h-[85vh] centered the screen as per the screen size and it is min size of the screen
