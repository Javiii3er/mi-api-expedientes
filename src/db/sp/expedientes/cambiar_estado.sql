USE ExpedientesDB;
GO
IF OBJECT_ID('sp_Expedientes_CambiarEstado') IS NOT NULL DROP PROCEDURE sp_Expedientes_CambiarEstado;
GO
CREATE PROCEDURE sp_Expedientes_CambiarEstado
  @id INT,
  @estado NVARCHAR(20), -- 'aprobado' | 'rechazado'
  @justificacion NVARCHAR(500) = NULL,
  @aprobador_id INT
AS
BEGIN
  SET NOCOUNT ON;
  UPDATE Expedientes
    SET estado = @estado,
        justificacion = @justificacion,
        aprobador_id = @aprobador_id,
        fecha_estado = SYSUTCDATETIME()
  WHERE id = @id AND activo = 1;
  SELECT * FROM Expedientes WHERE id = @id;
END
GO
