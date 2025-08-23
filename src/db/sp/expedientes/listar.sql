USE ExpedientesDB;
GO
IF OBJECT_ID('sp_Expedientes_Listar') IS NOT NULL DROP PROCEDURE sp_Expedientes_Listar;
GO
CREATE PROCEDURE sp_Expedientes_Listar
  @page INT = 1,
  @pageSize INT = 10,
  @estado NVARCHAR(20) = NULL,
  @codigo NVARCHAR(50) = NULL
AS
BEGIN
  SET NOCOUNT ON;
  DECLARE @offset INT = (@page - 1) * @pageSize;

  ;WITH F AS (
    SELECT E.*,
           U.nombre AS tecnico_nombre,
           COUNT(1) OVER() AS total
    FROM Expedientes E
    JOIN Usuarios U ON U.id = E.tecnico_id
    WHERE E.activo = 1
      AND (@estado IS NULL OR E.estado = @estado)
      AND (@codigo IS NULL OR E.codigo LIKE '%' + @codigo + '%')
  )
  SELECT * FROM F
  ORDER BY id DESC
  OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY;
END
GO
