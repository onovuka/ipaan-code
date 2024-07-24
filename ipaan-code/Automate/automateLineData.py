import random
import json

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
