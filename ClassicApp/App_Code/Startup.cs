using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ClassicApp.Startup))]
namespace ClassicApp
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
