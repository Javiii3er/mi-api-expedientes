USE ExpedientesDB;
GO
IF OBJECT_ID('sp_Indicios_Crear') IS NOT NULL DROP PROCEDURE sp_Indicios_Crear;
GO
CREATE PROCEDURE sp_Indicios_Crear
  @expediente_id INT,
  @codigo NVARCHAR(50),
  @descripcion NVARCHAR(500),
  @peso DECIMAL(10,2),
  @color NVARCHAR(50) = NULL,
  @tamano NVARCHAR(50) = NULL,
  @tecnico_id INT
AS
BEGIN
  SET NOCOUNT ON;
  -- Garantizar que el técnico dueño del expediente es quien crea
  IF NOT EXISTS (SELECT 1 FROM Expedientes WHERE id = @expediente_id AND tecnico_id = @tecnico_id AND activo = 1)
  BEGIN
    RAISERROR('Sin permiso para crear indicios en este expediente', 16, 1);
    RETURN;
  END

  INSERT INTO Indicios (expediente_id, codigo, descripcion, peso, color, tamano)
  VALUES (@expediente_id, @codigo, @descripcion, @peso, @color, @tamano);

  SELECT * FROM Indicios WHERE id = SCOPE_IDENTITY();
END
GO
