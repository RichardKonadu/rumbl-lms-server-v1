USE rumbl;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
    `id` SERIAL,
    `name` varchar(255) NOT NULL, 
    `email` varchar(255) NOT NULL, 
    `password` varchar(255) NOT NULL,
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP, 
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
    UNIQUE (email) 
)

CREATE TABLE `predictions` (
    `id` SERIAL,
    `match_id`int unsigned DEFAULT NULL,
    `did_win` BOOLEAN 
)