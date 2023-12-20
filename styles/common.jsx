import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    rounded: {
        borderRadius: 6,
    },
    rounded_sm: {
        borderRadius: 4,
    },

    shadow: {
        shadowColor: '#4133B7',
        shadowOffset: { width: 0, height: 0.5 * 16 },
        shadowOpacity: 15,
        shadowRadius: 1 * 16,
        elevation: 8,
    },
    shadow_sm: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0.25 * 16 },
        shadowOpacity: 0.25,
        shadowRadius: 0.5 * 16,
        elevation: 8,
    },
    title: {
        color: '#212529',
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        color: '#212529',
        fontSize: 16,
    },
    centerText: {
        textAlign: 'center',
    }
});