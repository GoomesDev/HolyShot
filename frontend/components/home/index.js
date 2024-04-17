import React , { useState } from "react"
import { 
    StyleSheet,
    View, 
    Text, 
    TouchableOpacity,
    Image,
    ImageBackground
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { usePhotoPicker } from "./photoChooser"
import { Ionicons } from '@expo/vector-icons'

export default function Home() {
    const navigation = useNavigation()
    const { handleChoosePhoto , TextDialog } = usePhotoPicker()

    React.useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    return (
        <View style={styles.container}>
            <Image
                style={styles.titleImage}
                source={require('../../assets/icon.png')}
            />

            <ImageBackground
                source={require('../../assets/mainbg.jpg')}
                style={styles.imgContainer}
                resizeMode="cover"
            >

            </ImageBackground>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.btn} 
                    onPress={handleChoosePhoto}
                >
                    <Text style={styles.btnText}>Carregar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.btn} 
                    onPress={() => navigation.navigate('Gallery')}
                >
                    <Text style={styles.btnText}>Galeria</Text>
                </TouchableOpacity>
            </View>

            <TextDialog />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    imgContainer: {
        width: '100%',
        height: 420,
        backgroundColor: '#fff'
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '96%',
        height: 160,
    },
    btn: {
        height: 56,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row'
    },
    btnText: {
        color: '#000',
        fontSize: 22,
    },
    titleImage: {
        width: 200, 
        height: 60, 
        resizeMode: 'contain',
        marginTop: 56,
    },
  })