/**
 * places.js — Single source of truth for all project locations
 * Fathima Balika Muslim Maha Vidyalaya — Environmental Project Showcase
 *
 * Add a new place by pushing one object to the PLACES array.
 * Access on place.html via: place.html?id=1
 *
 * Images: replace assets/images/Before_ENV_XX.png and After_ENV_XX.png per project.
 */

const PLACES = [
  {
    id: 1,
    projectNo: "ENV-01",
    placeName: "Main Garden Area",
    location: "School Front Yard",
    description:
      "Our main garden area showcases native flowering plants and shrubs planted by students to beautify the school entrance. This initiative promotes biodiversity and gives pupils hands-on experience in soil preparation, planting, and daily care.",
    beforeImage: "assets/images/Before_ENV_01.png",
    afterImage: "assets/images/After_ENV_01.png",
    teachers: ["Teacher Name 1", "Teacher Name 2"],
    students: ["Student Name 1", "Student Name 2", "Student Name 3"],
    ogaMembers: ["OGA Member Name 1"],
  },
  {
    id: 2,
    projectNo: "ENV-02",
    placeName: "Tree Plantation Zone",
    location: "North Boundary of School Grounds",
    description:
      "Students planted shade and fruit trees along the northern boundary to create a green buffer and reduce heat around the playground. The zone is monitored regularly for watering, mulching, and growth records as part of our environmental science lessons.",
    beforeImage: "assets/images/Before_ENV_02.png",
    afterImage: "assets/images/After_ENV_02.png",
    teachers: ["Teacher Name 1", "Teacher Name 2"],
    students: ["Student Name 1", "Student Name 2", "Student Name 3"],
    ogaMembers: ["OGA Member Name 1"],
  },
  {
    id: 3,
    projectNo: "ENV-03",
    placeName: "Recycling Hub",
    location: "Near the Main Corridor",
    description:
      "The recycling hub collects paper, plastic, and metal waste from classrooms for sorting and responsible disposal. Student volunteers run weekly collection drives and educate peers on reducing single-use materials on campus.",
    beforeImage: "assets/images/Before_ENV_03.png",
    afterImage: "assets/images/After_ENV_03.png",
    teachers: ["Teacher Name 1", "Teacher Name 2"],
    students: ["Student Name 1", "Student Name 2", "Student Name 3"],
    ogaMembers: ["OGA Member Name 1"],
  },
  {
    id: 4,
    projectNo: "ENV-04",
    placeName: "Pond / Wetland Area",
    location: "Southwest Corner of Campus",
    description:
      "This small pond and wetland strip was restored to support local aquatic plants and visiting birds. Students study water quality, remove litter, and plant marginal species to keep the ecosystem healthy and visually appealing.",
    beforeImage: "assets/images/Before_ENV_04.png",
    afterImage: "assets/images/After_ENV_04.png",
    teachers: ["Teacher Name 1", "Teacher Name 2"],
    students: ["Student Name 1", "Student Name 2", "Student Name 3"],
    ogaMembers: ["OGA Member Name 1"],
  },
  {
    id: 5,
    projectNo: "ENV-05",
    placeName: "Compost Station",
    location: "Behind the Science Block",
    description:
      "Kitchen and garden waste from the school is turned into compost at this dedicated station. Pupils learn about decomposition, layering green and brown materials, and using finished compost to enrich the school gardens.",
    beforeImage: "assets/images/Before_ENV_05.png",
    afterImage: "assets/images/After_ENV_05.png",
    teachers: ["Teacher Name 1", "Teacher Name 2"],
    students: ["Student Name 1", "Student Name 2", "Student Name 3"],
    ogaMembers: ["OGA Member Name 1"],
  },
  {
    id: 6,
    projectNo: "ENV-06",
    placeName: "Butterfly Garden",
    location: "East Side Garden Bed",
    description:
      "A colourful bed of nectar-rich flowers was planted to attract butterflies and pollinators to the school grounds. Students observe species throughout the year and maintain the garden without chemical pesticides.",
    beforeImage: "assets/images/Before_ENV_06.png",
    afterImage: "assets/images/After_ENV_06.png",
    teachers: ["Teacher Name 1", "Teacher Name 2"],
    students: ["Student Name 1", "Student Name 2", "Student Name 3"],
    ogaMembers: ["OGA Member Name 1"],
  },
  {
    id: 7,
    projectNo: "ENV-07",
    placeName: "Rainwater Harvesting Point",
    location: "Main Building Rooftop & Storage Tank",
    description:
      "Rainwater from the main building roof is channelled into storage tanks for watering gardens and cleaning outdoor areas. This project teaches water conservation and reduces reliance on tap water during dry months.",
    beforeImage: "assets/images/Before_ENV_07.png",
    afterImage: "assets/images/After_ENV_07.png",
    teachers: ["Teacher Name 1", "Teacher Name 2"],
    students: ["Student Name 1", "Student Name 2", "Student Name 3"],
    ogaMembers: ["OGA Member Name 1"],
  },
  {
    id: 8,
    projectNo: "ENV-08",
    placeName: "School Entrance Greenery",
    location: "Main Gate & Pathway",
    description:
      "The entrance pathway was lined with potted plants, low hedges, and welcome signage to create a green first impression for visitors. Students take turns watering and trimming plants to keep the area neat and welcoming.",
    beforeImage: "assets/images/Before_ENV_08.png",
    afterImage: "assets/images/After_ENV_08.png",
    teachers: ["Teacher Name 1", "Teacher Name 2"],
    students: ["Student Name 1", "Student Name 2", "Student Name 3"],
    ogaMembers: ["OGA Member Name 1"],
  },
  {
    id: 9,
    projectNo: "ENV-09",
    placeName: "Sports Ground Border Plantation",
    location: "Perimeter of the Sports Field",
    description:
      "Fast-growing native trees and shrubs were planted along the sports ground border to provide shade, reduce dust, and define the playing area. The plantation also serves as a windbreak and habitat for small birds.",
    beforeImage: "assets/images/Before_ENV_09.png",
    afterImage: "assets/images/After_ENV_09.png",
    teachers: ["Teacher Name 1", "Teacher Name 2"],
    students: ["Student Name 1", "Student Name 2", "Student Name 3"],
    ogaMembers: ["OGA Member Name 1"],
  },
  {
    id: 10,
    projectNo: "ENV-10",
    placeName: "Herbal Garden",
    location: "Courtyard Near the Home Science Room",
    description:
      "A small herbal garden grows common medicinal and culinary plants such as mint, aloe, and lemongrass. Students learn traditional uses of herbs and how to harvest and dry leaves for simple home science demonstrations.",
    beforeImage: "assets/images/Before_ENV_10.png",
    afterImage: "assets/images/After_ENV_10.png",
    teachers: ["Teacher Name 1", "Teacher Name 2"],
    students: ["Student Name 1", "Student Name 2", "Student Name 3"],
    ogaMembers: ["OGA Member Name 1"],
  },
];
