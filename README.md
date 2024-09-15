# Visualisation Dashboard for Internet Performance for African Networks (IPAAN)

IPAAN is a Computer Science honours project at the University of Cape Town aiming to design and develop an internet performance analysis tool using internet performance data obtained from Measurement Lab.

Project Members: Owethu Novuka and Kyler. Supervised by Josiah Chavula.

The project was split into the following sections:

- Frontend implementation of the dashboard - Owethu Novuka

- Data Collection, Formatting and Backend development - Kyler

## Visualisation of Internet Performance Dashboard
The Broadband Performance Visualization Dashboard provides users with an interactive platform to visualize and analyze broadband metrics across African regions. The dashboard includes features like interactive maps, line charts, bar charts, and filters, enabling detailed insights into ISP performance.

### Key metrics visualized include:
- Upload and Download Speeds
- Latency (minRTT)
- Packet Loss Rates
The application fetches data from an API and allows users to filter data based on time periods, geographical locations, and ISPs, offering an in-depth analysis of broadband performance.

### Features
- Interactive Charts: Line charts, bar charts, and an interactive choropleth map to visualize broadband metrics.
- Custom Filters: Filter data by date range, country, city, and ISP.
- Dynamic Data Fetching: Fetch and display real-time data using the QUERY component.

## Technologies Used
### Front end
- React
- Typescript
- Vite
- Recharts
- Shadcn/ui components
### Back end 
- Api

## Installation
Step-by-step guide on how to install and run the project locally.
1. Ensure you have Node.js version 18+ or 20+ installed. You can download it from Node.js official website: https://nodejs.org/en/download/package-manager.
2. Unzip the code submission
3. Extract the contents of the provided zip file.
4. Navigate to the ipaan-code project directory.
5. Install Dependencies: npm install
6. Run the Development Server: npm run dev
7. Open Your Browser: Navigate to http://localhost:3000 to view the dashboard.

## Usage
- Interactive Charts: Explore broadband metrics using various chart types.
- Custom Filters: Apply filters to view specific data by date range, country, city, and ISP.
- Dynamic Data Fetching: The dashboard updates in real-time based on API data.

## API
Base URL: http://137.158.62.185:3000/
Endpoints: 
/line: Retrieve broadband performance data over time.
/bar: Retrieves city and ISP data for plotting a comparison bar chart.
