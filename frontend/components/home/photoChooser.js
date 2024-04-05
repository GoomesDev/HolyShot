import React, { useState, useEffect } from "react"
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useNavigation } from "@react-navigation/native"
import moment from 'moment'

export const usePhotoPicker = () => {
    const navigation = useNavigation()
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
        })

        if (!result.canceled) {
            await saveImages(result.assets)
            navigation.navigate('Gallery')
        }
    }

    const saveImages = async (assets) => {
        const newImages = []
        for (const asset of assets) {
            const fileName = asset.uri.split('/').pop()
            const newPath = FileSystem.documentDirectory + fileName
            const uniqueId = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

            try {
                await FileSystem.copyAsync({
                    from: asset.uri,
                    to: newPath,
                })
                newImages.push({ ...asset, uri: newPath, updated_at: uniqueId })
            } catch (error) {
                console.error('Erro ao salvar imagem:', error)
            }

            setImages(newImages)
            console.log('INFO', newImages)
        }
    }

    return { handleChoosePhoto , images }     
}