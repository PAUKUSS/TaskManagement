using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TaskManagerUI.Pages;

public class IndexModel : PageModel
{
    private readonly IConfiguration _configuration;

    public string GatewayBaseUrl { get; private set; } = "http://localhost:5207/";

    public IndexModel(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void OnGet()
    {
        GatewayBaseUrl = _configuration["ApiGateway:BaseUrl"] ?? "http://localhost:5207/";
    }
}
