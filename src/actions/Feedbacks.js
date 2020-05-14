import { SET_SENT_FEEDBACKS } from './ActionTypes'
import { server } from '../functions'
import { Alert } from 'react-native'

export const sendFeedback = (feedback, user) => {
    return dispatch => {
        fetch(`${server}/sendFeedback.php`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                token: user.token,
                destinatario: feedback.destinatario,
                feedback: feedback.feedback,
                comecar: feedback.comecar,
                continuar: feedback.continuar,
                parar: feedback.parar
            })
        }).then(res => {
            Alert.alert('Enviado', 'Seu feedback foi enviado')
            dispatch(getSentFeedbacks(user))
        }).catch(err => Alert.alert('Erro', 'Houve um problema ao enviar seu feedback'))
    }
}

export const setSentFeedbacks = feedbacks => {
    return {
        type: SET_SENT_FEEDBACKS,
        payload: feedbacks
    }
}

//Load the sent feedbacks from the server
export const getSentFeedbacks = user => {
    return dispatch => {
        fetch(`${server}/feedbacksEnviados.php`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                token: user.token
            })
        }).then(async res => {
            const response = await res.json()
            let feedbacks = []
            response.map(feedback => {
                feedbacks.push({
                    id: feedback.id,
                    data: feedback.data,
                    texto: feedback.texto,
                    comecar: feedback.comecar,
                    continuar: feedback.continuar,
                    parar: feedback.parar,
                    destinatario: feedback.destinatario
                })
            })
            return dispatch(setSentFeedbacks(feedbacks))
        }).catch(err => Alert.alert('Erro', 'Houve um erro ao buscar os feedbacks que você enviou'))
    }
}
