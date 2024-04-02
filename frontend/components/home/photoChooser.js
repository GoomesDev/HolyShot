import React, { useState, useEffect } from "react"
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

export const usePhotoPicker = () => {
    const [images, setImages] = useState([])

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
            allowsMultipleSelection: true,
            selectionLimit: 10,
        })

        console.log(result)

        if (!result.canceled) {
            await saveImages(result.assets)
        }
    }

    const saveImages = async (assets) => {
        const newImages = []
        for (const asset of assets) {
            const fileName = asset.uri.split('/').pop()
            const newPath = FileSystem.documentDirectory + fileName

            try {
                await FileSystem.copyAsync({
                    from: asset.uri,
                    to: newPath,
                })
                newImages.push({ ...asset, uri: newPath })
                console.log(`Imagem salva em: ${newPath}`)
            } catch (error) {
                console.error('Erro ao salvar imagem:', error)
            }

            setImages(newImages)
            console.log('funfou', newImages)
        }
    }

    return { handleChoosePhoto , images }     
}