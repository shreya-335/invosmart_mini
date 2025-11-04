-- Sample data for testing
-- Insert sample branches
INSERT INTO branches (id, name, address, gst_number) VALUES 
(uuid_generate_v4(), 'Main Branch', '123 Business Street, City, State 12345', '22AAAAA0000A1Z5'),
(uuid_generate_v4(), 'Branch 2', '456 Commerce Ave, City, State 67890', '22BBBBB0000B1Z5');

-- Insert sample admin user (password: admin123 - should be hashed in production)
INSERT INTO users (id, name, email, password, role, branch_id) VALUES 
(uuid_generate_v4(), 'Admin User', 'admin@business.com', '$2b$10$example_hashed_password', 'Admin', (SELECT id FROM branches LIMIT 1));

-- Insert sample customers
INSERT INTO customers (id, name, phone, email, address, gst_number) VALUES 
(uuid_generate_v4(), 'John Doe', '+91-9876543210', 'john@example.com', '789 Customer Lane, City', '22CCCCC0000C1Z5'),
(uuid_generate_v4(), 'Jane Smith', '+91-9876543211', 'jane@example.com', '321 Client Street, City', NULL);

-- Insert sample products
INSERT INTO products (id, name, hsn_sac_code, price, gst_rate, stock) VALUES 
(uuid_generate_v4(), 'Product A', '1234', 100.00, 18.00, 50),
(uuid_generate_v4(), 'Service B', '5678', 200.00, 18.00, 0),
(uuid_generate_v4(), 'Product C', '9012', 150.00, 12.00, 25);
