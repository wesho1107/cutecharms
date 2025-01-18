import { useCharms } from '@/hooks/useCharms';
import React, { useState } from 'react'
import { Alert, StyleSheet, Modal, Pressable, View, Text, ScrollView, Image, Dimensions } from 'react-native';

interface SelectionModalProps {
    modalVisible: boolean | undefined
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectionModal: React.FC<SelectionModalProps> = ({ modalVisible, setModalVisible }) => {
    const { charms, loading, error } = useCharms();
      const numColumns = 3;
      const screenWidth = Dimensions.get('window').width;
      const itemWidth = (screenWidth - 80) / numColumns;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Selection has been closed.');
                setModalVisible(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Your Charms</Text>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.charmsContainer}>
                            {charms.map((charm) => (
                                <View key={charm.id} style={[styles.charmItem, { width: itemWidth }]}>
                                    <View style={styles.charmImageContainer}>
                                        <Image source={charm.image} style={styles.charmImage} />
                                    </View>
                                    <Text style={styles.charmName}>{charm.name}</Text>
                                    <Text style={styles.charmQuantity}>x{charm.quantity}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(false)}>
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        marginVertical: 100,
        minWidth: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
    },
    charmsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 16,
    },
    charmItem: {
        aspectRatio: 1,
        alignItems: 'center',
    },
    charmImageContainer: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    charmImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    charmName: {
        marginTop: 8,
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    charmQuantity: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});

export default SelectionModal