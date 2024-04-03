import React, { useState, useEffect } from "react"
import {
    ScrollView, 
    View, 
    Image, 
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Text 
} from "react-native"
import * as FileSystem from 'expo-file-system'
import { Dialog } from "./dialog"

export default function Gallery() {
    const [open, setOpen] = useState(false)
    const [images, setImages] = useState([])

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    useEffect(() => {
        deleteAllImages()
    }, [])

    const listFiles = async () => {
        try {
            const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
            const imageFiles = files.filter(file => file.endsWith('.jpeg') || file.endsWith('.jpg'))
            setImages(imageFiles)
        } catch (error) {
            console.error('Erro ao listar arquivos:', error)
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

    console.log('Imagens no diretório:', images)

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {images.map((file, index) => (
                <View 
                 key={index} 
                 style={styles.imageContainer}
                >
                    <TouchableWithoutFeedback onPress={handleOpen}> 
                        <Image
                            source={{ uri: `${FileSystem.documentDirectory}${file}` }}
                            style={styles.image}
                        />
                    </TouchableWithoutFeedback>
                </View>
            ))}
            <Dialog open={open} handleClose={handleClose}/>
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
