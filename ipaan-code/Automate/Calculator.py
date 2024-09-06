# local exchange rate calculator

# initial price
Rank1= 11
Currency1 = "ZWL"
exchange1 = 0.003106
Average1 = 3105.0
Cheapest1 = 2425.0
Expensive1 = 4058.0

# target currency
Rank= 127
Currency= "ZAR"
exchange= 0.053657710000000004
Average= 899.0
Cheapest= 215.0
Expensive= 1880.0

def toUSD(price, exchange):
    
    return price*exchange



def convert (priceInUSD, targetCurrency):

    return priceInUSD / targetCurrency


price = toUSD (Average1, exchange1)

print("price in ZAR:", convert(price, exchange))



