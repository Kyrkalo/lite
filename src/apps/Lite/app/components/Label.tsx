import React from "react";
import { ILabel } from "../interfaces/props";
import { Text } from "react-native";


export default function Label(props: ILabel) {
    return (
        <>
            { props.title ? <Text>{props.title}</Text> : null }
            { props.text ? <Text>{props.text}</Text> : null }
        </>
    );
}