using System.Text.Json.Serialization;

namespace WebAPI
{
    public class Data
    {
        [JsonPropertyName("driver_uuid")]
        public string DriverId {  get; set; }

        [JsonPropertyName("first_name")]
        public string FirstName { get; set; }
        
        [JsonPropertyName("last_name")]
        public string LastName { get; set; }

        [JsonPropertyName("driver_country_code")]
        public string DriverCountryCode { get; set; }

        [JsonPropertyName("season_team_name")]
        public string SeasonTeamName { get; set; }

        [JsonPropertyName("season_points")]
        public int SeasonPoints { get; set; }
    }
}
