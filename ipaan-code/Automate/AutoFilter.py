import re

# Read the existing countrylist.ts file
with open('countrylist.ts', 'r') as file:
    content = file.read()

# Regex to find all label-value pairs
pattern = re.compile(r'{\s*"label":\s*"(.*?)",\s*"value":\s*"(.*?)"\s*},?')
matches = pattern.findall(content)

# Check if any matches were found
if not matches:
    print("No matches found. Please check the format of your file.")
else:
    # Prepare the updated list with value set to the label
    updated_content = 'import { FilterOptions } from "./Filterlist";\n\n'
    updated_content += "export const countrylist: FilterOptions[] = [\n"

    for label, _ in matches:
        updated_content += f'    {{"label": "{label}", "value": "{label}"}},\n'

    updated_content = updated_content.rstrip(',\n')  # Remove the trailing comma
    updated_content += "\n];"

    # Write the updated list to countryValue.ts
    with open('countryValue.ts', 'w') as file:
        file.write(updated_content)

    print("Updated countryValue.ts file created successfully.")
