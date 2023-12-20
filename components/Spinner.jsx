import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default function Spinner() {
    return (
        <View style={styles.ActivityWrapper}>
            <ActivityIndicator size="large" color="#212529" />
        </View >
    )
}

const styles = StyleSheet.create({
    ActivityWrapper: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});