using Logger.Logger;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Logger.Filter
{
    public class SbLogFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            FileLogger.CurrentLogger.Log(" Calling " + context.HttpContext.Request.Path.Value);
        }
        public override void OnActionExecuted(ActionExecutedContext context)
        {
            FileLogger.CurrentLogger.Log(" Called " + context.HttpContext.Request.Path.Value);
        }

        public override void OnResultExecuting(ResultExecutingContext context)
        {

            FileLogger.CurrentLogger.Log(" OnResultExecuting is getting called.");
        }

        public override void OnResultExecuted(ResultExecutedContext context)
        {
            FileLogger.CurrentLogger.Log(" OnResultExecuted is getting called.");
        }
    }
}
