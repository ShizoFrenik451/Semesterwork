using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SemesterWorkKino.Pages
{
    public class Handler : PageModel
    {

        public IActionResult OnGet()
        {
            return Page();
        }

        public IActionResult OnPostAdd(string login, string password)
        {
            return Redirect("/index");
        }
    }
}