import bodySplashImg from "../assets/images/bodysplash.png";
import lipGlossImg from "../assets/images/lip-gloss-one.jpg";
import paletteImg from "../assets/images/paleta-pastel.jpg";
import lipFruitImg from "../assets/images/lip-fruit.jpg";

const product = (id, title, brand, image) => ({
  id,
  title,
  brand,
  price: "R$ 85,00",
  image,
});

const bodySplash = (id) =>
  product(id, "Body Splash Maracujá", "Belkit", bodySplashImg);
const lipGloss = (id) => product(id, "Lip Gloss One", "Belkit", lipGlossImg);
const palette = (id) => product(id, "Paleta Pastel", "Belkit", paletteImg);
const lipFruit = (id) => product(id, "Lip Fruit", "Jummyju", lipFruitImg);

const cycle = (idStart, count, makers) =>
  Array.from({ length: count }, (_, i) =>
    makers[i % makers.length](idStart + i),
  );

export const mockCategories = [
  {
    id: 1,
    name: "Todos",
    products: cycle(1, 8, [bodySplash, lipGloss, palette, lipFruit]),
  },
  {
    id: 2,
    name: "Banho & Corpo",
    products: cycle(101, 10, [bodySplash]),
  },
  {
    id: 3,
    name: "Maquiagem",
    products: cycle(201, 12, [lipGloss, palette, lipFruit]),
  },
  {
    id: 4,
    name: "Skincare",
    products: Array.from({ length: 3 }, (_, i) =>
      product(301 + i, `Skincare ${i + 1}`, "Belkit", bodySplashImg),
    ),
  },
];

export const mockHighlights = [lipFruit(901), bodySplash(902), palette(903)]