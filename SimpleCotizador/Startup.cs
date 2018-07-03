using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SimpleCotizador.Models;
using SimpleCotizador.Persistency;
using System.Net;
using System.Threading.Tasks;

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

            services.ConfigureApplicationCookie(options =>
            {
                options.Events.OnRedirectToLogin = context =>
                {
                    if (context.Request.Path.StartsWithSegments("/SimpleCotizadorApi") && context.Response.StatusCode == (int)HttpStatusCode.OK)
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    }
                    else
                    {
                        context.Response.Redirect(context.RedirectUri);
                    }
                    return Task.FromResult(0);
                };
            });
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
