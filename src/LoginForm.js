import React, {useState} from 'react';
import { StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    TextInput} from 'react-native';
import {validateEmail} from '../utils/validation';
import FireBase from '../utils/firebase';

export default function LoginForm (props) {
    const {changeForm} = props;
    const [formData,setFormData]= useState(defaultValue());
    const [formError, setFormError] = useState({});
    const login = () => {
        let errors = {};
        if(!formData.email || !formData.password) {
            if(!formData.email) errors.email =true;
            if(!formData.password) errors.password = true;
        } else if(!validateEmail(formData.email)){
            errors.email=true
        }else {
            FireBase.auth()
            .signInWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
                console.log("OK");
            })
            .catch(() => {
                setFormError({
                    email:true,
                    password:true,
                });
            })
        }
        setFormError(errors);

    };
    
    const onChange = (e, type) => {
        /* 
        console.log('data: ', e.nativeEvent.text);
        console.log('type ', type); */
        setFormData({...formData, [type]: e.nativeEvent.text});
    };
    
        return (
        <>
        <TextInput 
        placeholder="Correo electronico" 
        placeholderTextColor='#969696'
        style={[styles.input, formError.email && styles.errorInput]}
        onChange={(e) => onChange(e, 'email')}
        ></TextInput>
         <TextInput 
        placeholder="Contraseña" 
        placeholderTextColor='#969696'
        style={styles.input}
        secureTextEntry={true}
        onChange={(e) => onChange(e, 'password')}>
        </TextInput>
        <TouchableOpacity onPress={login}>
        <Text style={styles.btnText}>Inicia sesion</Text>
        </TouchableOpacity>
        <View style={styles.register}><TouchableOpacity  onPress={changeForm}>
        <Text style={styles.btnText}>Crea tu cuenta </Text>
        </TouchableOpacity></View>

        </>
    )
}

function defaultValue (){
    return{
    email:"",
    password:""
}
}
const styles = StyleSheet.create({
    btnText: {
        color: '#fff',
        fontSize: 15,
    },
    input: {
        height:50,
        color:'#fff',
        width:'80%',
        marginBottom:25,
        backgroundColor:'#1e3040',
        paddingHorizontal:20,
        borderRadius:50,
        fontSize:15,
        borderWidth:1,
        borderColor:'#1e3040'
    },
    login: {
        flex:1,
        justifyContent:'flex-end',
        marginBottom:10,
    },
    errorInput: {
        borderColor:'#940C0C'
    },
    register: {
        flex:1,
        justifyContent:'flex-end',
        marginBottom:10
    }
});