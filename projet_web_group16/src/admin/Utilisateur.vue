<template>
  <div class="user_content">
    <div class="head">
      <h2>Gestion utilisateurs</h2>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mx-4"
            fab
            dark
            small
            color="indigo"
            v-bind="attrs"
            v-on="on"
            elevation="3"
          >
            <v-icon dark max-width="200px"> mdi-account-plus </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Ajouter un utilisateur</span>
          </v-card-title>
          <v-form @submit.prevent="save()">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Nom utilisateur *"
                      v-model="username"
                      type="text"
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Email*"
                      required
                      outlined
                      v-model="mail"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Password*"
                      type="password"
                      v-model="password"
                      required
                      max="10"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-btn color="red" text @click="close()"> Close </v-btn>
              <v-btn color="info" text type="submit"> Ajouter </v-btn>
            </v-card-text>
          </v-form>
        </v-card>
      </v-dialog>
      <v-btn class="mx-4" fab dark color="info" @click="refresh()" small>
        <v-icon dark max-width="200px" elevation="2"> mdi-refresh </v-icon>
      </v-btn>
    </div>
    <div class="table_content">
      <v-simple-table id="tab_imp">
        <template v-slot:default>
          <thead style="background-color: #e0c3fc32">
            <tr>
              <th class="text-left" style="font-size: 16px">Id</th>
              <th class="text-left" style="font-size: 16px">Nom utilisateur</th>
              <th class="text-left" style="font-size: 16px">Adresse mail</th>
              <th class="text-left" style="font-size: 16px">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in utilisateurs" :key="item.name">
              <td>{{ item.id }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.adresseMail }}</td>
              <td>
                <div>
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-row align="center" class="test">
        <v-btn color="primary" @click="printFunc()"
          >Telécharger <v-icon ml-2>mdi-download </v-icon></v-btn
        >
      </v-row>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import html2pdf from "html2pdf.js";
export default {
  name: "Utilisateurs",
  data() {
    return {
      utilisateurs: null,
      dialog: false,
      mail: "",
      username: "",
      password: "",
    };
  },

  mounted() {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        this.utilisateurs = res.data;
      })
      .catch((e) => alert(e.message));
  },
  methods: {
    save() {
      if (this.username === "" || this.password === "" || this.mail == "") {
        alert("Veuillez saisir tous les champs");
      } else if (this.password.length < 6) {
        alert("Le mot de passe doit avoir plus de 6 caractère");
      } else {
        const data = {
          username: this.username,
          password: this.password,
          adresseMail: this.mail,
        };

        axios
          .post("http://localhost:5000/users", data)
          .then((res) => {
            Vue.notify({
              title: "Notification",
              text: `${res.data}`,
              type: "success",
            });
            this.close();
            (this.username = ""), (this.password = ""), (this.mail = "");
          })
          .catch((e) => {
            Vue.notify({
              title: "Notification",
              text: `${e.message}`,
              type: "error",
            });
          });
      }

      //   this.close();
    },
    refresh() {
      axios
        .get("http://localhost:5000/users")
        .then((res) => {
          this.utilisateurs = res.data;
        })
        .catch((e) => alert(e.message));
    },
    close() {
      this.dialog = false;
    },
    printFunc() {
      html2pdf(document.getElementById("tab_imp"), { margin: 1 });
    },
  },
};
</script>

<style>
.user_content {
  width: 95%;
  margin: auto;
}
.user_content .head {
  display: flex;
  margin-top: 10px;
  align-items: center;
}
.table_content {
  padding: 15px;
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  height: 100%;
  margin-top: 30px;
}

.test {
  margin: 10px;
  margin-top: 20px;
}
</style>
