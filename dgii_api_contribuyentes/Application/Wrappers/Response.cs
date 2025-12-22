namespace Application.Wrappers
{
    public class Response<T>
    {
        public Response()
        {
            Errors = new List<string>();
        }

        // ✅ Caso OK
        public Response(T data, string message = null)
        {
            Succeeded = true;
            Message = message;
            Data = data;
            Errors = new List<string>();
        }

        // ❌ Error lógico (ej: correo duplicado)
        public Response(string message)
        {
            Succeeded = false;
            Message = message;
            Errors = new List<string>();
        }

        // ❌ Error de validación (varios errores)
        public Response(List<string> errors)
        {
            Succeeded = false;
            Errors = errors;
        }

        public bool Succeeded { get; set; }
        public string? Message { get; set; }
        public List<string> Errors { get; set; }
        public T? Data { get; set; }
    }
}

