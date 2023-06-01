import React from "react";
import { useQuery } from "react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

type WorldwideData = {
  updated: number;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
  affectedCountries: number;
};

type CountryData = {
  updated: number;
  country: string;
  countryInfo: {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
  };
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
}[];

type GraphData = {
  cases: {
    [date: string]: number;
  };
  deaths: {
    [date: string]: number;
  };
  recovered: {
    [date: string]: number;
  };
};

const fetchWorldwideData = async (): Promise<WorldwideData> => {
  const response = await fetch("https://disease.sh/v3/covid-19/all");
  const data = await response.json();
  return data;
};

const fetchCountryData = async (): Promise<CountryData> => {
  const response = await fetch("https://disease.sh/v3/covid-19/countries");
  const data = await response.json();
  return data;
};

const fetchGraphData = async (): Promise<GraphData> => {
  const response = await fetch(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  const data = await response.json();
  return data;
};

const Charts: React.FC = () => {
  const { data: worldwideData } = useQuery<WorldwideData>(
    "worldwideData",
    fetchWorldwideData
  );
  const { data: countryData } = useQuery<CountryData>(
    "countryData",
    fetchCountryData
  );
  const { data: graphData } = useQuery<GraphData>("graphData", fetchGraphData);

  if (!worldwideData || !countryData || !graphData) {
    return <div>Loading...</div>;
  }

  // Prepare data for the LineChart component
  const chartData = Object.entries(graphData.cases).map(([date, value]) => ({
    date,
    cases: value,
  }));

  // Determine the number of ticks on the x-axis
  const numTicks = 5;

  return (
    <div className=" flex flex-wrap w-full px-4 py-2">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-semibold mb-4">Worldwide Cases</h2>
        <div className="overflow-auto">
          <LineChart
            data={chartData}
            width={600}
            height={500}
            margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
          >
            <CartesianGrid stroke="#ccc" />
            <XAxis
              dataKey="date"
              interval={Math.max(0, Math.ceil(chartData.length / numTicks) - 1)}
              allowDataOverflow={true}
              tick={(props) => {
                const { x, y, payload } = props;
                const isLastTick = payload.index === chartData.length - 1;
                return (
                  <text
                    x={x}
                    y={y}
                    dy={10}
                    textAnchor={isLastTick ? "end" : "start"}
                    fontSize="12px"
                    transform={isLastTick ? "rotate(-45)" : ""}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />

            <YAxis
              label={{
                value: "Cases",
                angle: 90,
                position: "insideLeft",
                style: {
                  textAnchor: "middle",
                  fontSize: "12px",
                  transform: "rotate(0)",
                },
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="cases"
              name="Cases"
              stroke="#8884d8"
            />
          </LineChart>
        </div>
      </div>
      <div className="h-[400px] w-[500px] text-center">
        <h2 className="text-2xl font-semibold mb-4">COVID-19 Map</h2>
        <MapContainer
          center={[20, 0] as LatLngExpression}
          zoom={2}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {countryData.map((country) => (
            <Marker
              key={country.countryInfo.iso2}
              position={[country.countryInfo.lat, country.countryInfo.long]}
              icon={L.icon({
                iconUrl: require("../../redicon.png"),
                iconSize: [30, 30],
              })}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="text-xl">{country.country}</h3>
                  <img
                    src={country.countryInfo.flag}
                    alt=""
                    className="mx-auto mt-2 rounded-full border-2 border-red-500 w-20 h-20"
                  />
                  <p className="mt-2">Total Cases: {country.cases}</p>
                  <p>Total Deaths: {country.deaths}</p>
                  <p>Total Recovered: {country.recovered}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Charts;
