import React , { useState } from "react"
import { 
    StyleSheet,
    View, 
    Text, 
    TouchableOpacity
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { usePhotoPicker } from "./photoChooser"

export default function Home() {
    const navigation = useNavigation()
    const {handleChoosePhoto} = usePhotoPicker()

    React.useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>HolyShot</Text>

            <View style={styles.imgContainer}>

            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.btn} 
                    onPress={handleChoosePhoto}
                >
                    <Text style={styles.btnText}>Enviar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.btn} 
                    onPress={() => navigation.navigate('Gallery')}
                >
                    <Text style={styles.btnText}>Galeria</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },

    title: {
        color: '#fff',
        fontSize: 24
    },

    imgContainer: {
        width: '100%',
        height: 320,
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 8,
    },
    btnText: {
        color: '#000',
        fontSize: 22,
      },
  })