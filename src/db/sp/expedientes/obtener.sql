USE ExpedientesDB;
GO
IF OBJECT_ID('sp_Expedientes_Obtener') IS NOT NULL DROP PROCEDURE sp_Expedientes_Obtener;
GO
CREATE PROCEDURE sp_Expedientes_Obtener
  @id INT
AS
BEGIN
  SET NOCOUNT ON;
  SELECT * FROM Expedientes WHERE id = @id AND activo = 1;
END
GO
 