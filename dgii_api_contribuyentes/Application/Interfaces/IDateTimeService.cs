
namespace Application.Interfaces
{
    //Permite agregar cuando fue creado o cuando fue modificado alguna dato de una entidad.
    public interface IDateTimeService
    {
        DateTime NowUtc { get; } 
    }
}
