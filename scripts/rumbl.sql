USE `rumbl`;

DROP TABLE IF EXISTS `league_user`;
DROP TABLE IF EXISTS `predictions`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `leagues`;


CREATE TABLE `users` (
    `id` BIGINT unsigned AUTO_INCREMENT,
    `name` varchar(255) NOT NULL, 
    `email` varchar(255) NOT NULL UNIQUE,
    `password` varchar(255) NOT NULL,
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP, 
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `leagues` (
    `id` BIGINT unsigned AUTO_INCREMENT,
    `name` varchar(255) NOT NULL, 
    `sport` varchar(50) NOT NULL,
    `in_progress` BOOLEAN,
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP, 
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `predictions` (
    `id` BIGINT unsigned AUTO_INCREMENT,
    `game_week`bigint unsigned DEFAULT NULL,
    `did_win` BOOLEAN,
    `eliminated` BOOLEAN DEFAULT 0,
    `team_id` bigint unsigned DEFAULT NULL,
    `user_id` bigint unsigned DEFAULT NULL,
    `league_id` bigint unsigned DEFAULT NULL,
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (`league_id`) REFERENCES `leagues` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

 create TABLE `league_user` (
    `league_id` BIGINT unsigned DEFAULT NULL,
    `user_id` BIGINT unsigned  DEFAULT NULL,
    `joined_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`league_id`)  REFERENCES `leagues` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
        ON UPDATE CASCADE
        ON DELETE CASCADE
 );

INSERT INTO
	`users` (`name`, `email`, `password`)
VALUES
	('John Doe', 'johndoe1@example.com', '$2b$08$V38UShGPRc0Yr90nT3vEjOgIpaI2D5L42FGC1bZ54SS4z.xZee0Wy'),
	('Jane Smith', 'janesmith2@example.com', '$2b$08$V38UShGPRc0Yr90nT3vEjOgIpaI2D5L42FGC1bZ54SS4z.xZee0Wy'),
	('Alex Johnson', 'alexjohnson3@example.com', '$2b$08$V38UShGPRc0Yr90nT3vEjOgIpaI2D5L42FGC1bZ54SS4z.xZee0Wy'),
	('Emily Davis', 'emilydavis4@example.com', '$2b$08$V38UShGPRc0Yr90nT3vEjOgIpaI2D5L42FGC1bZ54SS4z.xZee0Wy'),
	('Chris Brown', 'chrisbrown5@example.com', '$2b$08$V38UShGPRc0Yr90nT3vEjOgIpaI2D5L42FGC1bZ54SS4z.xZee0Wy'),
	('Taylor Williams', 'taylorwilliams6@example.com', '$2b$08$V38UShGPRc0Yr90nT3vEjOgIpaI2D5L42FGC1bZ54SS4z.xZee0Wy'),
	('Morgan Lee', 'morganlee7@example.com', '$2b$08$V38UShGPRc0Yr90nT3vEjOgIpaI2D5L42FGC1bZ54SS4z.xZee0Wy'),
	('Avery Wilson', 'averywilson8@example.com', '$2b$08$V38UShGPRc0Yr90nT3vEjOgIpaI2D5L42FGC1bZ54SS4z.xZee0Wy'),
	('Jordan Martinez', 'jordanmartinez9@example.com', '$2b$08$V38UShGPRc0Yr90nT3vEjOgIpaI2D5L42FGC1bZ54SS4z.xZee0Wy'),
	('Riley Clark', 'rileyclark10@example.com', '$2b$08$V38UShGPRc0Yr90nT3vEjOgIpaI2D5L42FGC1bZ54SS4z.xZee0Wy');

INSERT INTO 
    `leagues` (`name`, `sport`, `in_progress`) 
VALUES
    ('Demo league', 'Football', 1),
    ('League Two', 'Football', 0),
    ('League Three', 'NBA', 0);

INSERT INTO 
    `predictions` (`game_week`, `did_win`,  `team_id`, `user_id`, `league_id`) 
VALUES
    ( 26, 1, 26, 1, 1),
    ( 26, 1, 26, 2, 1),
    ( 26, 0, 1, 3, 1),
    ( 26, 1, 45, 4, 1),
    ( 27, 1, 29, 1, 1),
    ( 27, 1, 29, 2, 1),
    ( 27, 1, 29, 4, 1),
    ( 28, 1, 17, 1, 1),
    ( 28, 1, 17, 2, 1),
    ( 28, 0, 10, 4, 1),
    ( 29, 1, 1, 1, 1),
    ( 29, 0, 28, 2, 1);

INSERT INTO
	`league_user` (`league_id`, `user_id`)
VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(1, 4);


