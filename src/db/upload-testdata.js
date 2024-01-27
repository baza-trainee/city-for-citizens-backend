const {
  EventAddress,
  EventTypes,
  Events,
  EventTypeRelationships,
  Users,
  Tokens,
  Contacts,
  Partners,
  Documents,
} = require('../models');

const eventTypes = [
  {
    eventType: 'Квітковий фестиваль',
    locale: 'uk_UA',
  },
  {
    eventType: 'Гастрономічний фестиваль',
    locale: 'uk_UA',
  },
  {
    eventType: 'Фестиваль звичаєвої культури',
    locale: 'uk_UA',
  },
  {
    eventType: 'Культурний фестиваль',
    locale: 'uk_UA',
  },
  {
    eventType: 'Музичний фестиваль',
    locale: 'uk_UA',
  },
  {
    eventType: 'Літературний захід',
    locale: 'uk_UA',
  },
  {
    eventType: 'Музичний захід',
    locale: 'uk_UA',
  },
  {
    eventType: 'Спортивний захід',
    locale: 'uk_UA',
  },
  {
    eventType: 'Патріотичні заходи',
    locale: 'uk_UA',
  },
  {
    eventType: 'Святкова подія',
    locale: 'uk_UA',
  },
  {
    eventType: 'День міста',
    locale: 'uk_UA',
  },
  {
    eventType: 'Виставка',
    locale: 'uk_UA',
  },
  {
    eventType: 'Flower Festival',
    locale: 'en_US',
  },
  {
    eventType: 'Gastronomic Festival',
    locale: 'en_US',
  },
  {
    eventType: 'Festival of Folk Culture',
    locale: 'en_US',
  },
  {
    eventType: 'Cultural Festival',
    locale: 'en_US',
  },
  {
    eventType: 'Music Festival',
    locale: 'en_US',
  },
  {
    eventType: 'Literary Event',
    locale: 'en_US',
  },
  {
    eventType: 'Music Event',
    locale: 'en_US',
  },
  {
    eventType: 'Sports Event',
    locale: 'en_US',
  },
  {
    eventType: 'Patriotic Events',
    locale: 'en_US',
  },
  {
    eventType: 'Festive Event',
    locale: 'en_US',
  },
  {
    eventType: 'City Day',
    locale: 'en_US',
  },
  {
    eventType: 'Exhibition',
    locale: 'en_US',
  },
];

const eventAddresses = [
  {
    city: 'Київ',
    street: 'вул. Лаврська, 31',
    notes:
      'Співоче поле розташоване на Печерських пагорбах на правому березі річки Дніпро, біля музею-монументу Батьківщина-мати.',
    coordinates: '50.4302484,30.4936464',
    locale: 'uk_UA',
  },
  {
    city: 'Вінниця',
    street: 'вул. Маяковського',
    notes: 'На Території SUN, на межі міста і лісу',
    coordinates: '49.202155, 28.472902',
    locale: 'uk_UA',
  },
  {
    city: 'Kyiv',
    street: '31 Lavrska St.',
    notes:
      'Spivoche Pole is located on the Pechersk Hills on the right bank of the Dnipro River, near the Motherland-Mother Museum-Monument.',
    coordinates: '50.4302484,30.4936464',
    locale: 'en_US',
  },
  {
    city: 'Vinnytsia',
    street: 'Mayakovskoho St.',
    notes: 'On the territory of SUN, on the border of the city and the forest.',
    coordinates: '49.202155, 28.472902',
    locale: 'en_US',
  },
];

const events = [
  {
    idIdentifier: '550e8400-e29b-41d4-a716-446655440000',
    eventTitle: 'Виставка квітів "Тюльпани на Співочому полі"',
    dateTime: '2023-04-15 09:30:45',
    description:
      'Проводиться приблизно з середини квітня по середину травня, в залежності від погоди. Окрім тюльпанів зазвичай додаються атмосферні тематичні інсталяції по темі, тема щороку нова.',
    eventUrl: 'https://www.facebook.com/spivochepole',
    eventImage: '',
    eventAddressId: 1,
    locale: 'uk_UA',
  },
  {
    idIdentifier: '450e8400-e29b-41d4-a716-446655440000',
    eventTitle: 'Ticket to the SUN 2023',
    dateTime: '2023-08-25 13:00:00',
    description:
      '3 дні, 5 локацій, купа майстер-класів, еко-активностей, розважальні зони, лекції, релакс-зони і багато іншого. І усе це серед сонячних галявин, саду, біля озер та лісу.',
    eventUrl:
      'https://api.blink.so/events/share/3f0168da-05d0-40e9-8ef0-14cbf510848d?locale=uk',
    eventImage: '',
    eventAddressId: 2,
    locale: 'uk_UA',
  },
  {
    idIdentifier: '550e8400-e29b-41d4-a716-446655440000',
    eventTitle: 'Tulip Exhibition at Spivoche Pole',
    dateTime: '2023-04-15 09:30:45',
    description:
      'Usually held from mid-April to mid-May, depending on the weather. In addition to tulips, atmospheric thematic installations on various themes are usually added, with a new theme every year.',
    eventUrl: 'https://www.facebook.com/spivochepole',
    eventImage: '',
    eventAddressId: 3,
    locale: 'en_US',
  },
  {
    idIdentifier: '450e8400-e29b-41d4-a716-446655440000',
    eventTitle: 'Ticket to the SUN 2023',
    dateTime: '2023-08-25 13:00:00',
    description:
      '3 days, 5 locations, a bunch of masterclasses, eco-activities, entertainment zones, lectures, relaxation zones, and much more. And all of this amidst sunny glades, a garden, near lakes and forests.',
    eventUrl:
      'https://api.blink.so/events/share/3f0168da-05d0-40e9-8ef0-14cbf510848d?locale=en',
    eventImage: '',
    eventAddressId: 4,
    locale: 'en_US',
  },
];

const eventTypeRelationships = [
  {
    eventId: 1,
    eventTypeId: 1,
  },
  {
    eventId: 2,
    eventTypeId: 4,
  },
  {
    eventId: 3,
    eventTypeId: 13,
  },
  {
    eventId: 4,
    eventTypeId: 16,
  },
];

const users = [
  {
    id: 1,
    name: 'Admin',
    email: 'info@misto-fest.fun',
    password: '$2b$10$GRwx.2R4DmMcATzCBIK8vOdFB79VvoYop9M/HFd2JtAvB7Jb7Xo3W',
    activationLink: 'bd333151-ab20-436b-8616-90bfe449e778',
    isActivated: true,
  },
];
const tokens = [
  {
    id: 1,
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsImlzQWN0aXZhdGVkIjpmYWxzZSwiaWF0IjoxNjk4MjY2NjkwLCJleHAiOjE2OTgyNjY3MjB9.su4EG5QYNtpG8CEtvV5AlpGY1VSVCuh6jhTrPbkWfQs',
    userId: 1,
  },
];
const contacts = [
  {
    id: 1,
    email: 'info@misto-fest.fun',
    phone: '+380675681788',
  },
];
const partners = [
  {
    id: 1,
    name: 'Baza Trainee',
    link: 'https://baza-trainee.tech',
    image: 'partner1.jpg',
  },
  {
    id: 2,
    name: '2Baza Trainee',
    link: 'https://baza-trainee.tech',
    image: 'partner2.jpg',
  },
];
const documents = [
  {
    id: 1,
    name: 'Політика конфіденційності',
    file: 'privacy-policy.pdf',
  },
  {
    id: 2,
    name: 'Правила користування сайтом',
    file: 'site-rules.pdf',
  },
];

async function insertData() {
  try {
    console.info('Starting to upload to DB... Wait...');
    await EventTypes.bulkCreate(eventTypes);
    await EventAddress.bulkCreate(eventAddresses);
    await Events.bulkCreate(events);
    await EventTypeRelationships.bulkCreate(eventTypeRelationships);
    await Users.bulkCreate(users);
    await Tokens.bulkCreate(tokens);
    await Contacts.bulkCreate(contacts);
    await Partners.bulkCreate(partners);
    await Documents.bulkCreate(documents);
  } catch (error) {
    console.error('Error uploading data to DB:', error);
  }
}

exports.insertData = insertData;
