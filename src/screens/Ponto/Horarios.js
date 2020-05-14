import React, { Component } from 'react'
import { 
    View, 
    Text,
    ScrollView,
    StyleSheet } from 'react-native'

import { commonStyle } from '../../commonStyle'
import Header from '../../components/Header'
import Loading from '../../components/Loading'
import { server, showError } from '../../functions'
import { AsyncStorage } from 'react-native'

export default class Horarios extends Component {

    state = {
        title: 'Seus horários',
        isLoading: true,
        shifts: {
            monday: {
                entrance: '',
                pause: '',
                comeBack: '',
                leave: ''
            },
            tuesday: {
                entrance: '',
                pause: '',
                comeBack: '',
                leave: ''
            },
            wednesday: {
                entrance: '',
                pause: '',
                comeBack: '',
                leave: ''
            },
            thursday: {
                entrance: '',
                pause: '',
                comeBack: '',
                leave: ''
            },
            friday: {
                entrance: '',
                pause: '',
                comeBack: '',
                leave: ''
            },
            saturday: {
                entrance: '',
                pause: '',
                comeBack: '',
                leave: ''
            },
            sunday: {
                entrance: '',
                pause: '',
                comeBack: '',
                leave: ''
            }
        },
        flexiblePause: '',
        flexibleShift: '',
        extraShift: '',
        nightWorker: '',
        tolerance: ''
    }

    componentDidMount = async () => {
        const email = await AsyncStorage.getItem('user_email')
        const token = await AsyncStorage.getItem('user_token')

        await fetch(`${server}/getHorarios.php`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                token: token
            })
        }).then(async res => {
            const data = await res.json()
            let shifts
            let flexiblePause, flexibleShift, tolerance, nightWorker, extraShift
            if(data.sucesso) {
                flexiblePause = data.pausa_flexivel
                flexibleShift = data.horario_flexivel,
                tolerance = data.tolerancia + " minutos",
                nightWorker = data.noturno,
                extraShift = data.hora_extra
                shifts = {
                    monday: {
                        entrance: data.monday.entrance,
                        pause: data.monday.pause,
                        comeBack: data.monday.comeBack,
                        leave: data.monday.leave
                    },
                    tuesday: {
                        entrance: data.tuesday.entrance,
                        pause: data.tuesday.pause,
                        comeBack: data.tuesday.comeBack,
                        leave: data.tuesday.leave
                    },
                    wednesday: {
                        entrance: data.wednesday.entrance,
                        pause: data.wednesday.pause,
                        comeBack: data.wednesday.comeBack,
                        leave: data.wednesday.leave
                    },
                    thursday: {
                        entrance: data.thursday.entrance,
                        pause: data.thursday.pause,
                        comeBack: data.thursday.comeBack,
                        leave: data.thursday.leave
                    },
                    friday: {
                        entrance: data.friday.entrance,
                        pause: data.friday.pause,
                        comeBack: data.friday.comeBack,
                        leave: data.friday.leave
                    },
                    saturday: {
                        entrance: data.saturday.entrance,
                        pause: data.saturday.pause,
                        comeBack: data.saturday.comeBack,
                        leave: data.saturday.leave
                    },
                    sunday: {
                        entrance: data.saturday.entrance,
                        pause: data.saturday.pause,
                        comeBack: data.saturday.comeBack,
                        leave: data.saturday.leave
                    }
                }

                this.setState({ 
                    shifts, 
                    flexibleShift, 
                    flexiblePause, 
                    nightWorker, 
                    tolerance, 
                    extraShift, 
                    isLoading: false 
                })
            } else {
                showError('Houve um erro ao buscar seus horários')
            }
        }).catch(err => showError('Houve um erro ao buscar seus horários'))

        this.setState({ isLoading: false })
    }

    render() {
        return (
            <View style={commonStyle.container}>
                <Header title={this.state.title} onIconClick={this.props.navigation.openDrawer} />

                <Text style={commonStyle.h2Text}>Condições</Text>

                {this.state.isLoading ? <Loading animated={this.state.isLoading} />  : null } 

                <View style={commonStyle.cardContainer}>
                    <View style={styles.timeContainer}>
                        <Text style={commonStyle.text}>Horário flexível: {this.state.flexibleShift}</Text>
                    </View>

                    <View style={styles.timeContainer}>
                        <Text style={commonStyle.text}>Pausa flexível: {this.state.flexiblePause}</Text>
                    </View>

                    <View style={styles.timeContainer}>
                        <Text style={commonStyle.text}>Trabalhador noturno: {this.state.nightWorker}</Text>
                    </View>

                    <View style={styles.timeContainer}>
                        <Text style={commonStyle.text}>Tolerância de atraso: {this.state.tolerance}</Text>
                    </View>

                    <View style={styles.timeContainer}>
                        <Text style={commonStyle.text}>Hora extra: {this.state.extraShift}</Text>
                    </View>
                </View>

                <Text style={commonStyle.h2Text}>Seus horários</Text>

                <ScrollView style={commonStyle.scrollContainer} >
                    <View style={commonStyle.cardContainer}>
                        <Text style={[commonStyle.text, styles.cardTitle]}>Segunda-feira</Text>
                        <View style={styles.timeContainer}>
                            <Text style={commonStyle.text}>Entrada: {this.state.shifts.monday.entrance}</Text>
                            <Text style={commonStyle.text}>Pausa: {this.state.shifts.monday.pause}</Text>
                        </View>
                        <View style={styles.timeContainer}>
                            <Text style={commonStyle.text}>Retorno: {this.state.shifts.monday.comeBack}</Text>
                            <Text style={commonStyle.text}>Saída: {this.state.shifts.monday.leave}</Text>
                        </View>
                    </View>
                    <View style={commonStyle.cardContainer}>
                        <Text style={[commonStyle.text, styles.cardTitle]}>Terça-feira</Text>
                        <View style={styles.timeContainer}>
                            <Text style={commonStyle.text}>Entrada: {this.state.shifts.tuesday.entrance}</Text>
                            <Text style={commonStyle.text}>Pausa: {this.state.shifts.tuesday.pause}</Text>
                        </View>
                        <View style={styles.timeContainer}>
                            <Text style={commonStyle.text}>Retorno: {this.state.shifts.tuesday.comeBack}</Text>
                            <Text style={commonStyle.text}>Saída: {this.state.shifts.tuesday.leave}</Text>
                        </View>
                    </View>
                    <View style={commonStyle.cardContainer}>
                        <Text style={[commonStyle.text, styles.cardTitle]}>Quarta-feira</Text>
                        <View style={styles.timeContainer}>
                            <Text style={commonStyle.text}>Entrada: {this.state.shifts.wednesday.entrance}</Text>
                            <Text style={commonStyle.text}>Pausa: {this.state.shifts.wednesday.pause}</Text>
                        </View>
                        <View style={styles.timeContainer}>
                            <Text style={commonStyle.text}>Retorno: {this.state.shifts.wednesday.comeBack}</Text>
                            <Text style={commonStyle.text}>Saída: {this.state.shifts.wednesday.leave}</Text>
                        </View>
                    </View>
                    <View style={commonStyle.cardContainer}>
                        <Text style={[commonStyle.text, styles.cardTitle]}>Quinta-feira</Text>
                        <View style={styles.timeContainer}>
                            <Text style={commonStyle.text}>Entrada: {this.state.shifts.thursday.entrance}</Text>
                            <Text style={commonStyle.text}>Pausa: {this.state.shifts.thursday.pause}</Text>
                        </View>
                        <View style={styles.timeContainer}>
                            <Text style={commonStyle.text}>Retorno: {this.state.shifts.thursday.comeBack}</Text>
                            <Text style={commonStyle.text}>Saída: {this.state.shifts.thursday.leave}</Text>
                        </View>
                    </View>
                    <View style={commonStyle.cardContainer}>
                        <Text style={[commonStyle.text, styles.cardTitle]}>Sexta-feira</Text>
                        <View style={styles.timeContainer}>
                            <Text style={commonStyle.text}>Entrada: {this.state.shifts.friday.entrance}</Text>
                            <Text style={commonStyle.text}>Pausa: {this.state.shifts.friday.pause}</Text>
                        </View>
                        <View style={styles.timeContainer}>
                            <Text style={commonStyle.text}>Retorno: {this.state.shifts.friday.comeBack}</Text>
                            <Text style={commonStyle.text}>Saída: {this.state.shifts.friday.leave}</Text>
                        </View>
                    </View>
                    <View style={commonStyle.cardContainer}>
                        <Text style={[commonStyle.text, styles.cardTitle]}>Sábado</Text>
                        <View style={styles.timeContainer}>
                            <Text style={commonStyle.text}>Entrada: {this.state.shifts.saturday.entrance}</Text>
                            <Text style={commonStyle.text}>Pausa: {this.state.shifts.saturday.pause}</Text>
                        </View>
                        <View style={styles.timeContainer}>
                            <Text style={commonStyle.text}>Retorno: {this.state.shifts.saturday.comeBack}</Text>
                            <Text style={commonStyle.text}>Saída: {this.state.shifts.saturday.leave}</Text>
                        </View>
                    </View>
                    <View style={commonStyle.cardContainer}>
                        <Text style={[commonStyle.text, styles.cardTitle]}>Domingo</Text>
                        <View style={styles.timeContainer}>
                            <Text style={commonStyle.text}>Entrada: {this.state.shifts.sunday.entrance}</Text>
                            <Text style={commonStyle.text}>Pausa: {this.state.shifts.sunday.pause}</Text>
                        </View>
                        <View style={styles.timeContainer}>
                            <Text style={commonStyle.text}>Retorno: {this.state.shifts.sunday.comeBack}</Text>
                            <Text style={commonStyle.text}>Saída: {this.state.shifts.sunday.leave}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 15
    }
})