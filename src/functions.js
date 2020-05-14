import { Alert } from 'react-native'

const server = 'https://sistemastaffast.com/staffast/api/'
    
function showError(err) {
    if(err.response && err.response.data) {
        Alert.alert('Houve um problema', `Mensagem: ${err.response.data}`)
    }
}

function showSuccess(success = "Feito!", msg) {
    Alert.alert(success, msg)
}

export { server, showError, showSuccess }