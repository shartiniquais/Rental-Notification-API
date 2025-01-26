INSERT INTO customer (store_id, first_name, last_name, email, address_id, timezone)
VALUES
(1, 'John', 'Doe', 'john.doe@example.com', 1, 'UTC'),
(1, 'Marie', 'Curie', 'marie.curie@example.com', 2, 'Europe/Paris');

INSERT INTO rental (rental_date, inventory_id, customer_id, return_date, staff_id, start_date, due_date)
VALUES
('2025-01-20 12:00:00', 1, 1, '2025-01-27 12:00:00', 1, '2025-01-20 12:00:00', '2025-01-27 12:00:00'),
('2025-01-22 12:00:00', 2, 2, '2025-01-29 12:00:00', 1, '2025-01-22 12:00:00', '2025-01-29 12:00:00');
