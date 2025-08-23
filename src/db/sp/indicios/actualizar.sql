USE ExpedientesDB;
GO
IF OBJECT_ID('sp_Indicios_Actualizar') IS NOT NULL DROP PROCEDURE sp_Indicios_Actualizar;
GO
CREATE PROCEDURE sp_Indicios_Actualizar
  @id INT,
  @codigo NVARCHAR(50),
  @descripcion NVARCHAR(500),
  @peso DECIMAL(10,2),
  @color NVARCHAR(50) = NULL,
  @tamano NVARCHAR(50) = NULL,
  @tecnico_id INT
AS
BEGIN
  SET NOCOUNT ON;
  -- Solo el técnico dueño del expediente
  IF NOT EXISTS (
    SELECT 1 FROM Indicios I JOIN Expedientes E ON E.id = I.expediente_id
    WHERE I.id = @id AND E.tecnico_id = @tecnico_id AND I.activo = 1 AND E.activo = 1)
  BEGIN
    RAISERROR('Sin permiso para editar este indicio', 16, 1);
    RETURN;
  END

  UPDATE Indicios
    SET codigo = @codigo,
        descripcion = @descripcion,
        peso = @peso,
        color = @color,
        tamano = @tamano
  WHERE id = @id;

  SELECT * FROM Indicios WHERE id = @id;
END
GO
