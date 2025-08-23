USE ExpedientesDB;
GO
IF OBJECT_ID('sp_Indicios_ListarPorExpediente') IS NOT NULL DROP PROCEDURE sp_Indicios_ListarPorExpediente;
GO
CREATE PROCEDURE sp_Indicios_ListarPorExpediente
  @expediente_id INT
AS
BEGIN
  SET NOCOUNT ON;
  SELECT * FROM Indicios WHERE expediente_id = @expediente_id AND activo = 1 ORDER BY id DESC;
END
GO
