using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DataController : ControllerBase
    {
        
        [HttpGet("{year}", Name = "GetDriverStandings")]
        public async Task<List<Data>> Get(string year)
        {
            if (string.IsNullOrWhiteSpace(year) || !int.TryParse(year, out _))
            {
                throw new HttpRequestException("Invalid year format. Please provide a valid year");
            }


            // In reality these would be set in environment variable
            string url = $"https://pitwall.redbullracing.com/api/standings/drivers/{year}";
            string apiKey = "7303c8ef-d91a-4964-a7e7-78c26ee17ec4";

            using (HttpClient client = new HttpClient())
            {
                // Add x-api-key header
                client.DefaultRequestHeaders.Add("x-api-key", apiKey);

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
