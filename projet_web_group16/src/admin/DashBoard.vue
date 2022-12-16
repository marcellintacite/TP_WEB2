<template>
  <div class="main_dash">
    <h2 color="#333" style="padding-top: 10px; padding-bottom: 10px">
      Dashboard
    </h2>
    <div class="card-container" max-width="100%" direction="row">
      <!-- <v-sheet :color="darken - 2" class="pa-3">
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="card"
        ></v-skeleton-loader> -->
      <!-- </v-sheet> -->
      <div class="carte">
        <h4 class="main_tittle">Commandes</h4>
        <h3>{{ nombreCommandes.length }}</h3>
        <v-icon color="#fff" style="position: absolute; right: 10px"
          >mdi-cards</v-icon
        >
        <v-btn
          depressed
          color="#fff"
          outlined
          height="30px"
          @click="navRoot('commandes')"
          >Découvrir</v-btn
        >
      </div>
      <div class="carte">
        <h4 class="main_tittle">Utilisateurs</h4>
        <h3>{{ nombreUtilisateur }}</h3>
        <v-icon color="#fff" style="position: absolute; right: 10px"
          >mdi-account-group</v-icon
        >
        <v-btn
          depressed
          color="#fff"
          outlined
          dense
          height="30px"
          @click="navRoot('utilisateurs')"
          >Découvrir</v-btn
        >
      </div>
      <div class="carte">
        <h4 class="main_tittle">Produits</h4>
        <h3>{{ nombreProduits.length }}</h3>
        <v-icon color="#fff" style="position: absolute; right: 10px"
          >mdi-cart-arrow-up</v-icon
        >
        <v-btn
          @click="navRoot('produits')"
          depressed
          color="#fff"
          outlined
          height="30px"
          >Découvrir</v-btn
        >
      </div>
    </div>
    <div class="tableau">
      <h3 class="text-center">Commandes recentes</h3>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">id</th>
              <th class="text-left">Nom utilisateur</th>
              <th class="text-left">Adresse</th>
              <th class="text-left">MoyenPaiement</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.calories }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: this.$route.params.username,
      nombreCommandes: null,
      nombreUtilisateur: null,
      nombreProduits: null,
    };
  },
  methods: {
    logout() {
      this.$router.replace({ name: "login" });
    },
    navRoot(root) {
      this.$router.replace(`/${root}`);
    },
  },
  mounted() {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        this.nombreUtilisateur = res.data.length;
      })
      .catch((e) => alert(e.message));

    axios
      .get("http://localhost:5000/produits")
      .then((res) => {
        this.nombreProduits = res.data;
      })
      .catch((e) => alert(e.message));

    axios
      .get("http://localhost:5000/commandes")
      .then((res) => {
        this.nombreCommandes = res.data;
      })
      .catch((e) => alert(e.message));
  },
};
</script>

<style>
.main_dash {
  width: 90%;
  margin: auto;
}
.main_tittle {
  font-size: 20px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
}
.carte {
  width: 250px;
  height: 120px;
  box-shadow: 0px 0px 2px 5px #ff9a9e33;
  margin-right: 2rem;
  background: #ff9a9e;
  color: #fff;
  position: relative;
  padding: 10px;
  border-radius: 5px;
}
.carte h3 {
  font-size: 22px;
  padding-bottom: 5px;
}
.carte:nth-child(2) {
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  box-shadow: 0px 0px 2px 5px #e0c3fc55;
}
.carte:nth-child(3) {
  background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
  box-shadow: 0px 0px 2px 5px #53789599;
}
.carte:hover {
  transform: translateX(10px);
  transition: all 0.3s ease;
}

.tableau {
  margin-top: 25px;
}

@media (max-width: 500px) {
  .carte {
    width: 98%;
    margin: auto;
    margin-bottom: 20px;
  }
}
</style>
