import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import firebase from '../utils/firebase';

export default function ActionBar (props){
    console.log(props);
    const {showList, setShowList} = props;
    return(
        <View style={styles.viewFooter}>
            <TouchableOpacity style={styles.viewClose} onPress={() => firebase.auth().signOut()}>
                <Text style={styles.textLogout} >Cerrar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={showList ? styles.viewAdd : styles.viewCancel} 
            onPress={() => setShowList(!showList)}>
                <Text style={styles.textAdd}>{showList ? "Nueva Fecha" : "Cancelar Fecha"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    viewFooter:{
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        width:"100%",
        height:50,
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:30,
        marginBottom:20
    },
    viewClose:{
        backgroundColor:"#820000",
        borderRadius:50,
        paddingVertical:10,
        paddingHorizontal:30
    },
    viewCancel:{
        backgroundColor:"#fff",
        borderRadius:50,
        paddingVertical:10,
        paddingHorizontal:30, 
        color:"white",
    },
    textLogout:{
        fontSize:14,
        color:'#fff',
        textAlign: 'center',
    },
    viewAdd:{
        backgroundColor:"#f1ea1f",
        borderRadius:50,
        paddingVertical:10,
        paddingHorizontal:30
    },
    textAdd:{
        fontSize:14,
        color:'#000',
        textAlign: 'center',
    }
})