USE ExpedientesDB;
GO

IF OBJECT_ID('sp_Usuarios_Login', 'P') IS NOT NULL
    DROP PROCEDURE sp_Usuarios_Login;
GO

CREATE PROCEDURE sp_Usuarios_Login
    @username NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT id, nombre, username, password_hash, rol, activo
    FROM Usuarios
    WHERE username = @username;
END
GO

