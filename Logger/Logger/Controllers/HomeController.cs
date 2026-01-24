using Logger.Filter;
using Logger.Logger;
using Logger.Models;
using Logger.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Logger.Controllers
{
    [EnableCors(PolicyName = "policy3")]
    [SbLogFilter]
    public class HomeController : Controller
    {
        private readonly IQueryServices _queryService;

        public HomeController(IQueryServices queryService)
        {
            _queryService = queryService;
        }

        [HttpPost]
        public IActionResult SubmitQuery(string query)
        {
            _queryService.SaveQuery(query); // DB
            return Ok("Query saved");
        }

        [HttpPost]
        public IActionResult SubmitFeedback(string message)
        {
            // USER FEEDBACK (business data)
            FeedBackLogger.Instance.LogBackLogger(message);

            return Ok("Feedback saved");
        }


    }
}
