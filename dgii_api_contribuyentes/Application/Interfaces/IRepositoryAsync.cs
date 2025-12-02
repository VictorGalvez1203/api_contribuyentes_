
using Ardalis.Specification;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Application.Interfaces
{
    // Estas interfaces definen contratos genéricos de acceso a datos siguiendo el patrón Repository junto
    // con Ardalis.Specification. Su propósito principal es abstraer completamente la capa de persistencia:
    // - IRepositoryAsync<T>: Define operaciones de lectura y escritura (CRUD) sobre cualquier entidad.
    public interface IRepositoryAsync<T> : IRepositoryBase<T> where T : class 
    {

    }

    // - IReadRepositoryAsync<T>: Define solo operaciones de lectura, evitando exponer métodos de modificación.
    public interface IReadRepositoryAsync<T> : IRepositoryBase<T> where T : class
    {

    }
}
