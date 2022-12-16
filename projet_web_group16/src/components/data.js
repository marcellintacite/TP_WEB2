import bg1 from "../assets/b3.jpg";
import bg2 from "../assets/bg.jpg";
import bg3 from "../assets/bg4.jpg";
import bg5 from "../assets/bg2.jpg";

import img1 from "../assets/break.jpg";
import img2 from "../assets/breakfast.jpg";
import img3 from "../assets/dejeuner.jpg";
import img4 from "../assets/dejeuner1.jpg";
import img5 from "../assets/dejeuner3.jpg";
import img6 from "../assets/foufou.jpg";
import img7 from "../assets/fruit.jpg";
import img8 from "../assets/lunch.jpg";
import img9 from "../assets/super.jpg";
import img10 from "../assets/super2.jpg";

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
    nom: "Lunch",
    description: "Les meuilleurs repas du midi dans votre resto préféré!",
    lien: "/categorie/lunch",
    img: bg2,
  },
  {
    id: 3,
    nom: "Souper",
    description:
      "Retouvez les plats du soir chez nous avec d'autres avantages.",
    lien: "/categorie/super",
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

const produits = [
  {
    id: "1",
    nom: "Café chaud",
    prixPorduit: 20,
    NombreEtoiles: 3,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium deleniti expedita voluptates consectetur recusandae sunt minima sapiente voluptatem quaerat delectus?",
    quantite: 1,
    categorie: "Breakfast",
    img: img1,
  },
  {
    id: "2",
    nom: "Foufou",
    prixPorduit: 5,
    NombreEtoiles: 3,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium deleniti expedita voluptates consectetur recusandae sunt minima sapiente voluptatem quaerat delectus?",
    quantite: 1,
    categorie: "Breakfast",
    img: img2,
  },
  {
    id: "3",
    nom: "Merveilles",
    prixPorduit: 6,
    NombreEtoiles: 3,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium deleniti expedita voluptates consectetur recusandae sunt minima sapiente voluptatem quaerat delectus?",
    quantite: 1,
    categorie: "Dejeuner",
    img: img3,
  },
  {
    id: "4",
    nom: "Lait au café",
    prixPorduit: 7,
    NombreEtoiles: 3,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium deleniti expedita voluptates consectetur recusandae sunt minima sapiente voluptatem quaerat delectus?",
    quantite: 1,
    categorie: "Dejeuner",
    img: img4,
  },
  {
    id: "5",
    nom: "Jus orange",
    prixPorduit: 7,
    NombreEtoiles: 3,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium deleniti expedita voluptates consectetur recusandae sunt minima sapiente voluptatem quaerat delectus?",
    quantite: 1,
    categorie: "Dejeuner",
    img: img5,
  },
  {
    id: "6",
    nom: "Foufou + viande",
    prixPorduit: 9,
    NombreEtoiles: 3,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium deleniti expedita voluptates consectetur recusandae sunt minima sapiente voluptatem quaerat delectus?",
    quantite: 1,
    categorie: "Souper",
    img: img6,
  },
  {
    id: "7",
    nom: "Pomme",
    prixPorduit: 2,
    NombreEtoiles: 3,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium deleniti expedita voluptates consectetur recusandae sunt minima sapiente voluptatem quaerat delectus?",
    quantite: 1,
    categorie: "Souper",
    img: img7,
  },
  {
    id: "8",
    nom: "Foufou + poisson",
    prixPorduit: 2.5,
    NombreEtoiles: 6,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium deleniti expedita voluptates consectetur recusandae sunt minima sapiente voluptatem quaerat delectus?",
    quantite: 1,
    categorie: "Souper",
    img: img8,
  },
  {
    id: "9",
    nom: "Viande + banane",
    prixPorduit: 4.5,
    NombreEtoiles: 5,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium deleniti expedita voluptates consectetur recusandae sunt minima sapiente voluptatem quaerat delectus?",
    quantite: 1,
    categorie: "Breakfast",
    img: img9,
  },
  {
    id: "10",
    nom: "Poulet avec sauce",
    prixPorduit: 20,
    NombreEtoiles: 6,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium deleniti expedita voluptates consectetur recusandae sunt minima sapiente voluptatem quaerat delectus?",
    quantite: 1,
    categorie: "Souper",
    img: img10,
  },
];

const commandes = [];

const getProduits = (id) => {
  let ndata = produits.filter((p) => p.categorie == id);
  return ndata;
};
const addCommandes = (data) => {
  commandes.push(data);
};

export { categorie, produits, getProduits, commandes, addCommandes };
