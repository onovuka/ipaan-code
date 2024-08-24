import geojson
import random
import json

# Load your GeoJSON file with UTF-8 encoding
with open('custom.geo.json', 'r', encoding='utf-8') as f:
    data = geojson.load(f)

# Iterate through each feature and add a "speed" property
for feature in data['features']:
    feature['properties']['speed'] = random.randint(10, 300)

# Save the updated data as a JSON file with UTF-8 encoding
with open('updated_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print("Updated JSON file saved successfully.")
