USE ExpedientesDB;
GO
IF OBJECT_ID('sp_Expedientes_Actualizar') IS NOT NULL DROP PROCEDURE sp_Expedientes_Actualizar;
GO
CREATE PROCEDURE sp_Expedientes_Actualizar
  @id INT,
  @codigo NVARCHAR(50),
  @descripcion NVARCHAR(500),
  @tecnico_id INT
AS
BEGIN
  SET NOCOUNT ON;
  -- Regla: un técnico solo edita sus propios expedientes
  UPDATE E
    SET codigo = @codigo,
        descripcion = @descripcion
  FROM Expedientes E
  WHERE E.id = @id AND E.tecnico_id = @tecnico_id AND E.activo = 1;

  SELECT * FROM Expedientes WHERE id = @id;
END
GO
