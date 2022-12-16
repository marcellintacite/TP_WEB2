<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Connexion admin</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form ref="form" @submit.prevent="login()">
                  <v-text-field
                    v-model="username"
                    name="username"
                    label="Nom utilisateur"
                    type="text"
                    placeholder="username"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    name="password"
                    label="Mot de passe"
                    type="password"
                    placeholder="password"
                    required
                  ></v-text-field>
                  <v-btn
                    type="submit"
                    class="mt-4"
                    color="primary"
                    value="log in"
                    >Login</v-btn
                  >
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import axios from "axios";

if (localStorage.getItem("username")) {
  window.location("/dashboard");
}
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      const { username, password } = this;
      if (username == "" || password == "") {
        Vue.notify({
          title: "Notification",
          text: "Veuillez completer tous les champs",
          type: "error",
        });
      } else {
        const addData = async () => {
          const data = { username, password };
          console.log(data);
          await axios
            .post("http://localhost:5000/auth", data)
            .then((res) => {
              if (typeof res.data !== "object") {
                Vue.notify({
                  title: "Notification",
                  text: `${res.data}`,
                  type: "error",
                });
              } else {
                localStorage.setItem("user", res.data.username);
                localStorage.setItem("usermail", res.data.email);
                window.location.replace("/#/dashboard");
                window.location.reload();
              }
            })
            .catch((e) => {
              Vue.notify({
                title: "Notification",
                text: `${e}`,
                type: "error",
              });
            });
        };
        addData();
      }
    },
  },
};
</script>
