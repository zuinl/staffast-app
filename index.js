import React from 'react'
import { Provider } from 'react-redux'
import store from './src/store/StoreConfig'
import registerRootComponent from 'expo/build/launch/registerRootComponent'

import Menu from './src/Navigator'

const App = () => {
    return (
        <Provider store={store}>
            <Menu />
        </Provider>
    )
}

registerRootComponent(App)
