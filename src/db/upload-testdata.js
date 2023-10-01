require("dotenv").config();

const Sequelize = require("sequelize");

const dbName = process.env.DB_NAME || "city_for_citizens";
const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || "12345678";
const dbHost = process.env.DB_HOST || "localhost";

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "mysql",
  host: dbHost,
  logging: false,
});

const eventTypeModel = require("../models/eventTypeModel")(sequelize);
const eventAddressModel = require("../models/eventAddressModel")(sequelize);
const eventModel = require("../models/eventModel")(
  sequelize,
  eventAddressModel
);
const eventTypeRelationshipModel =
  require("../models/eventTypeRelationshipModel")(sequelize);

const eventTypes = [
  {
    event_type: "Квітковий фестиваль",
    locale: "uk_UA",
  },
  {
    event_type: "Гастрономічний фестиваль",
    locale: "uk_UA",
  },
  {
    event_type: "Фестиваль звичаєвої культури",
    locale: "uk_UA",
  },
  {
    event_type: "Культурний фестиваль",
    locale: "uk_UA",
  },
  {
    event_type: "Музичний фестиваль",
    locale: "uk_UA",
  },
  {
    event_type: "Літературний захід",
    locale: "uk_UA",
  },
  {
    event_type: "Музичний захід",
    locale: "uk_UA",
  },
  {
    event_type: "Спортивний захід",
    locale: "uk_UA",
  },
  {
    event_type: "Патріотичні заходи",
    locale: "uk_UA",
  },
  {
    event_type: "Святкова подія",
    locale: "uk_UA",
  },
  {
    event_type: "День міста",
    locale: "uk_UA",
  },
  {
    event_type: "Виставка",
    locale: "uk_UA",
  },
  {
    event_type: "Flower Festival",
    locale: "en_US",
  },
  {
    event_type: "Gastronomic Festival",
    locale: "en_US",
  },
  {
    event_type: "Festival of Folk Culture",
    locale: "en_US",
  },
  {
    event_type: "Cultural Festival",
    locale: "en_US",
  },
  {
    event_type: "Music Festival",
    locale: "en_US",
  },
  {
    event_type: "Literary Event",
    locale: "en_US",
  },
  {
    event_type: "Music Event",
    locale: "en_US",
  },
  {
    event_type: "Sports Event",
    locale: "en_US",
  },
  {
    event_type: "Patriotic Events",
    locale: "en_US",
  },
  {
    event_type: "Festive Event",
    locale: "en_US",
  },
  {
    event_type: "City Day",
    locale: "en_US",
  },
  {
    event_type: "Exhibition",
    locale: "en_US",
  },
];

const eventAddresses = [
  {
    city: "Київ",
    street: "вул. Лаврська, 31",
    notes:
      "Співоче поле розташоване на Печерських пагорбах на правому березі річки Дніпро, біля музею-монументу Батьківщина-мати.",
    coordinates: "50.4302484,30.4936464",
    locale: "uk_UA",
  },
  {
    city: "Вінниця",
    street: "вул. Маяковського",
    notes: "На Території SUN, на межі міста і лісу",
    coordinates: "49.202155, 28.472902",
    locale: "uk_UA",
  },
  {
    city: "Kyiv",
    street: "31 Lavrska St.",
    notes:
      "Spivoche Pole is located on the Pechersk Hills on the right bank of the Dnipro River, near the Motherland-Mother Museum-Monument.",
    coordinates: "50.4302484,30.4936464",
    locale: "en_US",
  },
  {
    city: "Vinnytsia",
    street: "Mayakovskoho St.",
    notes: "On the territory of SUN, on the border of the city and the forest.",
    coordinates: "49.202155, 28.472902",
    locale: "en_US",
  },
];

const events = [
  {
    event_title: 'Виставка квітів "Тюльпани на Співочому полі"',
    date_time: "2023-04-15 09:30:45",
    description:
      "Проводиться приблизно з середини квітня по середину травня, в залежності від погоди. Окрім тюльпанів зазвичай додаються атмосферні тематичні інсталяції по темі, тема щороку нова.",
    event_url: "https://www.facebook.com/spivochepole",
    event_image: "",
    event_address_id: 1,
    locale: "uk_UA",
  },
  {
    event_title: "Ticket to the SUN 2023",
    date_time: "2023-08-25 13:00:00",
    description:
      "3 дні, 5 локацій, купа майстер-класів, еко-активностей, розважальні зони, лекції, релакс-зони і багато іншого. І усе це серед сонячних галявин, саду, біля озер та лісу.",
    event_url:
      "https://api.blink.so/events/share/3f0168da-05d0-40e9-8ef0-14cbf510848d?locale=uk",
    event_image: "",
    event_address_id: 2,
    locale: "uk_UA",
  },
  {
    event_title: "Tulip Exhibition at Spivoche Pole",
    date_time: "2023-04-15 09:30:45",
    description:
      "Usually held from mid-April to mid-May, depending on the weather. In addition to tulips, atmospheric thematic installations on various themes are usually added, with a new theme every year.",
    event_url: "https://www.facebook.com/spivochepole",
    event_image: "",
    event_address_id: 1,
    locale: "en_US",
  },
  {
    event_title: "Ticket to the SUN 2023",
    date_time: "2023-08-25 13:00:00",
    description:
      "3 days, 5 locations, a bunch of masterclasses, eco-activities, entertainment zones, lectures, relaxation zones, and much more. And all of this amidst sunny glades, a garden, near lakes and forests.",
    event_url:
      "https://api.blink.so/events/share/3f0168da-05d0-40e9-8ef0-14cbf510848d?locale=en",
    event_image: "",
    event_address_id: 2,
    locale: "en_US",
  },
];

const eventTypeRelationships = [
  {
    event_id: 1,
    event_type_id: 1,
  },
  {
    event_id: 2,
    event_type_id: 1,
  },
  {
    event_id: 3,
    event_type_id: 7,
  },
  {
    event_id: 4,
    event_type_id: 7,
  },
];

async function insertData() {
  await eventTypeModel.bulkCreate(eventTypes);
  await eventAddressModel.bulkCreate(eventAddresses);
  await eventModel.bulkCreate(events);
  await eventTypeRelationshipModel.bulkCreate(eventTypeRelationships);
}
insertData();
