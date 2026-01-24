
using Logger.Data;
using Logger.Services;
using Microsoft.EntityFrameworkCore;
namespace Logger
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            builder.Services.AddCors((corsoptions =>
            {

                corsoptions.AddPolicy("policy3", (policyBuilder) =>
                {
                    policyBuilder.AllowAnyOrigin()
                                  .AllowAnyMethod()
                                  .AllowAnyHeader();
                });
            }));

            
            builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        "Data Source=(LocalDB)\\MSSQLLocalDB;Initial Catalog=logger;Integrated Security=True;"
    ));

            builder.Services.AddScoped<IQueryServices, QueryService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();


            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }
}
