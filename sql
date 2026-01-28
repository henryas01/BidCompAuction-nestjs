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

INSERT INTO
  flash_sales (
    name,
    price,
    stock,
    description,
    images,
    startAt,
    endAt,
    isActive,
    isExpired,
    createdAt,
    updatedAt
  )
VALUES
  (
    'Flash Sale RAM DDR5',
    800000,
    10,
    'Diskon besar terbatas waktu',
    '/uploads/products/1769094430053-589818029.webp',
    '2026-01-22 10:00:00',
    '2026-01-23 01:01:00',
    0,
    1,
    '2026-01-22 22:07:10.283252',
    '2026-01-26 16:34:56'
  ),
  (
    'Monitor Gaming 2 keren',
    3500000,
    5,
    'Monitor Gaming 1 Ayo Diskon besar terbatas waktu Sampai besok',
    '/uploads/products/1769420037569-229501826.webp',
    '2026-01-26 10:59:36',
    '2026-01-26 10:59:36',
    0,
    1,
    '2026-01-26 16:33:57.688878',
    '2026-01-26 17:59:44'
  ),
  (
    'Monitor Gaming 1',
    3500000,
    5,
    'Monitor Gaming 1 Ayo Diskon besar terbatas waktu',
    '/uploads/products/1769421051447-95710815.webp',
    '2026-01-26 10:00:00',
    '2026-01-27 10:00:00',
    0,
    1,
    '2026-01-26 16:50:51.513605',
    '2026-01-27 18:19:47'
  ),
  (
    'Ram Gaming 10GB DDR5',
    2500000,
    2,
    'Monitor Gaming 1 Ayo Diskon besar terbatas waktu',
    '/uploads/products/1769421204718-129041948.webp',
    '2026-01-26 10:00:00',
    '2026-01-27 10:00:00',
    0,
    1,
    '2026-01-26 16:53:24.804850',
    '2026-01-27 18:19:47'
  ),
  (
    'Ram 5GB DDR5',
    2500000,
    2,
    'Ram 5GB DDR5 Ayo Diskon besar terbatas waktu',
    '/uploads/products/1769421263092-773867674.webp',
    '2026-01-26 10:00:00',
    '2026-01-27 10:00:00',
    0,
    1,
    '2026-01-26 16:54:23.206530',
    '2026-01-27 18:19:47'
  ),
  (
    'hp Samsung',
    50000,
    1,
    'ayo hp murah',
    '/uploads/products/1769423423140-307541688.webp',
    '2026-01-26 03:30:22',
    '2026-01-31 04:20:57',
    1,
    0,
    '2026-01-26 17:30:23.251842',
    '2026-01-26 18:02:58'
  ),
  (
    'laptop gaming',
    150000,
    2,
    'ayo ayo',
    '/uploads/products/1769424943502-134904583.webp',
    '2026-01-26 03:54:22',
    '2026-01-28 04:54:34',
    1,
    0,
    '2026-01-26 17:55:43.624187',
    '2026-01-26 18:02:35'
  ),
  (
    'monitor gaming',
    50000,
    25,
    '',
    '/uploads/products/1769521271464-823466056.webp',
    '2026-01-27 13:40:54',
    '2026-01-28 16:59:09',
    1,
    0,
    '2026-01-27 20:41:11.554814',
    '2026-01-27 20:41:11.554814'
  );

INSERT INTO
  `flash_sales` (
    `name`,
    `price`,
    `stock`,
    `desc`,
    `images`,
    `startAt`,
    `endAt`,
    `isActive`,
    `isExpired`,
    `createdAt`,
    `updatedAt`
  )
VALUES
  (
    'Flash Sale RAM DDR5',
    800000,
    10,
    'Diskon besar terbatas waktu',
    '/uploads/products/1769094430053-589818029.webp',
    '2026-01-22 10:00:00',
    '2026-01-23 01:01:00',
    0,
    1,
    '2026-01-22 22:07:10.283252',
    '2026-01-26 16:34:56'
  ),
  (
    'Monitor Gaming 2 keren',
    3500000,
    5,
    'Monitor Gaming 1 Ayo Diskon besar terbatas waktu Sampai besok',
    '/uploads/products/1769420037569-229501826.webp',
    '2026-01-26 10:59:36',
    '2026-01-26 10:59:36',
    0,
    1,
    '2026-01-26 16:33:57.688878',
    '2026-01-26 17:59:44'
  ),
  (
    'Monitor Gaming 1',
    3500000,
    5,
    'Monitor Gaming 1 Ayo Diskon besar terbatas waktu',
    '/uploads/products/1769421051447-95710815.webp',
    '2026-01-26 10:00:00',
    '2026-01-27 10:00:00',
    0,
    1,
    '2026-01-26 16:50:51.513605',
    '2026-01-27 18:19:47'
  ),
  (
    'Ram Gaming 10GB DDR5',
    2500000,
    2,
    'Monitor Gaming 1 Ayo Diskon besar terbatas waktu',
    '/uploads/products/1769421204718-129041948.webp',
    '2026-01-26 10:00:00',
    '2026-01-27 10:00:00',
    0,
    1,
    '2026-01-26 16:53:24.804850',
    '2026-01-27 18:19:47'
  ),
  (
    'Ram 5GB DDR5',
    2500000,
    2,
    'Ram 5GB DDR5 Ayo Diskon besar terbatas waktu',
    '/uploads/products/1769421263092-773867674.webp',
    '2026-01-26 10:00:00',
    '2026-01-27 10:00:00',
    0,
    1,
    '2026-01-26 16:54:23.206530',
    '2026-01-27 18:19:47'
  ),
  (
    'hp Samsung',
    50000,
    1,
    'ayo hp murah',
    '/uploads/products/1769423423140-307541688.webp',
    '2026-01-26 03:30:22',
    '2026-01-31 04:20:57',
    1,
    0,
    '2026-01-26 17:30:23.251842',
    '2026-01-26 18:02:58'
  ),
  (
    'laptop gaming',
    150000,
    2,
    'ayo ayo',
    '/uploads/products/1769424943502-134904583.webp',
    '2026-01-26 03:54:22',
    '2026-01-28 04:54:34',
    1,
    0,
    '2026-01-26 17:55:43.624187',
    '2026-01-26 18:02:35'
  ),
  (
    'monitor gaming',
    50000,
    25,
    '',
    '/uploads/products/1769521271464-823466056.webp',
    '2026-01-27 13:40:54',
    '2026-01-28 16:59:09',
    1,
    0,
    '2026-01-27 20:41:11.554814',
    '2026-01-27 20:41:11.554814'
  );