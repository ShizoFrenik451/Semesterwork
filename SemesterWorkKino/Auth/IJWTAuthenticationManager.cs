using SemesterWorkKino.Models;

namespace SemesterWorkKino
{
    public interface IJWTAuthenticationManager
    {
        public string Authenticate(User model);
    }
}