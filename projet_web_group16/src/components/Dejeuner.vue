<template>
  <div>
    <h3>Salut les amis</h3>
    <template>
      <div class="cards">
        <v-card
          :loading="loading"
          class="mx-auto my-12"
          max-width="380"
          v-for="cat in produits"
          :key="cat.id"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="200px" :src="cat.img"></v-img>

          <v-card-title>{{ cat.nom }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">{{ cat.NombreEtoiles }}</div>
            </v-row>

            <div class="my-4 text-subtitle-1">
              $ {{ cat.prixPorduit }} ou {{ cat.prixPorduit * 2000 }} FC
            </div>

            <div>{{ cat.description }}</div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-text>
            <v-chip-group
              v-model="selection"
              active-class="deep-purple accent-4 white--text"
              column
            >
              <v-chip>5:30PM</v-chip>

              <v-chip>7:30PM</v-chip>

              <v-chip>8:00PM</v-chip>

              <v-chip>9:00PM</v-chip>
            </v-chip-group>
          </v-card-text>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text>
              <div>
                <v-col cols="auto">
                  <v-dialog
                    transition="dialog-bottom-transition"
                    max-width="600"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="deep-purple lighten-2"
                        v-bind="attrs"
                        v-on="on"
                        >Commander</v-btn
                      >
                    </template>
                    <template v-slot:default="dialog">
                      <v-card>
                        <v-toolbar color="primary" class="text-h5" dark
                          >Commande</v-toolbar
                        >
                        <v-card-text>
                          <div class="text-h5 pa-5">
                            Formulaire de commande

                            <p style="color: #334; font-size: 14px">
                              {{ cat.prixPorduit * quatite }}$ soit
                              {{ cat.prixPorduit * quatite * 2000 }} FC
                            </p>
                          </div>
                        </v-card-text>
                        <div style="width: 80%; margin: auto" class="p-10">
                          <v-form @submit="onSubmit">
                            <v-text-field
                              label="Votre nom :"
                              placeholder="placide"
                              v-model="nom"
                              outlined
                              name="nom"
                              dense
                              required
                            ></v-text-field>
                            <v-text-field
                              label="Votre adresse :"
                              placeholder="2 av.Mission Q. Nyalukemba"
                              outlined
                              v-model="adresse"
                              name="adresse"
                              dense
                              required
                            ></v-text-field>
                            <div style="display: flex">
                              <v-text-field
                                label="Quantité :"
                                placeholder="10"
                                outlined
                                v-model="quatite"
                                max="2"
                                name="quantite"
                                style="margin-right: 9px"
                                dense
                                required
                              ></v-text-field>
                              <v-select
                                :items="items"
                                label="Moyen de paiement"
                                outlined
                                v-model="moyenPaiement"
                                dense
                                required
                              ></v-select>
                            </div>
                            <v-text-field
                              label="Numero de telephone :"
                              placeholder="+243 999 999 999"
                              outlined
                              type="number"
                              v-model="numeroTelephone"
                              name="numero"
                              dense
                              required
                            ></v-text-field>

                            <v-container v-if="showLoading">
                              <div
                                style="
                                  display: flex;
                                  margin: 15px 0;
                                  align-items: center;
                                  justify-content: center;
                                "
                              >
                                <vue-ellipse-progress
                                  :data="circles"
                                  :progress="progress"
                                  :angle="-90"
                                  color="blue"
                                  :emptyColorFill="emptyColorFillGradient"
                                  :size="50"
                                  :thickness="5"
                                  lineMode="in 10"
                                  legendClass="legend-custom-style"
                                  dash="60 0.9"
                                  animation="reverse 700 400"
                                  :noData="false"
                                  :loading="true"
                                  fontColor="white"
                                  :half="false"
                                  :gap="2"
                                  fontSize="5rem"
                                >
                                  <span slot="legend-value">/200</span>
                                  <p slot="legend-caption">GOOD JOB</p>
                                </vue-ellipse-progress>
                              </div>
                            </v-container>
                            <v-btn
                              depressed
                              color="primary"
                              style="width: 100%"
                              large
                              v-if="!showLoading"
                              type="submit"
                            >
                              Passer la commande
                            </v-btn>
                          </v-form>
                        </div>
                        <v-card-actions class="justify-end mt-4 mr-10 pb-4">
                          <v-btn
                            text
                            @click="
                              dialog.value = false;
                              onClose();
                            "
                            >Annuler</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-col>
              </div>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </template>
    <div>{{ $route.params.id != 2 && "salut" }}</div>
  </div>
</template>

<script>
import Vue from "vue";
import { getProduits } from "./data";
import axios from "axios";

const items = ["Airtel money", "Orange money", "M-pesa", "Presentiel"];
export default {
  data() {
    return {
      produits: getProduits(window.location.href.split("/").at(5)),
      items: items,
      showLoading: false,
      nom: "",
      adresse: "",
      quatite: "",
      moyenPaiement: "",
      numeroTelephone: "",
    };
  },
  methods: {
    userPage() {
      return this.$route.params.id;
    },
    onSubmit(e) {
      e.preventDefault();

      const data = {
        nom: this.nom,
        adresse: this.adresse,
        quantite: parseInt(this.quatite),
        moyenPaiement: this.moyenPaiement,
        numeroTelephone: parseInt(this.numeroTelephone),
      };

      const addData = async () => {
        await axios
          .post("http://localhost:5000/commandes", data)
          .then((res) => {
            setTimeout(() => {
              Vue.notify({
                title: "Notification",
                text: "Votre commande a éte placé avec success",
                type: "success",
              });
              this.showLoading = false;
              setTimeout(() => {
                window.location.replace(`/}`);
              }, 2000);
            }, 3000);
            console.log(res);
          })
          .catch((e) => {
            console.log(e);
            Vue.notify({
              title: "Notification",
              text: "Nous nous excusons il y a une erreur innatendue ",
              type: "error",
            });
          });
      };

      //Ajout des données dans la base des données
      if (
        data.nom === "" ||
        data.adresse == "" ||
        data.quantite == "" ||
        data.quantite == "" ||
        data.moyenPaiement == "" ||
        data.numeroTelephone == ""
      ) {
        alert("Veuillez saisir tout les champs");
      } else {
        this.showLoading = true;
        addData();
      }
    },
    onClose() {
      this.showLoading = false;
    },
    getTest() {
      console.log(this.nom);
    },
  },
};
</script>
