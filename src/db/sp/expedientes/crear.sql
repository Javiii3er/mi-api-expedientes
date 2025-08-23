USE ExpedientesDB;
GO
IF OBJECT_ID('sp_Expedientes_Crear') IS NOT NULL DROP PROCEDURE sp_Expedientes_Crear;
GO
CREATE PROCEDURE sp_Expedientes_Crear
  @codigo NVARCHAR(50),
  @descripcion NVARCHAR(500),
  @tecnico_id INT
AS
BEGIN
  SET NOCOUNT ON;
  -- Un técnico solo crea sus propios expedientes: @tecnico_id viene del token
  INSERT INTO Expedientes (codigo, descripcion, tecnico_id)
  VALUES (@codigo, @descripcion, @tecnico_id);
  SELECT * FROM Expedientes WHERE id = SCOPE_IDENTITY();
END
GO
