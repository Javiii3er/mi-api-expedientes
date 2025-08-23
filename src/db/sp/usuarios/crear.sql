USE ExpedientesDB;
GO
IF OBJECT_ID('sp_Usuarios_Crear') IS NOT NULL 
  DROP PROCEDURE sp_Usuarios_Crear;
GO

CREATE PROCEDURE sp_Usuarios_Crear
  @nombre NVARCHAR(100),
  @username NVARCHAR(50),
  @password_hash NVARCHAR(200),
  @rol NVARCHAR(20)
AS
BEGIN
  SET NOCOUNT ON;

  INSERT INTO Usuarios (nombre, username, password_hash, rol)
  VALUES (@nombre, @username, @password_hash, @rol);

  SELECT id, nombre, username, rol, activo, creado_en
  FROM Usuarios
  WHERE id = SCOPE_IDENTITY();
END
GO

