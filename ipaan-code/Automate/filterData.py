import pandas as pd
import json
import re

# Define the input and output file paths
input_csv_file = 'Countries.csv'
output_js_file = 'countrylist.js'

# Read the CSV file (assuming ';' as delimiter)
df = pd.read_csv(input_csv_file, delimiter=';')

# Transform the data
countries = [
    {"label": row["Country Name"], "value": row["Country Code"]}
    for _, row in df.iterrows()
]

# Convert the list of countries to a JSON-formatted string
initial_options = json.dumps(countries, indent=4)

# Write the output to a JavaScript file
with open(output_js_file, 'w') as jsfile:
    jsfile.write('const initialOptions = ')
    jsfile.write(initial_options)
    jsfile.write(';')

print(f'Transformed data has been saved to {output_js_file}')


# Saves cities
def transform_json_to_js(input_json_file, output_js_file, key):
    """
    Transform JSON data into JavaScript array format and save it to a JS file.
    
    Parameters:
    - input_json_file (str): Path to the input JSON file.
    - output_js_file (str): Path to the output JavaScript file.
    - key (str): Key name in the JSON representing the city list.
    """
    try:
        # Read JSON data from the input file
        with open(input_json_file, 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
        
        # Extract the list of cities from the JSON data
        cities_list = data.get(key, [])
        
        if not cities_list:
            raise ValueError(f"No {key} data found in {input_json_file}")
        
        # Transform the cities list into the desired format
        cities_data = [
            {"label": city["city"], "value": city["city"]}
            for city in cities_list
        ]
        
        # Convert the list of dictionaries to a JSON-formatted string
        cities_json = json.dumps(cities_data, indent=4)
        
        # Write the output to a JavaScript file
        with open(output_js_file, 'w', encoding='utf-8') as jsfile_out:
            jsfile_out.write(f'const {output_js_file.split(".")[0]} = ')
            jsfile_out.write(cities_json)
            jsfile_out.write(';')
        
        print(f'Transformed data has been saved to {output_js_file}')
    
    except Exception as e:
        print(f"Error transforming data: {e}")

# Example usage for transforming Citynames.json to citylist.js
transform_json_to_js('Citynames.json', 'citylist.js', 'Cities')