import { View, Text, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { resetCargo, setCargo } from '../store/cargoSlice';
import { getCargo, imagePlaceholder, ReplaceIP } from '../api';
import { commonStyles } from '../styles/common'
import Spinner from '../components/Spinner';

export default function CargoInfoScreen({ navigation, route }) {
    const { uuid } = route.params;
    const dispatch = useDispatch();
    const { cargo } = useSelector((store) => store.cargo);
    const [src, setSrc] = useState(imagePlaceholder);

    // const handlePress = () => {
    //     navigation.navigate('CargosList');
    // };

    useEffect(() => {
        getCargo(uuid)
            .then(data => {
                dispatch(setCargo(data))
                if (data.photo) {
                    setSrc({ uri: ReplaceIP(data.photo) })
                }
            })

        return () => {
            dispatch(resetCargo());
        };
    }, [dispatch]);
    return (
        <View style={styles.ViewContent}>
            {cargo ? (
                <View>
                    {/* <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                        <TouchableOpacity
                            onPress={handlePress}
                        >
                            <Text style={styles.text}>Грузы</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}> / {cargo.marking}</Text>
                    </View> */}
                    <View style={[styles.card, commonStyles.shadow, commonStyles.rounded]}>
                        <View style={[styles.imageWrapper, commonStyles.rounded]}>
                            <Image
                                style={styles.image}
                                source={src}
                                onError={() => setSrc(imagePlaceholder)}
                            />
                        </View>
                        <View style={styles.cargo}>
                            <Text style={[commonStyles.title, commonStyles.centerText]}>{cargo.name}</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Категория: {cargo.category}</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Описание: {cargo.description}</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Цена: {cargo.price} руб.</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Масса: {cargo.weight} кг.</Text>
                            <Text style={[commonStyles.text, commonStyles.centerText]}>Объем: {cargo.capacity} м3</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <Spinner />
            )}
        </View >
    );
}

const styles = StyleSheet.create({
    ViewContent: {
        flexGrow: 1,
        alignItems: 'stretch',
        padding: 10,
    },
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        paddingHorizontal: 0,
        paddingTop: 0,
        overflow: 'hidden',
        gap: 14,
        paddingBottom: 10,
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
    },
    imageWrapper: {
        overflow: 'hidden',
        aspectRatio: 16 / 10,
        margin: 0,
    },
    cargo: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        paddingHorizontal: 4,
        gap: 6,
    },
});