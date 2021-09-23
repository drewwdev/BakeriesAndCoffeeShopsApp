TRUNCATE TABLE "BakeriesAndCoffeeShops" RESTART IDENTITY;

INSERT INTO "BakeriesAndCoffeeShops" ("id", "name", "city", "type", "dateadded", "mainimage") VALUES ('0', 'Mana', 'St. Petersburg', 'Bakery', '2021-09-22 11:18:00','0');
INSERT INTO "BakeriesAndCoffeeShops" ("id", "name", "city", "type", "dateadded", "mainimage") VALUES ('1', 'Petes Bagels', 'St. Petersburg', 'Bakery', '2021-09-22 11:18:00', '0');
INSERT INTO "BakeriesAndCoffeeShops" ("id", "name", "city", "type", "dateadded", "mainimage") VALUES ('2', 'Black Crow', 'St. Petersburg', 'Coffee Shop', '2021-09-22 11:18:00', '0');
INSERT INTO "BakeriesAndCoffeeShops" ("id", "name", "city", "type", "dateadded", "mainimage") VALUES ('3', 'Grove', 'St Pete Beach', 'Coffee Shop', '2021-09-22 11:18:00', '0');
INSERT INTO "BakeriesAndCoffeeShops" ("id", "name", "city", "type", "dateadded", "mainimage") VALUES ('4', 'Valhalla', 'St. Petersburg', 'Both', '2021-09-22 11:18:00', '0');
                                                           
SELECT * FROM "BakeriesAndCoffeeShops"

DROP TABLE "BakeriesAndCoffeeShops"

CREATE TABLE "BakeriesAndCoffeeShops" (Id int PRIMARY KEY NOT NULL,
                                       Name varchar,
                                       City varchar,
                                       Type varchar,
                                       DateAdded Date,
                                       MainImage bytea
                                      );

DROP DATABASE "BakeriesAndCoffeeShopsAppDatabase"
