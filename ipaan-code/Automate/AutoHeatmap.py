import json

# Load the data from the JSON file
with open('uniquepoints.json', 'r') as file:
    data = json.load(file)

# Transform the data
heatmap = [[round(point['latitude'], 1), round(point['longitude'], 1), round(point['avg_value'], 1)] for point in data['points']]

# Export the transformed data to a .ts file
with open('heatmap.ts', 'w') as file:
    file.write('export const heatmap: [number, number, number][] = ')
    json.dump(heatmap, file, indent=4)
    file.write(';')

print('Data has been transformed and saved to heatmap.ts')
