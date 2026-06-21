/**
 * places.js — Single source of truth for all project locations
 * Fathima Balika Muslim Maha Vidyalaya — Environmental Project Showcase
 *
 * Add a new place by pushing one object to the PLACES array.
 * Access on place.html via: place.html?id=1
 *
 * Images: assets/images/Before_ENV_XX.jpg and After_ENV_XX.jpg per project.
 */

/** Build a short description from place name and assigned grade(s) */
function buildPlaceDescription(placeName, grades) {
  if (!grades || !grades.length) {
    return `Environmental improvements at ${placeName}, led by our school community.`;
  }
  const gradeText =
    grades.length === 1
      ? grades[0]
      : `${grades.slice(0, -1).join(", ")} and ${grades[grades.length - 1]}`;
  return `Environmental improvements at ${placeName}, led by ${gradeText}.`;
}

const PLACES = [
  {
    id: 1,
    projectNo: "ENV-01",
    placeName: "Main entrance to E Hall",
    location: "Main entrance to E Hall",
    description: buildPlaceDescription("Main entrance to E Hall", [
      "Grade 13 Arts",
      "Grade 12 New",
    ]),
    beforeImage: "assets/images/Before_ENV_01.jpg",
    afterImage: "assets/images/After_ENV_01.jpg",
    grades: ["Grade 13 Arts", "Grade 12 New"],
    prefects: [
      "F. Nuzla (Gr. 13)",
      "R.A. Aara (Gr. 11)",
      "R.A. Amani",
      "M.R.F. Aamina",
    ],
    teachers: ["Mrs. M.S.F. Bushra", "Mrs. M.F.F. Fazliya"],
    ogaMembers: ["Mrs. Rizmina Muhajireen", "Mrs. Shamila Dilshad"],
  },
  {
    id: 2,
    projectNo: "ENV-02",
    placeName: "Office Building area & Prayer Room Area",
    location: "Office Building area & Prayer Room Area",
    description: buildPlaceDescription(
      "Office Building area & Prayer Room Area",
      ["Grade 12A"]
    ),
    beforeImage: "assets/images/Before_ENV_02.jpg",
    afterImage: "assets/images/After_ENV_02.jpg",
    grades: ["Grade 12A"],
    prefects: [
      "Aamina Amrin (Gr. 13)",
      "Katheeja (Gr. 11)",
      "M.I. Ilma",
      "Shahla",
    ],
    teachers: ["Mrs. A.M.F. Razeena"],
    ogaMembers: ["Mrs. Shakira Azam", "Mrs. Maziniya Haniffa"],
  },
  {
    id: 3,
    projectNo: "ENV-03",
    placeName: "A Hall area",
    location: "A Hall area",
    description: buildPlaceDescription("A Hall area", ["Grade 11B"]),
    beforeImage: "assets/images/Before_ENV_03.jpg",
    afterImage: "assets/images/After_ENV_03.jpg",
    grades: ["Grade 11B"],
    prefects: ["Salha (Gr. 13)", "Miska", "M.P.P. Katheeja", "F. Farha"],
    teachers: ["Mrs. M.T.F. Roshana", "Mrs. M.F.F. Humaiza"],
    ogaMembers: ["Mrs. Fazeena Farook", "Mrs. Rizna Rilwan"],
  },
  {
    id: 4,
    projectNo: "ENV-04",
    placeName: "B Hall Front",
    location: "B Hall Front",
    description: buildPlaceDescription("B Hall Front", ["Grade 9A"]),
    beforeImage: "assets/images/Before_ENV_04.jpg",
    afterImage: "assets/images/After_ENV_04.jpg",
    grades: ["Grade 9A"],
    prefects: ["M.L. Aysha (Gr. 12)", "M.D.F. Amna"],
    teachers: ["Mrs. T.F. Izrath", "Mrs. M.S. Sareena Beebi"],
    ogaMembers: ["Mrs. Rizna Razick", "Mrs. Fazmina"],
  },
  {
    id: 5,
    projectNo: "ENV-05",
    placeName: "B Hall Back & C Hall Steps (right)",
    location: "B Hall Back & C Hall Steps (right)",
    description: buildPlaceDescription("B Hall Back & C Hall Steps (right)", [
      "Grade 9B",
    ]),
    beforeImage: "assets/images/Before_ENV_05.jpg",
    afterImage: "assets/images/After_ENV_05.jpg",
    grades: ["Grade 9B"],
    prefects: ["M.F. Abdha (Gr. 11)", "Ilfa Manal"],
    teachers: ["Mrs. M.R.F. Nuzla"],
    ogaMembers: ["Mrs. Shafra", "Mrs. F. Rushdha"],
  },
  {
    id: 6,
    projectNo: "ENV-06",
    placeName: "A Hall steps along to C hall mango tree area",
    location: "A Hall steps along to C hall mango tree area",
    description: buildPlaceDescription(
      "A Hall steps along to C hall mango tree area",
      ["Grade 11A"]
    ),
    beforeImage: "assets/images/Before_ENV_06.jpg",
    afterImage: "assets/images/After_ENV_06.jpg",
    grades: ["Grade 11A"],
    prefects: [
      "Ilma (Gr. 13)",
      "Shaima (Gr. 13)",
      "Shaheera",
      "M.F.F. Hana",
    ],
    teachers: ["Mrs. N.K.N. Nilanthi", "Mrs. H.L.U. Haleema"],
    ogaMembers: ["Mrs. Fenoziya Kaleel", "Mrs. Haneen"],
  },
  {
    id: 7,
    projectNo: "ENV-07",
    placeName: "C Hall area",
    location: "C Hall area",
    description: buildPlaceDescription("C Hall area", ["Grade 10B"]),
    beforeImage: "assets/images/Before_ENV_07.jpg",
    afterImage: "assets/images/After_ENV_07.jpg",
    grades: ["Grade 10B"],
    prefects: ["Rukshana (Gr. 12)", "R.H. Nuha"],
    teachers: [
      "Mrs. M.H.F. Rizama",
      "Mrs. H.D.A. Karunathilaka (Anoja Tr)",
    ],
    ogaMembers: ["Mrs. Haniya Hanan", "Mrs. Ruzna"],
  },
  {
    id: 8,
    projectNo: "ENV-08",
    placeName: "F Hall front + D Hall Slope area",
    location: "F Hall front + D Hall Slope area",
    description: buildPlaceDescription("F Hall front + D Hall Slope area", [
      "Grade 6A",
    ]),
    beforeImage: "assets/images/Before_ENV_08.jpg",
    afterImage: "assets/images/After_ENV_08.jpg",
    grades: ["Grade 6A"],
    prefects: ["Hana (Gr. 11)", "M.R. Aamina"],
    teachers: ["Mrs. M.R.F. Fahima", "Mrs. A.L. Reliya"],
    ogaMembers: ["Mrs. Rameeza", "Mrs. Bushra"],
  },
  {
    id: 9,
    projectNo: "ENV-09",
    placeName: "F Hall Back + Washroom road",
    location: "F Hall Back + Washroom road",
    description: buildPlaceDescription("F Hall Back + Washroom road", [
      "Grade 8B",
    ]),
    beforeImage: "assets/images/Before_ENV_09.jpg",
    afterImage: "assets/images/After_ENV_09.jpg",
    grades: ["Grade 8B"],
    prefects: ["Saara (Gr. 11)", "Minha", "M.A. Shaza"],
    teachers: ["Mrs. S.T.S. Fausiya", "Mrs. G.F. Zainab"],
    ogaMembers: ["Mrs. Rizwana", "Mrs. Razana Muthalif"],
  },
  {
    id: 10,
    projectNo: "ENV-10",
    placeName: "Home Science room area",
    location: "Home Science room area",
    description: buildPlaceDescription("Home Science room area", ["Grade 7A"]),
    beforeImage: "assets/images/Before_ENV_10.jpg",
    afterImage: "assets/images/After_ENV_10.jpg",
    grades: ["Grade 7A"],
    prefects: ["Raifa (Gr. 11)", "M.F.F. Hamra"],
    teachers: ["Mrs. M.F. Rifka", "Mrs. A.F. Rimsitha"],
    ogaMembers: ["Mrs. Nizla Musthaq", "Mrs. Farhana"],
  },
  {
    id: 11,
    projectNo: "ENV-11",
    placeName: "Science Lab Area",
    location: "Science Lab Area",
    description: buildPlaceDescription("Science Lab Area", ["Grade 8A"]),
    beforeImage: "assets/images/Before_ENV_11.jpg",
    afterImage: "assets/images/After_ENV_11.jpg",
    grades: ["Grade 8A"],
    prefects: ["A.S.F. Shamla (Gr. 11)", "M.H. Fathima"],
    teachers: ["Mrs. M.A.I. Mufliha", "Mrs. M.S.F. Zuhaira"],
    ogaMembers: ["Mrs. Rihana Farwin", "Mrs. Rizna Shareef"],
  },
  {
    id: 12,
    projectNo: "ENV-12",
    placeName: "G Hall area",
    location: "G Hall area",
    description: buildPlaceDescription("G Hall area", ["Grade 6B"]),
    beforeImage: "assets/images/Before_ENV_12.jpg",
    afterImage: "assets/images/After_ENV_12.jpg",
    grades: ["Grade 6B"],
    prefects: ["Nasla (Gr. 11)", "Aathifa"],
    teachers: ["Mrs. S.F. Asfara", "Mrs. M.W.F. Zulfa"],
    ogaMembers: ["Mrs. A.M.F. Rizla", "Mrs. Faidha"],
  },
  {
    id: 13,
    projectNo: "ENV-13",
    placeName: "D hall area + Children's Park",
    location: "D hall area + Children's Park",
    description: buildPlaceDescription("D hall area + Children's Park", [
      "Grade 7B",
    ]),
    beforeImage: "assets/images/Before_ENV_13.jpg",
    afterImage: "assets/images/After_ENV_13.jpg",
    grades: ["Grade 7B"],
    prefects: ["Rasheedha (Gr. 11)", "Muneefa"],
    teachers: ["Mrs. M.U.F. Shaheera", "Mrs. A.S.F. Rushdha"],
    ogaMembers: ["Mrs. Shukriya Jiffry", "Mrs. Shiyana"],
  },
  {
    id: 14,
    projectNo: "ENV-14",
    placeName: "Ground area",
    location: "Ground area",
    description: buildPlaceDescription("Ground area", ["Grade 10A"]),
    beforeImage: "assets/images/Before_ENV_14.jpg",
    afterImage: "assets/images/After_ENV_14.jpg",
    grades: ["Grade 10A"],
    prefects: ["Yumna (Gr. 13)", "Faseeha", "Hamdha"],
    teachers: ["Mrs. M.B. Zameena Banu", "Mrs. M.K.F. Mafaza"],
    ogaMembers: ["Mrs. Shafra Beebi", "Mrs. Raihana Rauf"],
  },
];
