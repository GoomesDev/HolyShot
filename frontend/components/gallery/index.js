import React, { useState, useEffect } from "react"
import { View, Image, StyleSheet } from "react-native"
import * as FileSystem from 'expo-file-system'
import { usePhotoPicker } from "../home/photoChooser"

export default function Gallery() {
    const {images} = usePhotoPicker()

    useEffect(() => {
        loadImages()
    }, [])

    const loadImages = async () => {
        console.log(images)
    }

    return (
        <View style={styles.container}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        borderColor: '#fff',
        borderWidth: 2,
        width: 200,
        height: 200,
        margin: 5,
    },
})
