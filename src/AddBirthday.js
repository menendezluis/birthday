import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text, TouchableOpacity} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import firebase from '../utils/firebase';
import 'firebase/firestore';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);
export default function AddBirthday(props){
    const {user, setShowList, setReloadData} = props;
    //const [showList, setShowList] = useState(true);
    const [formData, setFormData] = useState({});
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [formError, setFormError] = useState({});

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
      const handleConfirm = (date) => {
          const dateBirth = date;
          dateBirth.setHours(0);
          dateBirth.setMinutes(0);
          dateBirth.setSeconds(0);
          setFormData({...formData, dateBirth});
        };
   
    
    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text});
    };
    const onSubmit = () => {
        let errors = {};
        if(!formData.name || !formData.lastname || !formData.dateBirth){
            if (!formData.name) errors.name = true;
            if (!formData.lastname) errors.lastname = true;
            if (!formData.dateBirth) errors.dateBirth = true; 
        } else{
            const data = formData;
            data.dateBirth.setYear(0);  //año se setea a 0 para el calculo de segundos 
            db.collection(user.uid)
            .add(data)
            .then(() => {
                setReloadData(true);
                setShowList(true);
            })
            .catch(() => {
                setFormError({name: true, lastname:true, dateBirth:true});
            });
        }
        setFormError(errors);
    };
    return(
        <>
         <View style={styles.container}>
            <Text style={styles.titulo}>Agregar nuevo:</Text>
            <TextInput style={[styles.input, formError.name && {borderColor:"#940c0c"}]}
            placeholder="Nombre" 
            placeholderTextColor="#969696" 
            onChange={(e) => onChange(e, 'name')}/>
            <TextInput style={[styles.input, formError.lastname && {borderColor:"#940c0c"}]}
            placeholder="Apellidos" 
            placeholderTextColor="#969696" 
            onChange={(e) => onChange(e, 'lastname')}/>
            <TouchableOpacity style={[styles.addDateBtn, formError.dateBirth && {borderColor:"#940c0c"}]} 
            onPress={showDatePicker}>
                <Text 
                style={{
                    color: formData.dateBirth ? "#fff": "#969696", 
                marginTop:8}}>
                    {formData.dateBirth ? moment(formData.dateBirth)
                    .format('LL') 
                    :"Fecha de Cumpleaños"}
                    </Text>
            </TouchableOpacity>
            <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}/>
            <TouchableOpacity onPress={onSubmit}><Text  style={styles.btnText}>Añadir</Text></TouchableOpacity>
           
        </View>
      
        </>
        /*

            <ActioBar />
        </View> */
    )
}

const styles=StyleSheet.create({

    container:{
        height:"100%",
        width:"100%",
        justifyContent: 'center',
        alignItems:'center'
    },
    input:{
        height:40,
        color:"#fff",
        width:"80%",
        marginBottom:25,
        backgroundColor:"#1e3049",
        paddingHorizontal:20,
        paddingRight:1,
        fontSize:14,
        borderWidth:1,
        
        borderColor:"#1e3041",
        borderRadius:50

    },
    addDateBtn:{
        height:40,
        color:"#fff",
        width:"80%",
        marginBottom:25,
        backgroundColor:"#1e3049",
        paddingHorizontal:20,
        paddingRight:1,
        fontSize:14,
        borderWidth:1,
        borderColor:"#1e3041",
        borderRadius:50,

    },
    titulo:{
        fontSize:20,
        color:'#fff',
        paddingBottom:20

    },
    btnText: {
        color: '#fff',
        fontSize: 17,
    },

})