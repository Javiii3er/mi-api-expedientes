USE ExpedientesDB;
GO

-- Usuarios semilla (CON HASHES REALES)
IF NOT EXISTS (SELECT 1 FROM Usuarios WHERE username = 'tecnico1')
  INSERT INTO Usuarios (nombre, username, password_hash, rol)
  VALUES ('Técnico Uno', 'tecnico1', '$2a$10$FV5wz/VcAm3TkDItdUKtq..b/.iY3LgbvE8k5ZI1D2.G3xaZH1TWi', 'tecnico');

IF NOT EXISTS (SELECT 1 FROM Usuarios WHERE username = 'coord1')
  INSERT INTO Usuarios (nombre, username, password_hash, rol)
  VALUES ('Coordinador Uno', 'coord1', '$2a$10$FV5wz/VcAm3TkDItdUKtq..b/.iY3LgbvE8k5ZI1D2.G3xaZH1TWi', 'coordinador');

