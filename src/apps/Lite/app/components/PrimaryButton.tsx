import { TouchableOpacity, Text, GestureResponderEvent, ReturnKeyTypeOptions, StyleProp, ViewStyle } from "react-native";
import { globalStyles } from "../styles";

export interface ButtonProps {
    onPress?: (event: GestureResponderEvent) => void | undefined | Promise<any>;
    buttonStyle?: any;
    textStyle?: any;
    text?: string | undefined;
}

export default function PrimaryButton(props: ButtonProps) {
    return(
        <TouchableOpacity
            style={props.buttonStyle}
            onPress={props.onPress} >
            <Text style={props.textStyle}>{props.text}</Text>
        </TouchableOpacity>
    );
}