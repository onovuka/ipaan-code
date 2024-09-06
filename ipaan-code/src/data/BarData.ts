
export interface barData {
    city: string;
    isp: string;
    download: number;
    upload: number
}


export const mockBar: barData[] = [
    {
      "city": "City A",
      "isp": "isp X",
      "download": 87,
      "upload": 42
    },
    {
      "city": "City B",
      "isp": "isp Z",
      "download": 63,
      "upload": 29
    },
    {
      "city": "City D",
      "isp": "isp X",
      "download": 78,
      "upload": 33
    },
  ]
  

  export const mockData2: barData[] = [
    {"download": 25, "upload": 12, "city": "New York", "isp": "isp A"},
    {"download": 18, "upload": 28, "city": "New York", "isp": "isp B"},
    {"download": 7, "upload": 15, "city": "New York", "isp": "isp C"},

    {"download": 22, "upload": 5, "city": "Los Angeles", "isp": "isp A"},
    {"download": 15, "upload": 21, "city": "Los Angeles", "isp": "isp B"},
    {"download": 28, "upload": 10, "city": "Los Angeles", "isp": "isp C"},

    {"download": 11, "upload": 23, "city": "Chicago", "isp": "ISP A"},
    {"download": 27, "upload": 8, "city": "Chicago", "isp": "ISP B"},
    {"download": 5, "upload": 19, "city": "Chicago", "isp": "ISP C"},

    {"download": 19, "upload": 16, "city": "Houston", "isp": "ISP A"},
    {"download": 13, "upload": 25, "city": "Houston", "isp": "ISP B"},
    {"download": 26, "upload": 9, "city": "Houston", "isp": "ISP C"},
    
    {"download": 8, "upload": 17, "city": "Phoenix", "isp": "ISP A"},
    {"download": 21, "upload": 4, "city": "Phoenix", "isp": "ISP B"},
    {"download": 14, "upload": 20, "city": "Phoenix", "isp": "ISP C"},
  ]
  