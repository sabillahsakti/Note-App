import React, { Component } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Input, Button } from "../../components"
import { loginUser } from '../../actions/AuthAction';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    login = () => {
        const { email, password } = this.state

        if (email && password) {
            loginUser(email, password)
                .then((user) => {
                    // Pengguna berhasil login, lakukan sesuatu dengan data pengguna jika perlu
                    this.props.navigation.replace("MainApp");
                })
                .catch((error) => {
                    // Terjadi kesalahan saat login, tampilkan pesan kesalahan
                    Alert.alert('Error', error.message);
                });
        }
    }
    render() {
        const { email, password } = this.state
        return (
            <View style={styles.pages}>
                <View style={styles.cardLogin}>
                    <Input
                        label="Login"
                        onChangeText={(text) => this.setState({ email: text })} // Set email ke dalam state
                        value={email}
                    />
                    <Input
                        label="Password"
                        secureTextEntry
                        onChangeText={(text) => this.setState({ password: text })} // Set password ke dalam state
                        value={password}
                    />
                    <View style={{ alignItems: 'column' }}>
                        <Button
                            title="Login"
                            type="text"
                            padding={12}
                            fontSize={18}
                            onPress={() => this.login()}
                        />
                        <Button
                            title="Register"
                            type="text"
                            padding={12}
                            fontSize={18}
                            onPress={() => { this.props.navigation.navigate("Register") }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default Login

const styles = StyleSheet.create({
    pages: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    logo: {
        alignItems: 'center',
        marginTop: 117
    },
    cardLogin: {
        marginHorizontal: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        marginTop: 10,
    },
    textBlue: {
        fontSize: 18,
        color: 'red'
    },
    register: {
        alignItems: 'center',
        marginTop: 10
    }
})