export interface Pet {
  id: string;
  name: string;
  age: string;
  size: string;
  type: string;
  breed: string;
  sex: string;
  shelter: string;
  location: string;
  description: string;
  image: string;
}

export const pets: Pet[] = [
  {
    id: "1",
    name: "Rocky",
    age: "2 años",
    size: "Grande",
    type: "Perro",
    breed: "Mestizo",
    sex: "Macho",
    shelter: "Refugio Huellitas",
    location: "Córdoba",
    description:
      "Rocky es un perro muy juguetón y cariñoso. Le encanta correr en espacios abiertos y se lleva bien con otros perros.",
    image:
      "https://images.unsplash.com/photo-1604321477174-193020a2b8e5?q=80&w=1131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    name: "Luna",
    age: "1 año",
    size: "Pequeño",
    type: "Gato",
    breed: "Común europeo",
    sex: "Hembra",
    shelter: "Refugio Patitas Felices",
    location: "Córdoba",
    description:
      "Luna es una gata tranquila y curiosa. Ideal para departamentos, disfruta de los lugares altos y el sol.",
    image:
      "https://images.unsplash.com/photo-1742816383154-3edc9287c75c?q=80&w=1163&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    name: "Toby",
    age: "4 años",
    size: "Mediano",
    type: "Perro",
    breed: "Caniche",
    sex: "Macho",
    shelter: "Refugio Amigos Fieles",
    location: "Villa Carlos Paz",
    description:
      "Toby es un perro tranquilo, ideal para familias con niños. Ya está castrado y con todas sus vacunas al día.",
    image:
      "https://images.unsplash.com/photo-1582720670824-8a9316cb1773?q=80&w=1185&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "4",
    name: "Mia",
    age: "3 años",
    size: "Mediano",
    type: "Gato",
    breed: "Siamés",
    sex: "Hembra",
    shelter: "Refugio Patitas Felices",
    location: "Córdoba",
    description:
      "Mia es independiente pero muy afectuosa con su familia. Se adapta bien a otros gatos.",
    image:
      "https://images.unsplash.com/photo-1568309386325-ef86f13ac533?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "5",
    name: "Simón",
    age: "6 meses",
    size: "Pequeño",
    type: "Perro",
    breed: "Labrador",
    sex: "Macho",
    shelter: "Refugio Huellitas",
    location: "Córdoba",
    description:
      "Simón es un cachorro muy enérgico, necesita una familia activa que lo ayude a canalizar su energía.",
    image:
      "https://images.unsplash.com/photo-1615146380514-5966f04ba739?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "6",
    name: "Nala",
    age: "2 años",
    size: "Mediano",
    type: "Gato",
    breed: "Mestizo",
    sex: "Hembra",
    shelter: "Refugio Amigos Fieles",
    location: "Villa Carlos Paz",
    description:
      "Nala fue rescatada de la calle. Es cariñosa y ronronea apenas la acarician.",
    image:
      "https://images.unsplash.com/photo-1598628599796-2a454fa7d9c5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
