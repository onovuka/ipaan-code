import json

# Read the JSON data from 'FilterList.json' with UTF-8 encoding
with open('FilterList.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Initialize the dictionary to store the transformed data
transformed_data = {}

# Process the data
for entry in data['Data']:
    country_code = entry['countrycode']
    city = entry['city']
    isp = entry['isp']
    
    if country_code not in transformed_data:
        transformed_data[country_code] = {'cities': [], 'isps': []}
    
    # Add city if it's not empty and not already present
    if city and city not in transformed_data[country_code]['cities']:
        transformed_data[country_code]['cities'].append(city)
    
    # Add ISP if it's not already present
    if isp not in transformed_data[country_code]['isps']:
        transformed_data[country_code]['isps'].append(isp)

# Convert the dictionary to JavaScript format
js_content = f"const filterData = {json.dumps(transformed_data, indent=2)};\n"
js_content += "export default filterData;"

# Save to a JavaScript file
with open('filterData.js', 'w', encoding='utf-8') as file:
    file.write(js_content)

print("Data has been transformed and saved to filterData.js")
