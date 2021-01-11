import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View} from 'react-native';
import { validateEmail } from '../utils/validation';
import FireBase from '../utils/firebase';

export default function RegisterForm (props) {
    const {changeForm} = props;
        const [formData, setFormData] = useState(defaultValue());
    const register = () => {
        let errors ={};
        if(!formData.email || !formData.password || !formData.repeatPassword){
            if(!formData.email) errors.email=true;
            if(!formData.password) errors.password=true;
            if(!formData.repeatpassword) errors.repeatpassword=true;
        } else if(!validateEmail(formData.email)){
            errors.email=true; /*validamos email valido */
        } 
         else if(formData.password!==formData.repeatPassword){ /*validamos contraseñas match */
            errors.password=true;
            errors.repeatpassword=true;
        }
        else if(formData.password.length<6){ /*validamos mayor a 6 caracteres */
            errors.password=true;
            errors.repeatpassword=true;
        }
        else { /*creamos en la base de datos */
            FireBase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
             })
             .catch(() => { //catch en caso de error
                setFormError({
                    email:true,
                    password:true,
                    repeatPassword:true,
                });
            });
        }
        setFormError(errors);
        console.log(errors);
    };
    const [formError,setFormError] = useState({});
    
    return (
        <>  
        <Text>Registro de cuenta:</Text>
        <TextInput 
        style={[styles.input, formError.email && styles.errorInput]}
        placeholder="Email" 
        placeholderTextColor="#969696"
        onChange={(e) => setFormData({...formData, email: e.nativeEvent.text})}></TextInput>
        <TextInput 
        style={[styles.input, formError.password && styles.errorInput]}
        placeholder="Contraseña" 
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) => setFormData({...formData, password: e.nativeEvent.text})}></TextInput>
        <TextInput 
        style={[styles.input, formError.repeatpassword && styles.errorInput]}
        placeholder="Repetir Contraseña" 
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) => setFormData({...formData, repeatPassword: e.nativeEvent.text})}></TextInput>
            <TouchableOpacity onPress={register}>
            <Text style={styles.btnText}>Registrate </Text>
            </TouchableOpacity>
            <View style={styles.login}>
            <TouchableOpacity  onPress={changeForm}>
            <Text style={styles.btnText}>Inicia Sesion </Text>
            </TouchableOpacity>
            </View>
        </>
    )
}
function defaultValue(){
    return{
        email: '',
        password:'',
        repeatPassword:'',
    };
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
    }
});