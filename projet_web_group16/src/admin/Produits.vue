<template>
  <div class="product_container">
    <div class="head">
      <div style="display: flex; align-items: center">
        <h3 style="margin-right: 10px">Produits</h3>
        <v-btn
          @click="refresh()"
          outlined
          color="info"
          style="width: 30px; height: 30px"
        >
          <v-icon size="20px">mdi-refresh</v-icon>
        </v-btn>
      </div>
      <p>La liste des tous les produits</p>
    </div>
    <v-row v-if="loading">
      <div class="circle_container">
        <div class="circle"></div>
      </div>
    </v-row>

    <div class="table_product" id="table_product">
      <template v-if="!loading">
        <v-data-table
          :headers="headers"
          :items="produits"
          sort-by="calories"
          class="elevation-2"
        >
          <template v-slot:top>
            <v-toolbar flat id="imprimer">
              <v-toolbar-title>Produits dispo</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Ajouter
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-form @submit.prevent="save()">
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="ajoutProduit.nomProduit"
                              label="Nom produit"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="ajoutProduit.prixProduit"
                              label="Prix produit"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="ajoutProduit.NombreEtoile"
                              label="Etoiles"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="ajoutProduit.descriptionProduit"
                              label="Desctiption"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-select
                              :items="categories"
                              v-model="ajoutProduit.Idcategorie"
                              label="Catégorie"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="ajoutProduit.image"
                              label="Image "
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                      <v-spacer></v-spacer>

                      <v-btn color="blue darken-1" text @click="close">
                        Annuler
                      </v-btn>
                      <v-btn color="blue darken-1" type="submit" text>
                        Ajouter
                      </v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
        <v-row align="center" class="test">
          <v-btn color="primary" @click="printFunc()"
            >Telécharger <v-icon ml-2>mdi-download </v-icon></v-btn
          >
        </v-row>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import html2pdf from "html2pdf.js";
export default {
  name: "Produits",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    loading: true,
    headers: [
      {
        text: "Nom produit",
        align: "start",
        sortable: false,
        value: "nomProduit",
      },
      { text: "Prix", value: "prixProduit" },
      { text: "description", value: "descriptionProduit" },
      { text: "Etoile", value: "NombreEtoile" },
      { text: "Categorie", value: "Idcategorie" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    categories: null,
    produits: null,
    editedIndex: -1,
    ajoutProduit: {
      nomProduit: "",
      prixProduit: 0,
      NombreEtoile: 0,
      descriptionProduit: "",
      categorie: "",
      image: 0,
    },

    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nouveau produit"
        : "Modifier un produit";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  mounted() {
    axios
      .get("http://localhost:5000/produits")
      .then((res) => {
        this.produits = res.data;
        this.loading = false;
      })
      .catch((e) => alert(e.message));

    axios
      .get("http://localhost:5000/categories/name")
      .then((res) => {
        this.categories = res.data;
        this.loading = false;
      })
      .catch((e) => alert(e.message));
  },

  methods: {
    initialize() {},

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    printFunc() {
      html2pdf(document.getElementById("table_product"), { margin: 1 });
    },
    refresh() {
      axios
        .get("http://localhost:5000/produits")
        .then((res) => {
          this.produits = res.data;
          this.loading = false;
        })
        .catch((e) => alert(e.message));
    },

    deleteItem(item) {
      axios
        .delete(`http://localhost:5000/produits/${item.id}`)
        .then((res) => {
          console.log(res);
          Vue.notify({
            title: "Notification",
            text: `${res.data}`,
            type: "success",
          });

          window.location.reload();
        })
        .catch((er) => {
          console.log(er);
          Vue.notify({
            title: "Notification",
            text: `${er.data}`,
            type: "success",
          });
        });
    },

    deleteItemConfirm() {
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        let i = 0;
        if (this.ajoutProduit.Idcategorie === "Breakfast") {
          i = 1;
        } else if (this.ajoutProduit.Idcategorie === "Lunch") {
          i = 3;
        } else {
          i = 4;
        }
        const ndata = {
          nomProduit: this.ajoutProduit.nomProduit,
          prixProduit: this.ajoutProduit.prixProduit,
          NombreEtoile: this.ajoutProduit.NombreEtoile,
          descriptionProduit: this.ajoutProduit.descriptionProduit,
          Idcategorie: i,
          imageProduit: this.ajoutProduit.image,
        };
        axios
          .post("http://localhost:5000/produits", ndata)
          .then((res) => {
            Vue.notify({
              title: "Notification",
              text: `${res.data}`,
              type: "success",
            });
            this.close();

            setTimeout(() => {
              window.location.reload();
            }, 1500);
          })
          .catch((e) => console.log(e));
      }
    },
  },
};
</script>

<style>
.circle_container {
  width: 100%;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.circle_container .circle {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid #537895;
  border-bottom: 2px dashed #537895;
  border-right: 2px dashed #537895;
  animation: ci 0.9s ease infinite;
}

.table_product {
  width: 95%;
  margin: auto;
  padding: 20px;
  background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
  border-radius: 5px;
}
.head {
  margin-bottom: 10px;
}

.table_product thead {
  color: #537895 !important;
  font-size: 18px;
}

@keyframes ci {
  0% {
    transform: rotate(0deg);
  }
  25% {
    border-left: 2px dashed #537895;
    border-bottom-color: #09203f;
  }
  50% {
    border-top: 2px dashed #537895;
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
