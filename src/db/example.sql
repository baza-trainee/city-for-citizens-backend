DROP DATABASE IF EXISTS `city_for_citizens`;
CREATE DATABASE IF NOT EXISTS `city_for_citizens` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `city_for_citizens`;


CREATE TABLE IF NOT EXISTS event_types (
id INT PRIMARY KEY AUTO_INCREMENT,
event_type VARCHAR(255) NOT NULL,
locale varchar(10) NOT NULL,
UNIQUE(event_type, locale)
);



CREATE TABLE IF NOT EXISTS event_address (
id INT PRIMARY KEY AUTO_INCREMENT,
city VARCHAR(255) NOT NULL,
street VARCHAR(255),
notes TEXT,
coordinates VARCHAR(255) NOT NULL,
locale varchar(10) NOT NULL
);



CREATE TABLE IF NOT EXISTS events (
id INT PRIMARY KEY AUTO_INCREMENT,
event_title VARCHAR(255) NOT NULL,
`date_time` DATETIME NOT NULL,
`description` TEXT,
event_url VARCHAR(255),
event_image VARCHAR(255),
event_address_id INT NOT NULL,
locale varchar(10) NOT NULL,
FOREIGN KEY (event_address_id) REFERENCES event_address(id),
UNIQUE(`date_time`, event_address_id, locale)
);

CREATE TABLE IF NOT EXISTS event_type_relationships (
event_id int NOT NULL,
event_type_id int NOT NULL,
PRIMARY KEY (event_id, event_type_id),
FOREIGN KEY (event_id) REFERENCES events(id),
FOREIGN KEY (event_type_id) REFERENCES event_types(id)
);


INSERT INTO event_types (event_type, locale) VALUES
  ('Квітковий фестиваль', 'uk_UA'),
  ('Гастрономічний фестиваль', 'uk_UA'),
  ('Фестиваль звичаєвої культури', 'uk_UA'),
  ('Культурний фестиваль', 'uk_UA'),
  ('Музичний фестиваль', 'uk_UA'),
  ('Літературний захід', 'uk_UA'),
  ('Музичний захід', 'uk_UA'),
  ('Спортивний захід', 'uk_UA'),
  ('Патріотичні заходи', 'uk_UA'),
  ('Святкова подія', 'uk_UA'),
  ('День міста', 'uk_UA'),
  ('Виставка', 'uk_UA'),
  ('Flower Festival', 'en_US'),
  ('Gastronomic Festival', 'en_US'),
  ('Festival of Folk Culture', 'en_US'),
  ('Cultural Festival', 'en_US'),
  ('Music Festival', 'en_US'),
  ('Literary Event', 'en_US'),
  ('Music Event', 'en_US'),
  ('Sports Event', 'en_US'),
  ('Patriotic Events', 'en_US'),
  ('Festive Event', 'en_US'),
  ('City Day', 'en_US'),
  ('Exhibition', 'en_US');


INSERT INTO event_address (city, street, notes, coordinates, locale) VALUES
  ('Київ', 'вул. Лаврська, 31', 'Співоче поле розташоване на Печерських пагорбах на правому березі річки Дніпро, біля музею-монументу Батьківщина-мати.', '50.4302484,30.4936464', 'uk_UA'),
  ('Вінниця', 'вул. Маяковського', 'На Території SUN, на межі міста і лісу', '49.202155, 28.472902', 'uk_UA'),
  ('Kyiv', '31 Lavrska St.', 'Spivoche Pole is located on the Pechersk Hills on the right bank of the Dnipro River, near the Motherland-Mother Museum-Monument.', '50.4302484,30.4936464', 'en_US'),
  ('Vinnytsia', 'Mayakovskoho St.', 'On the territory of SUN, on the border of the city and the forest.', '49.202155, 28.472902', 'en_US');


INSERT INTO events (event_title, date_time, description, event_url, event_image, event_address_id, locale) VALUES
  ('Виставка квітів "Тюльпани на Співочому полі"', '2023-04-15 09:30:45', 'Проводиться приблизно з середини квітня по середину травня, в залежності від погоди. Окрім тюльпанів зазвичай додаються атмосферні тематичні інсталяції по темі, тема щороку нова.', 'https://www.facebook.com/spivochepole', '', 1, 'uk_UA'),
  ('Ticket to the SUN 2023', '2023-08-25 13:00:00', '3 дні, 5 локацій, купа майстер-класів, еко-активностей, розважальні зони, лекції, релакс-зони і багато іншого. І усе це серед сонячних галявин, саду, біля озер та лісу.', 'https://api.blink.so/events/share/3f0168da-05d0-40e9-8ef0-14cbf510848d?locale=uk', '', 2, 'uk_UA'),
  ('Tulip Exhibition at Spivoche Pole', '2023-04-15 09:30:45', 'Usually held from mid-April to mid-May, depending on the weather. In addition to tulips, atmospheric thematic installations on various themes are usually added, with a new theme every year.', 'https://www.facebook.com/spivochepole', '', 1, 'en_US'),
  ('Ticket to the SUN 2023', '2023-08-25 13:00:00', '3 days, 5 locations, a bunch of masterclasses, eco-activities, entertainment zones, lectures, relaxation zones, and much more. And all of this amidst sunny glades, a garden, near lakes and forests.', 'https://api.blink.so/events/share/3f0168da-05d0-40e9-8ef0-14cbf510848d?locale=en', '', 2, 'en_US');

INSERT INTO event_type_relationships (event_id, event_type_id) VALUES
(1, 1),
(2, 1),
(3, 7),
(4, 7);