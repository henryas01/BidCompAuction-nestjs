CREATE TABLE
  `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone_number` VARCHAR(20) NOT NULL,
    `isAdmin` BOOLEAN DEFAULT false,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME (6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME (6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_users_email` (`email`),
    UNIQUE KEY `uk_users_phone` (`phone_number`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci
ALTER TABLE users
ADD COLUMN address TEXT;

ALTER TABLE users
ADD COLUMN image TEXT;