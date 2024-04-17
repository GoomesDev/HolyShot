import React, { useState, useRef } from "react"
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useNavigation } from "@react-navigation/native"
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { 
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from "react-native"

export const usePhotoPicker = () => {
    const navigation = useNavigation()
    const [images, setImages] = useState([])
    const [open, setOpen] = useState(false)
    const [selectedAssets, setSelectedAssets] = useState(null)

    const inputRef = useRef()
    
    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleChoosePhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
            alert('Desculpe, precisamos de permissão para acessar suas fotos')
            return
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: false,
        })

        if (!result.canceled) {
            setSelectedAssets(result.assets)
            handleOpen()
        }
    }

    const saveWithPhrase = async () => {
        let currentPhrase = inputRef.current.value
        handleClose()
        await saveImages(selectedAssets, currentPhrase)
    }

    const saveImages = async (assets, currentPhrase) => {
        const newImages = []
        if(currentPhrase) {
            console.log(currentPhrase)
            for (const asset of assets) {
            const fileName = asset.uri.split('/').pop()
            const newPath = FileSystem.documentDirectory + fileName
            const uniqueId = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

            try {
                await FileSystem.copyAsync({
                    from: asset.uri,
                    to: newPath,
                })
                newImages.push({ ...asset, uri: newPath, updated_at: uniqueId, phrase: currentPhrase})
            } catch (error) {
                console.error('Erro ao salvar imagem:', error)
            }

            try {
                const existingImages = await AsyncStorage.getItem('selectedImages')
                const updatedImages = existingImages ? [...JSON.parse(existingImages), ...newImages] : newImages
                await AsyncStorage.setItem('selectedImages', JSON.stringify(updatedImages))
            } catch (error) {
                console.error('Erro ao salvar imagens selecionadas:', error)
            }

            setImages(newImages)
            console.log('INFO', newImages)
            navigation.navigate('Gallery')
            }
        }        
    }

    const TextDialog = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={open}
                onRequestClose={handleClose}
            >
                <View style={styles.container}>
                    <TextInput
                        style={styles.inputContainer}
                        placeholder="Insira a descrição da obra..."
                        maxLength={30}
                        ref={inputRef}
                        onChangeText={text => inputRef.current.value = text }
                    />

                    <TouchableOpacity 
                        style={styles.btn} 
                        onPress={saveWithPhrase}
                    >
                        <Text style={styles.btnText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }

    return { handleChoosePhoto, images, TextDialog }     
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    inputContainer: {
        backgroundColor: '#fff',
        padding: 10,
        width: '96%',
        borderWidth: 1,
        fontSize: 20
    },
    btn: {
        width: '96%',
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
})