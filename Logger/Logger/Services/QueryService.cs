using Logger.Data;
using Logger.Models;

namespace Logger.Services
{

    public interface IQueryServices
    {
        void SaveQuery(string query);
    }
    public class QueryService : IQueryServices
    {
        private readonly AppDbContext _context;

        public QueryService(AppDbContext context)
        {
            _context = context;
        }

        public void SaveQuery(string query)
        {
            _context.UserQueries.Add(new UserQuery
            {
                QueryText = query,
                CreatedAt = DateTime.Now
            });

            _context.SaveChanges();
        }
    }
}
