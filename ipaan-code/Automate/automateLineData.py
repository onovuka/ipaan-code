import random
import json
import numpy as np

cities = ["Pretoria", "Bloemfontein", "Port Elizabeth", "Durban", "Johannesburg", "Cape Town"]
dates = ["2024-04-" + str(x).zfill(2) for x in range(1, 31)] + ["2024-05-" + str(x).zfill(2) for x in range(1, 31)] + ["2024-06-" + str(x).zfill(2) for x in range(1, 31)]


def generate_data(date, city):
  return {
    "date": date,
    "city": city,
    "upload": random.randint(1, 100),
    "download": random.randint(1, 100)
  }


data = []
for date in dates:
  for city in cities:
    data.append(generate_data(date, city))

# Save data to JSON file
with open('internet_data.json', 'w') as outfile:
  json.dump(data, outfile, indent=4)  # Indent for readability

print("Data saved to internet_data.json")



def generate_random_data(num_points):
  data = []
  for _ in range(num_points):
    lat = round(random.uniform(40, 60), 1)
    lng = round(random.uniform(-100, -80), 1)
    intensity = round(random.uniform(0, 1), 2)
    data.append([lat, lng, intensity])
  return data

random_data = generate_random_data(10)
print(random_data)




def generate_random_points(num_points):
  """
  Generates random latitude, longitude, and download speed points within South Africa.
  
  Args:
    num_points: The number of points to generate.
  
  Returns:
    A list of lists, where each inner list contains latitude, longitude, and download speed.
  """

  # Approximate latitude and longitude ranges for South Africa
  min_lat, max_lat = -35, -22
  min_lon, max_lon = 15, 33

  # Generate random latitude, longitude, and download speeds
  points = []
  for _ in range(num_points):
    lat = np.random.uniform(min_lat, max_lat)
    lon = np.random.uniform(min_lon, max_lon)
    speed = np.random.randint(5, 30)  # Assuming download speeds between 5 and 30 Mbps
    points.append([lat, lon, speed])

  return points

# Example usage:
num_points = 30
random_points = generate_random_points(num_points)
print(random_points)