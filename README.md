# RaceReview
https://racereviewmsa.azurewebsites.net/ is a sample site designed for users to submit reviews and ratings of past motor races such as Formula 1, so that other users can find races and their reviews and decide to watch or not.

The frontend Typescript React web app connects to a REST API which is a ASP.NET Core Web Application, both of which are hosted as Azure web apps.

The server uses the Entity Framework to connect to an instance of Azure SQL database in a serverless configuration.

There is both a desktop view and a mobile view where the tackbar collapses to a drawer.
The theme of the site is inspired by chicanes in racing circuits.

Currently to login there is no backend authentication for logging in, so any username and password is accepted.
Once logged in, the user can add races to the database, or submit or edit their reviews and scores for the races.

Logging in as 'Admin' with 'password' as the password, gives full admin privileges, and can edit/delete races or other user's reviews.

Users can search for races or sort them by criteria such as the championship series  and the average score.

Clicking on a race's page shows its details and also its average score and total number of reviews. 
User reviews and their scores for that race will also be shown which can be upvoted or downvoted.
Finally the user can submit their own reviews and scores or edit or delete them.

In Chrome only, for the review it uses the Web Speech API, so the user's voice input is converted to text in the review box.

In the chat tab, logged in users can live chat to each other.
The chat service is run as a Azure Function app which then connects to an instance of Azure SignalR service.

Backend code is at https://github.com/GeorgeCLu/MSA_Race_Review_API

Backend with Swagger ui interface web link: https://msaracereviewapi.azurewebsites.net/index.html

SignalR code is at https://github.com/GeorgeCLu/racereviewchatsignalr
