CREATE OR ALTER TABLE customer (
  customer_id SERIAL PRIMARY KEY,
  store_id INT NOT NULL,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  email VARCHAR(50),
  address_id INT NOT NULL,
  activebool BOOLEAN DEFAULT TRUE,
  create_date DATE DEFAULT CURRENT_DATE,
  last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  active INT,
  timezone VARCHAR(50) DEFAULT 'UTC'
);

CREATE OR ALTER TABLE rental (
  rental_id SERIAL PRIMARY KEY,
  rental_date TIMESTAMP NOT NULL,
  inventory_id INT NOT NULL,
  customer_id INT REFERENCES customer(customer_id),
  return_date TIMESTAMP,
  staff_id INT NOT NULL,
  is_notified_j5 BOOLEAN DEFAULT FALSE,
  is_notified_j3 BOOLEAN DEFAULT FALSE,
  start_date TIMESTAMPTZ,
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
