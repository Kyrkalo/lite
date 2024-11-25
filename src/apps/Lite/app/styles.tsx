import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    centeredView: {
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        width: 320
    },
    loginButton: {
        backgroundColor: '#c6cbef',
        alignItems: 'center',
        borderRadius: 5,
        fontSize: 16,
        height:50,
        padding: 10,
        margin: 12
    },
    buttonText: {
        color: '#FFFFFF', 
        fontSize: 16,
    },
    nextButton: {
        backgroundColor: '#c6cbef',
        alignItems: 'center',
        borderRadius: 5,
        fontSize: 16,
        height:50,
        width: 'auto',
        padding: 10,
        margin: 12,

        flexDirection: 'row', // Align icon and text horizontally
        justifyContent: 'center', // Center align text and icon
        flexGrow: 1, // Allow the button to grow based on content
    },
    backButton: {
        backgroundColor: '#c6cbef',
        alignItems: 'center',
        borderRadius: 5,
        fontSize: 16,
        height:50,
        padding: 10,
        margin: 12,
        maxWidth: 90,
        flexDirection: 'row', // Align icon and text horizontally
        justifyContent: 'center', // Center align text and icon
        flexGrow: 1, // Allow the button to grow based on content
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});