import pandas as pd
import json

# Load the data from the Excel file
input_file = 'broadband_price_comparison_data.xlsx'
df = pd.read_excel(input_file, header=1)  # Set the second row as header

# Define the African regions
african_regions = ['SUB-SAHARAN AFRICA', 'NORTHERN AFRICA']

# Filter the data for African regions
df_africa = df[df['Continental region'].isin(african_regions)]

# Extract relevant columns and clean up the data
df_africa = df_africa[['Rank', 'Name', 'Currency', 'Conversion rate (USD) (Rates Frozen: 02/04/2024)', 
                       'Average package cost per month (local currency)', 
                       'Cheapest broadband package measured (local currency)', 
                       'Most expensive broadband package measured (local currency)']]

# Rename columns for clarity
df_africa.columns = ['Rank', 'Country', 'Currency', 'Conversion Rate USD', 'Average', 'Cheapest', 'Expensive']

# Convert to dictionary for TypeScript export
data_dict = df_africa.to_dict(orient='records')

# Escape single quotes and handle special characters for TypeScript
def escape_special_chars(data):
    if isinstance(data, str):
        # Handle special characters properly
        return data.replace("\\", "\\\\").replace("'", "\\'").replace('"', '\\"')
    return data

# Apply escaping function to data
escaped_data = [{k: escape_special_chars(v) for k, v in item.items()} for item in data_dict]

# Define the TypeScript export format with backticks
typescript_content = f"""
export const broadbandData = {json.dumps(escaped_data, ensure_ascii=False, indent=2)};
"""

# Save to .ts file
with open('broadband_data_africa.ts', 'w', encoding='utf-8') as file:
    file.write(typescript_content)
