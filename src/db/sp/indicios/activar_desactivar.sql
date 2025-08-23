USE ExpedientesDB;
GO
IF OBJECT_ID('sp_Indicios_ActivarDesactivar') IS NOT NULL DROP PROCEDURE sp_Indicios_ActivarDesactivar;
GO
CREATE PROCEDURE sp_Indicios_ActivarDesactivar
  @id INT,
  @activo BIT
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE Indicios SET activo = @activo WHERE id = @id;
  SELECT id, activo FROM Indicios WHERE id = @id;
END
GO
