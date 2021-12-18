using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using SemesterWorkKino.Database;
using SemesterWorkKino.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace SemesterWorkKino.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        
        public User CurrentUser;

        public List<Item> Catalog;
        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public PageResult OnGet()
        {
            InitCurrentUser();
            Catalog = MyDatabase.GetAllItems().Result;
            return Page();
        }

        public JsonResult OnGetUsers()
        {
            var dbUsers = MyDatabase.GetAllUsers().Result;
            var users = new Dictionary<string, List<User>>();
            users.Add("users", dbUsers);
            var result = JsonSerializer.Serialize<Dictionary<string, List<User>>>(users);
            return new JsonResult(result);
        }

        public RedirectResult OnPost() // Logout
        {
            var token = Request.Cookies["token"];
            if (token == null)
                return Redirect("/index");
            Response.Cookies.Delete("token");
            return Redirect("/index");
        }

        private User FindUserByToken()
        {
            var stream = Request.Cookies["token"];
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(stream);
            var tokenS = jsonToken as JwtSecurityToken;
            var id = tokenS.Claims.First(claim => claim.Type == "nameid").Value;
            var users = MyDatabase.GetAllUsers().Result;
            var user = users.FirstOrDefault(u => u.Id.ToString() == id);
            return user;
        }
        
        public JsonResult OnGetAnimeItems()
        {
            var items = MyDatabase.GetAllItems().Result;
            var animteItems = new Dictionary<string, List<Item>>();
            animteItems.Add("items", items);
            
            var result = JsonSerializer.Serialize<Dictionary<string, List<Item>>>(animteItems);

            return new JsonResult(result);
        }

        public JsonResult OnGetDeleteItem(string itemId)
        {
            MyDatabase.RemoveFromAnimeItems(itemId);
            return new JsonResult("ok");
        }
        
        public JsonResult OnGetItemPicked(string itemId)
        {
            if (Request.Cookies["itemId"] == null)
            {
                Response.Cookies.Append("itemId", itemId);
            }
            else
            {
                Response.Cookies.Delete("itemId");
                Response.Cookies.Append("itemId", itemId);
            }

            return new JsonResult("append");
        }

        public void InitCurrentUser()
        {
            if (Request.Cookies["token"] == null || Request.Cookies["token"] == "")
            {
                CurrentUser = null;
            }
            else
            {
                CurrentUser = FindUserByToken();
            }
        }
    }
}