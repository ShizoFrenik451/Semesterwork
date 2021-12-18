using System;
using System.Threading.Tasks;
using System.Linq;
using System.Text.Json;
using SemesterWorkKino;
using SemesterWorkKino.Database;
using SemesterWorkKino.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SemesterWorkKino.Pages
{
    public class Registration : PageModel
    {
        private readonly IJWTAuthenticationManager jWTAuthenticationManager;

        public Registration(IJWTAuthenticationManager jWTAuthenticationManager)
        {
            this.jWTAuthenticationManager = jWTAuthenticationManager;
        }
        public IActionResult OnGet()
        {
            if (Request.Cookies["token"] != null)
            {
                return Redirect("/index");
            }
            else
            {
                return Page();
            }
        }

        public async Task<PageResult> OnPostAddUser(
            [FromForm]string email, 
            [FromForm]string username, 
            [FromForm]string password, 
            [FromForm]string confirmPassword
            )
        {
            if (ModelState.IsValid && password == confirmPassword)
            {
                if (ModelState.IsValid)
                {
                    var users = await MyDatabase.GetAllUsers();
                    var user = users.FirstOrDefault(u => u.Email == email || u.Username == username);
                    if (user == null)
                    {
                        var currentUser = new User
                        {
                            Id = Guid.NewGuid(),
                            Email = email,
                            Password = Encryption.EncryptString(password),
                            Username = username,
                        };
                        var profile = new Models.Profile()
                        {
                            Id = currentUser.Id,
                        };
                        currentUser.Profile = profile;
                        
                        await MyDatabase.Add(currentUser);
                        await MyDatabase.Add(profile);
                        
                        var token = jWTAuthenticationManager.Authenticate(currentUser);
                        Response.Cookies.Append("token", token);
                    }
                    else
                        ModelState.AddModelError("", $"Пользователь с такой почтой или именем пользователя  уже зарегистрирован.");
                }
            }
            return Page();
        }
    }
}