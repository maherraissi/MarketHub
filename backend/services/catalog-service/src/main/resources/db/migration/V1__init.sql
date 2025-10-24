CREATE TABLE IF NOT EXISTS product (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(12,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO product (id, name, description, price) VALUES
('SKU-1','Perceuse X100','Perceuse sans fil 18V',129.90)
ON CONFLICT (id) DO NOTHING;

INSERT INTO product (id, name, description, price) VALUES
('SKU-2','Vis inox M4','Vis inoxydables M4 x 20',5.50)
ON CONFLICT (id) DO NOTHING;

INSERT INTO product (id, name, description, price) VALUES
('SKU-3','Chevilles 8mm','Chevilles nylon 8mm',3.20)
ON CONFLICT (id) DO NOTHING;
