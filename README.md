This application allows the user to search for the current weather and future five day forecast for a city/town in Australia.

The user can choose to enter a new city or select a city/town from a list of previous searches.

![Initial page display](./assets/images/1-weatherDashBoard.png)

The data returned is in metrics, so temperature is in degrees Celsius.
![Entering town/city to search for](./assets/images/2-weatherDashBoard.png)

Results of search for town/city is displayed in the following manner.
![Weather results for town/city](./assets/images/3-weatherDashBoard.png)

When the page is refreshed then previous searches are displayed.
![Weather results for town/city](./assets/images/4-weatherDashBoard.png)

A list of previous towns/cities searched is displayed and the usr can choose to select one of those entries and current weather data and five day forecast will be provided.
![Weather results for new town/city search and history of previous searches shown](./assets/images/5-weatherDashBoard.png)

If the user enters a town/city name in lowercase, uppercase or a mixture of case the application will check that the town/city has not already been saved to
local storage previously.  It does this by taking the first letter of the town/city name and converting to Uppercase, the remainder of the town/city name is
converted to lowercase and then a comparision check against the towns/cities in local storage is undertaken.

The screen shot below shows that 'albany' is searched for even though 'Albany' is shown in the list of previous searches.
![Weather results for town/city](./assets/images/6-weatherDashBoard.png)

Results of search are:
![Weather results for town/city](./assets/images/7-weatherDashBoard.png)

Display of page after weather results are retrieved, showing that 'albany' has not been added to the list of previous searches.
![Weather results for town/city](./assets/images/8-weatherDashBoard.png)

