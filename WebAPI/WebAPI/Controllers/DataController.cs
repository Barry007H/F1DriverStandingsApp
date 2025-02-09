using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DataController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public DataController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{year}", Name = "GetDriverStandings")]
        public async Task<List<Data>> Get(string year)
        {
            if (string.IsNullOrWhiteSpace(year) || !int.TryParse(year, out _))
            {
                throw new HttpRequestException("Invalid year format. Please provide a valid year");
            }

            string urlBase = _configuration["DriverStandingsAPI:Url"] ?? throw new Exception("Api Url not set");
            string apiKey = _configuration["DriverStandingsAPI:ApiKey"] ?? throw new Exception("Api Key not set");

            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("x-api-key", apiKey);

                string url = $"{urlBase}{year}";

                try
                {
                    HttpResponseMessage response = await client.GetAsync(url);

                    if (!response.IsSuccessStatusCode)
                    {
                        throw new HttpRequestException($"Error: {response.StatusCode}");
                    }

                    string responseBody = await response.Content.ReadAsStringAsync();

                    List<Data> result = JsonSerializer.Deserialize<List<Data>>(responseBody);
                    return result;
                }
                catch (Exception ex)
                {
                    throw new HttpRequestException($"Error: {ex.Message}");
                }
            }
        }
    }
}
