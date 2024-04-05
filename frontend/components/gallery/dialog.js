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

export const Dialog = ({ open , handleClose, image, listFiles }) => {
    const navigation = useNavigation()

    const refresh = () => {
        listFiles()
        handleClose()
    }

    const deleteImage = async() => {
        try {
            await FileSystem.deleteAsync(image)
            console.log('Imagem apagada com sucesso!')
            refresh()
        } catch(error) {
            console.error('Error ao apagar a imagem', error)
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
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={handleClose}
                >
                    <Text 
                     style={styles.btnText}
                    >
                        Fechar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
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
                    <Text 
                     style={styles.btnText}
                    >
                        Apagar
                    </Text>
                </TouchableOpacity>
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
    btn: {
        width: 290,
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
    imageContainer: {
        alignItems: 'center',
        height: 444,
        width: 290,
        paddingTop: 4,
        marginBottom: 12,
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    image: {
        height: '84%',
        width: '96%',
    }
})