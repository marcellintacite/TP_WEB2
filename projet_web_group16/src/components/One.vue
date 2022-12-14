<template>
  <div>
    <h3>Vos plats preferés</h3>

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
          <v-link color="orange lighten-2" text @click="goCat()">
            Decouvrir
          </v-link>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import bg1 from "../assets/b3.jpg";
import bg2 from "../assets/bg.jpg";
import bg3 from "../assets/bg4.jpg";
import bg5 from "../assets/bg2.jpg";
const categorie = [
  {
    id: 1,
    nom: "Breakfast",
    description: "Retouvez vos petits dejeuner préferés dans notre resto.",
    lien: "/categorie/breakfast",
    img: bg1,
  },
  {
    id: 2,
    nom: "Dejeuner",
    description: "Les meuilleurs repas du midi dans votre resto préféré!",
    lien: "/categorie/dejeuner",
    img: bg2,
  },
  {
    id: 3,
    nom: "Souper",
    description:
      "Retouvez les plats du soir chez nous avec d'autres avantages.",
    lien: "/categorie/breakfast",
    img: bg3,
  },
  {
    id: 4,
    nom: "Thé",
    description: "Buvez le thé chaud et calme.",
    lien: "/categorie/the",
    img: bg5,
  },
];
export default {
  data() {
    return {
      categorie: categorie,
    };
  },
  methods: {
    goCat() {
      this.$router.push("/single");
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
