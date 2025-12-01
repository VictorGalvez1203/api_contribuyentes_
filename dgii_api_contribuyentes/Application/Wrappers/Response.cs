
namespace Application.Wrappers
{
    // Esta clase sirve como un contenedor genérico para unificar las respuestas 
    // de la aplicación. Permite retornar una estructura estándar que indica si la 
    // operación fue exitosa (Succeeded), un mensaje descriptivo (Message), una lista 
    // de errores (Error) y los datos resultantes (Data). 

    //Se implementa en las clases que estan en la carpeta Feautres para la carpeta Commands
    public class Response<T>
    {
        public Response() 
        {
             
        }

        public Response(T data, string message = null)
        {
            Succeeded = true;
            Message = message;
            Data = data;
        }

        public Response(string message)
        {
            Succeeded = false;
            Message = message;
        }

        public bool Succeeded { get; set; }
        public  string Message { get; set; }
        public List<string> Error { get; set; }
        public T Data { get; set; }
    }
}
