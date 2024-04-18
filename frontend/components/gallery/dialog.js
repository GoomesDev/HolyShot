import { 
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert
} from "react-native"
import * as FileSystem from 'expo-file-system'
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Dialog = ({ open , handleClose, image, listFiles, phrase }) => {
    const navigation = useNavigation()

    console.log(image, phrase)

    const refresh = () => {
        listFiles()
        handleClose()
    }

    const deleteImage = async() => {
        try {
            let images = await AsyncStorage.getItem('selectedImages')
            images = images ? JSON.parse(images) : []
            const updatedImages = images.filter(img => img.uri !== image)
            await AsyncStorage.setItem('selectedImages', JSON.stringify(updatedImages))
            
            console.log('Imagem apagada com sucesso!')
            refresh()
        } catch (error) {
            console.error('Erro ao apagar a imagem', error)
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={open}
            onRequestClose={handleClose}
        >
            <View style={styles.centeredView}>
                <View
                    style={styles.imageContainer}
                >
                    {image && (
                        <Image
                            source={{ uri: image }}
                            style={styles.image}
                        />
                    )}
                    <Text style={styles.phraseStyle}>"{phrase}"</Text>
                </View>
                
                <View
                    style={styles.btnContainer}
                >
                    <TouchableOpacity
                        onPress={() => Alert.alert(
                            "Tem certeza?",
                            "Quer mesmo deletar esta obra prima?",
                            [
                            { text: "Apagar", onPress: deleteImage },
                            { text: "Cancelar" }
                            ],
                            { cancelable: false }
                        )}
                    >
                        <Ionicons name="trash" size={32} color="red"></Ionicons>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleClose}
                    >
                        <Ionicons name="close" size={32} color="#fff"></Ionicons>
                    </TouchableOpacity>
                </View>
                
                
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    btnText: {
        color: '#000',
        fontSize: 22,
    },
    imageContainer: {
        alignItems: 'center',
        height: 444,
        width: 290,
        paddingTop: 4,
        marginBottom: 12,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    image: {
        height: '84%',
        width: '96%',
    },
    cancelBtn: {
        color: '#fff',
        fontSize: 26,
    },
    btnContainer: {
        width: 290,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    phraseStyle: {
        fontSize: 16,
        marginTop: 20,
        fontStyle: 'italic',
    }
})