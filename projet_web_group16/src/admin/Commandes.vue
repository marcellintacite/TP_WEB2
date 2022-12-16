<template>
  <div class="cone">
    <h2>Liste des commandes</h2>
    <div class="cards_container">
      <v-card
        :loading="loading"
        class="mx-auto my-12"
        max-width="350px"
        v-for="cat in commandes"
        :key="cat.id"
      >
        <v-card-text>
          <div>Id commande: {{ cat.id }}</div>
          <p class="text-h4 text--primary">{{ cat.nom }}</p>
          <p>Adresse :{{ cat.adresse }}</p>
          <div class="text--primary">
            <p>Quantité : {{ cat.quantite }}</p>
            <p>Mode paiement : {{ cat.moyenPaiement }}</p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="teal accent-4" @click="reveal = true">
            Voir plus
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Commandes",
  data() {
    return {
      commandes: null,
      produits: null,
      show: false,
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/commandes")
      .then((res) => {
        this.commandes = res.data;
      })
      .catch((e) => alert(e.message));
    axios
      .get("http://localhost:5000/produits")
      .then((res) => {
        this.produits = res.data;
      })
      .catch((e) => alert(e.message));
  },
};
</script>

<style>
.cards_container {
  width: 100%;

  display: flex;
  flex-wrap: wrap;
}
.cone {
  width: 96%;
  margin: auto;
  padding: 10px;
}
</style>
