IF DB_ID('ExpedientesDB') IS NULL
  CREATE DATABASE ExpedientesDB;
GO
USE ExpedientesDB;
GO

-- Tablas
IF OBJECT_ID('Usuarios') IS NOT NULL DROP TABLE Usuarios;
IF OBJECT_ID('Expedientes') IS NOT NULL DROP TABLE Expedientes;
IF OBJECT_ID('Indicios') IS NOT NULL DROP TABLE Indicios;
GO

CREATE TABLE Usuarios (
  id INT IDENTITY(1,1) PRIMARY KEY,
  nombre NVARCHAR(100) NOT NULL,
  username NVARCHAR(50) NOT NULL UNIQUE,
  password_hash NVARCHAR(200) NOT NULL,
  rol NVARCHAR(20) NOT NULL CHECK (rol IN ('tecnico','coordinador')),
  activo BIT NOT NULL DEFAULT 1,
  creado_en DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE Expedientes (
  id INT IDENTITY(1,1) PRIMARY KEY,
  codigo NVARCHAR(50) NOT NULL UNIQUE,
  descripcion NVARCHAR(500) NOT NULL,
  estado NVARCHAR(20) NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente','aprobado','rechazado')),
  tecnico_id INT NOT NULL,
  aprobador_id INT NULL,
  justificacion NVARCHAR(500) NULL,
  fecha_estado DATETIME2 NULL,
  activo BIT NOT NULL DEFAULT 1,
  creado_en DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
  FOREIGN KEY (tecnico_id) REFERENCES Usuarios(id),
  FOREIGN KEY (aprobador_id) REFERENCES Usuarios(id)
);

CREATE TABLE Indicios (
  id INT IDENTITY(1,1) PRIMARY KEY,
  expediente_id INT NOT NULL,
  codigo NVARCHAR(50) NOT NULL UNIQUE,
  descripcion NVARCHAR(500) NOT NULL,
  peso DECIMAL(10,2) NOT NULL CHECK (peso >= 0),
  color NVARCHAR(50) NULL,
  tamano NVARCHAR(50) NULL,
  activo BIT NOT NULL DEFAULT 1,
  creado_en DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
  FOREIGN KEY (expediente_id) REFERENCES Expedientes(id)
);
