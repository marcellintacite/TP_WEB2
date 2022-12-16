<template>
  <div>
    <h3>Catégorie :</h3>
    <v-row v-if="!show">
      <div class="loading_container"><div class="circle_c"></div></div>
    </v-row>
    <div class="cards">
      <v-row v-if="show">
        <v-card
          class="mx-auto card"
          max-width="344"
          v-for="cat in categorie"
          :key="cat.id"
        >
          <v-img height="200px" :src="images[cat.imgCategorie]"></v-img>

          <v-card-title>
            {{ cat.nomCategorie }}
          </v-card-title>

          <v-card-actions>
            <v-link
              color="orange lighten-2"
              text
              @click="goCat(cat.id_categorie)"
            >
              Decouvrir
            </v-link>

            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { images } from "./images";
export default {
  data() {
    return {
      categorie: [],
      show: false,
      images: images,
    };
  },

  mounted() {
    axios
      .get("http://localhost:5000/categories")
      .then((res) => {
        this.categorie = res.data;
        this.show = true;
        console.log(res.data);
      })
      .catch((e) => alert(e.message));

    axios
      .get("http://localhost:5000/categories/name")
      .then((res) => {
        this.categories = res.data;
        this.show = true;
      })
      .catch((e) => alert(e.message));
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

.loading_container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
}
.loading_container .circle_c {
  width: 40px;
  height: 40px;
  border: 2px solid lightblue;
  border-bottom: 2px dashed lightcoral;
  border-radius: 50%;
  animation: cc 0.7s ease-in infinite;
}

@keyframes cc {
  0% {
    transform: rotate(0deg);
  }
  50% {
    border-right: 2px dashed lightcoral;
  }
  100% {
    transform: rotate(360deg);
  }
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
