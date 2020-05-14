import React from 'react'
import { 
    Text,
    StyleSheet } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { SimpleLineIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

//Importando telas
import Login from './screens/Login'
import Ponto from './screens/Ponto/Ponto'
    import Historico from './screens/Ponto/Historico'
    import Horarios from './screens/Ponto/Horarios'
import Documentos from './screens/Documentos/Documentos'
import FeedbacksRecebidos from './screens/Feedbacks/FeedbacksRecebidos'
    import FeedbacksEnviados from './screens/Feedbacks/FeedbacksEnviados'
    import EnviarFeedback from './screens/Feedbacks/EnviarFeedback'
import Reunioes from './screens/Reunioes/Reunioes'
import Home from './screens/Home'

const Drawer = createDrawerNavigator()

const myTheme = { //tema do container do drawer
    dark: true,
    colors: {
      primary: '#1b1c1b',
      background: '#1c4526',
      card: '#13a378',
      text: '#1b1c1b',
      border: '#1b1c1b',
    },
  };

function PontoTabs() {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator 
        initialRouteName='Registrar' >
            <Tab.Screen 
                name="Registrar" 
                component={Ponto}
                options={{
                    tabBarLabel: () => <Text style={styles.labelText}>Ponto eletrônico</Text>,
                    tabBarIcon: () => <Entypo name="clock" size={20} color='#FFFFFF' />
                }} />
            <Tab.Screen 
                name="Historico" 
                component={Historico}
                options={{
                    tabBarLabel: () => <Text style={styles.labelText}>Histórico</Text>,
                    tabBarIcon: () => <MaterialCommunityIcons name="folder-clock-outline" size={20} color="#FFFFFF" />
                }} />
            <Tab.Screen 
                name="Horarios" 
                component={Horarios}
                options={{
                    tabBarLabel: () => <Text style={styles.labelText}>Horários</Text>,
                    tabBarIcon: () => <MaterialCommunityIcons name="account-clock" size={20} color="#FFFFFF" />
                }} />
        </Tab.Navigator>
    )
}

function FeedbackTabs() {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator 
        initialRouteName='FeedbacksRecebidos' >
            <Tab.Screen 
                name="FeedbacksRecebidos" 
                component={FeedbacksRecebidos}
                options={{
                    tabBarLabel: () => <Text style={styles.labelText}>Recebidos</Text>,
                    tabBarIcon: () => <FontAwesome name="thumbs-o-up" size={20} color="#FFFFFF" />
                }} />
            <Tab.Screen 
                name="FeedbacksEnviados" 
                component={FeedbacksEnviados}
                options={{
                    tabBarLabel: () => <Text style={styles.labelText}>Enviados</Text>,
                    tabBarIcon: () => <MaterialCommunityIcons name="inbox-arrow-up" size={20} color="#FFFFFF" />
                }} />
            <Tab.Screen 
                name="EnviarFeedback" 
                component={EnviarFeedback}
                options={{
                    tabBarLabel: () => <Text style={styles.labelText}>Enviar</Text>,
                    tabBarIcon: () => <FontAwesome name="send-o" size={20} color="#FFFFFF" />
                }} />
            {/* <Tab.Screen 
                name="PedirFeedback" 
                component={PedirFeedback}
                options={{
                    tabBarLabel: () => <Text style={styles.labelText}>Pedir</Text>,
                    tabBarIcon: () => <MaterialCommunityIcons name="comment-question-outline" size={20} color="#FFFFFF" />
                }} /> */}
        </Tab.Navigator>
    )
}

export default function Menu() {
    return (
        <NavigationContainer theme={myTheme} >
            <Drawer.Navigator 
               initialRouteName='Home' >
                   
                <Drawer.Screen 
                name="Home"  
                component={Home}
                options={{
                    title: 'Início',
                    drawerIcon: () => <MaterialCommunityIcons name="home-outline" size={25} color="#FFFFFF" />,
                    drawerLabel: () => <Text style={styles.labelText}>Início</Text>
                }} />

               <Drawer.Screen 
                name="Ponto"  
                component={PontoTabs}
                options={{
                    title: 'Ponto eletrônico',
                    drawerIcon: () => <MaterialCommunityIcons name="clock-fast" size={25} color="#FFFFFF" />,
                    drawerLabel: () => <Text style={styles.labelText}>Ponto eletrônico</Text>
                }} />

                <Drawer.Screen 
                name="Feedbacks"
                component={FeedbackTabs}
                options={{
                    title: 'Feedbacks',
                    drawerIcon: () => <MaterialCommunityIcons name="message-draw" size={25} color="#FFFFFF" />,
                    drawerLabel: () => <Text style={styles.labelText}>Feedbacks</Text>
                }} />

                <Drawer.Screen 
                name="Reunioes"  
                component={Reunioes}
                options={{
                    title: 'Reunioes',
                    drawerIcon: () => <MaterialIcons name="people-outline" size={25} color="#FFFFFF" />,
                    drawerLabel: () => <Text style={styles.labelText}>Reuniões</Text>
                }} />

                <Drawer.Screen 
                name="Documentos"  
                component={Documentos}
                options={{
                    title: 'Documentos',
                    drawerIcon: () => <SimpleLineIcons name="docs" size={25} color="#FFFFFF" />,
                    drawerLabel: () => <Text style={styles.labelText}>Documentos</Text>
                }} />

                <Drawer.Screen 
                name="Login"  
                component={Login}
                initialParams
                options={{
                    title: 'Sair da conta',
                    swipeEnabled: false,
                    gestureEnabled: false,
                    drawerIcon: () => <MaterialCommunityIcons name="logout" size={25} color="#fa5f5f" />,
                    drawerLabel: () => <Text style={[styles.labelText, { fontWeight: 'bold' }]}>SAIR DA CONTA</Text>
                }} />

            </Drawer.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    labelText: {
        color: 'white'
    }
})