USE ExpedientesDB;
GO
IF OBJECT_ID('sp_Expedientes_ActivarDesactivar') IS NOT NULL DROP PROCEDURE sp_Expedientes_ActivarDesactivar;
GO
CREATE PROCEDURE sp_Expedientes_ActivarDesactivar
  @id INT,
  @activo BIT
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE Expedientes SET activo = @activo WHERE id = @id;
  SELECT id, activo FROM Expedientes WHERE id = @id;
END
GO
