import { ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getAllCargos } from '../api';
import { setCargos, setSearch, setLowPrice, setHighPrice } from '../store/cargoSlice';
import CargoCard from '../components/CargoCard';
import Spinner from '../components/Spinner';
import { commonStyles } from '../styles/common'

export default function CargosListScreen({ navigation }) {
    const dispatch = useDispatch();
    const { cargos } = useSelector((store) => store.cargo);
    const { searchText } = useSelector((store) => store.cargo);
    const { searchLowPrice } = useSelector((store) => store.cargo);
    const { searchHighPrice } = useSelector((store) => store.cargo);

    useEffect(() => {
        getAllCargos(searchText, searchLowPrice, searchHighPrice).then(data => {
            dispatch(setCargos(data?.cargos))
        })
    }, [dispatch]);

    const handleSearch = () => {
        getAllCargos(searchText, searchLowPrice, searchHighPrice).then(data => {
            dispatch(setCargos(data?.cargos))
        })
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <TextInput
                    style={[styles.input, commonStyles.rounded_sm, commonStyles.shadow_sm]}
                    placeholder="Название"
                    value={searchText}
                    onChangeText={(text) => text !== '' ? dispatch(setSearch(text)) : dispatch(setSearch(undefined))}
                    placeholderTextColor={'#aeb2b6'}
                    onSubmitEditing={handleSearch}
                />
                <TextInput
                    keyboardType='numeric'
                    style={[styles.input, commonStyles.rounded_sm, commonStyles.shadow_sm]}
                    placeholder="Цена от"
                    value={searchLowPrice}
                    onChangeText={(text) => Number(text) !== 0 ? dispatch(setLowPrice(text)) : dispatch(setLowPrice(undefined))}
                    placeholderTextColor={'#aeb2b6'}
                    onSubmitEditing={handleSearch}
                />
                <TextInput
                    keyboardType='numeric'
                    style={[styles.input, commonStyles.rounded_sm, commonStyles.shadow_sm]}
                    placeholder="Цена до"
                    value={searchHighPrice}
                    onChangeText={(text) => Number(text) !== 0 ? dispatch(setHighPrice(text)) : dispatch(setHighPrice(undefined))}
                    placeholderTextColor={'#aeb2b6'}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity style={[styles.button, commonStyles.rounded_sm, commonStyles.shadow]} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Поиск</Text>
                </TouchableOpacity>
            </View>
            {cargos && cargos.length > 0 ? (
                cargos.map((cargo) => <CargoCard key={cargo.uuid} {...cargo} style={commonStyles.shadow} navigation={navigation} />)
            ) : (
                !cargos && <Spinner />
            )}
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: 10,
        gap: 10,
        backgroundColor: '#ADD8E6',
    },
    input: {
        flex: 1,
        backgroundColor: '#212529',
        paddingHorizontal: 12,
        paddingVertical: 2,
        marginRight: 8,
        color: 'white',
        fontSize: 12,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    button: {
        backgroundColor: '#CD5C5C',
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
    },
});