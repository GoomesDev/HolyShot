import React, { useState, useEffect } from "react"
import {
    ScrollView, 
    View, 
    Image, 
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native"
import * as FileSystem from 'expo-file-system'
import { Dialog } from "./dialog"
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Gallery() {
    const [open, setOpen] = useState(false)
    const [images, setImages] = useState([])
    const [selectedImage, setSelectedImage] = useState(null)
    const [phrase, setPhrase] = useState('')

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = (file) => {
        setSelectedImage(file.uri)
        setPhrase(file.phrase)
        setOpen(true)
    }

    useEffect(() => {
        listFiles()
    }, [])

    const listFiles = async () => {
        try {
            const existingImages = await AsyncStorage.getItem('selectedImages')
            const imageInfoArray = existingImages ? JSON.parse(existingImages) : []
            setImages(imageInfoArray)
            console.log(images)
          } catch (error) {
            console.error('Erro ao recuperar imagens:', error)
          }
    }

    const deleteAllImages = async () => {
        try {
            const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
            const imageFiles = files.filter(file => file.endsWith('.jpeg') || file.endsWith('.jpg'))

            for (const file of imageFiles) {
                await FileSystem.deleteAsync(`${FileSystem.documentDirectory}${file}`)
            }

            setImages([])
        } catch (error) {
            console.error('Erro ao apagar imagens:', error)
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {images.map((file, index) => (
                <View 
                 key={index} 
                 style={styles.imageContainer}
                >
                    <TouchableWithoutFeedback onPress={() => handleOpen(file)}> 
                        <Image
                            source={{ uri: file.uri }}
                            style={styles.image}
                        />
                    </TouchableWithoutFeedback>
                </View>
            ))}
            <Dialog open={open} handleClose={handleClose} image={selectedImage} listFiles={listFiles} phrase={phrase}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    image: {
        height: '84%',
        width: '96%',
    },
    imageContainer: {
        alignItems: 'center',
        height: 134,
        width: 106.8,
        paddingTop: 4,
        marginBottom: 12,
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
})
