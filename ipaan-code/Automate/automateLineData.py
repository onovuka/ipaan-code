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
