<template>
  <div>
    <h3>Catégorie :</h3>

    <div class="cards">
      <v-card
        class="mx-auto card"
        max-width="344"
        v-for="cat in categorie"
        :key="cat.id"
      >
        <v-img height="200px" :src="cat.img"></v-img>

        <v-card-title>
          {{ cat.nom }}
        </v-card-title>

        <v-card-subtitle>
          {{ cat.description }}
        </v-card-subtitle>

        <v-card-actions>
          <v-link color="orange lighten-2" text @click="goCat(cat.nom)">
            Decouvrir
          </v-link>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { categorie } from "./data";
export default {
  data() {
    return {
      categorie: categorie,
    };
  },
  methods: {
    goCat(id) {
      this.$router.push(`/categories/${id}`);
    },
  },
};
</script>

<style>
.cards {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: auto;
  margin-top: 15px;
}
.card {
  width: 300px;
  min-height: 200px;
  box-shadow: 0 1px 1px 0px rgb(173, 173, 173);
  padding: 5px;
  border-radius: 5px;
  padding-bottom: 10px;
  cursor: pointer;
  margin: 10px;
  transition: all 0.2s ease-in;
}
.card:hover {
  transform: scale(1.01);
  background: rgba(250, 250, 250, 0.431);
}
.card img {
  width: 100%;
  border-radius: 5px;
}
.card button {
  float: right;
}

.mx-auto {
  margin-bottom: 25px;
}

@media (max-width: 600px) {
  .cards {
  }
  .mx-auto {
    background: red;
  }
}
</style>
