using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SimpleCotizador.Models;
using SimpleCotizador.Persistency;

namespace SimpleCotizador
{
    public class Startup
    {
        private static readonly string DEFAULT_CONNECTION_KEY = "DefaultConnection";

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddDbContext<SimpleCotizadorDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString(DEFAULT_CONNECTION_KEY)));

            services.AddIdentity<SimpleCotizadorUser, IdentityRole>()
                    .AddEntityFrameworkStores<SimpleCotizadorDbContext>()
                    .AddDefaultTokenProviders();
            
            services.ConfigureApplicationCookie(options => options.LoginPath = "/Account/Login");
        }
        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseAuthentication();

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
