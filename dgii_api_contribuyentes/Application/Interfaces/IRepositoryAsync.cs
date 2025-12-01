
using Ardalis.Specification;

namespace Application.Interfaces
{
    public interface IRepositoryAsync<T> : IRepositoryBase<T> where T : class 
    {

    }

    public interface IReadRepositoryAsync<T> : IRepositoryBase<T> where T : class
    {

    }
}
