<template>
  <v-app>
    <notifications />

    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">Resto Lisbone</v-list-item-title>
          <v-list-item-subtitle>Resto & Terasse</v-list-item-subtitle>
          <v-card
            class="mx-auto"
            max-width="100%"
            tile
            style="
              margin-top: 15px;
              border-radius: 5px;
              overflow: hidden;
              box-shadow: 0px 2px 10px #3334;
              border: 0.2px solid #2222;
            "
            v-if="userLogged"
          >
            <v-img height="100px" src="./assets/bb.jpg"></v-img>
            <v-col>
              <v-avatar size="80" style="position: absolute; top: 60px">
                <v-img src="./assets/user.jpg"></v-img>
              </v-avatar>
            </v-col>
            <v-list-item color="rgba(0, 0, 225, .9)">
              <v-list-item-content class="pt-8">
                <v-list-item-title class="title" style="font-weight: 700">{{
                  username.toUpperCase()
                }}</v-list-item-title>
                <v-list-item-subtitle>{{ usermail }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item link to="/" v-if="!userLogged">
          <v-list-item-icon>
            <v-icon color="deep-orange lighten-3">mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Accueil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- SI on est connacté -->
        <v-list-item link to="/dashboard" v-if="userLogged">
          <v-list-item-icon>
            <v-icon color="deep-orange lighten-3">mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>DashBoard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/menu" v-if="!userLogged">
          <v-list-item-icon>
            <v-icon color="deep-orange lighten-3">mdi-bowl-mix</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Menu</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/about" v-if="!userLogged">
          <v-list-item-icon>
            <v-icon color="deep-orange lighten-3">mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>A propos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/commandes" v-if="userLogged">
          <v-list-item-icon>
            <v-icon color="deep-orange lighten-3">mdi-cash-multiple</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Commandes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- route -->
        <v-list-item link to="/utilisateurs" v-if="userLogged">
          <v-list-item-icon>
            <v-icon color="deep-orange lighten-3">mdi-account-group</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Utilisateurs</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- Produits -->
        <v-list-item link to="/produits" v-if="userLogged">
          <v-list-item-icon>
            <v-icon color="deep-orange lighten-3">mdi-cart-heart</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Produits</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin" v-if="!userLogged">
          <v-list-item-icon>
            <v-icon color="deep-orange lighten-3">mdi-login</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Connexion admin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-if="userLogged" @click="Signout()">
          <v-list-item-icon>
            <v-icon color="deep-orange lighten-3">mdi-login</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Deconexion</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      hide-on-scroll
      dense
      color="#fff"
      style="box-shadow: 1px 1px 5px #3333"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
const isLogin = localStorage.getItem("user");
export default {
  name: "App",
  data() {
    return {
      drawer: null,
      userLogged: isLogin ? true : false,
      username: localStorage.getItem("user") && localStorage.getItem("user"),
      usermail:
        localStorage.getItem("usermail") && localStorage.getItem("usermail"),
    };
  },
  methods: {
    Signout() {
      localStorage.removeItem("user");
      localStorage.removeItem("usermail");
      window.location.replace("/");
    },
  },
};
</script>
