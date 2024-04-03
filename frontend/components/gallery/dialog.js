import { 
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native"

export const Dialog = ({ open , handleClose }) => {


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
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    btn: {
        width: '91%',
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
        height: 374,
        width: 326.8,
        paddingTop: 4,
        marginBottom: 12,
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
})