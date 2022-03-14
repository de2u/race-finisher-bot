# race-finisher-bot
This program allows you to display *racetime.gg* race finishers in a Twitch chat.

The information it needs is collected from the API endpoint of the specified *racetime.gg* race.
It is then relayed to the Twitch account that you configured.

## How to set it up

First of all, you'll need to install all the required Node packages with
```npm install```

Then you'll need to add your HTTPS key and certificate. Those files should be named `selfsigned.key` and `selfsigned.crt` respectively.

You then need to add the username and OAuth token of the Twitch account you want to send messages with to the `.env` file.

Finally, the API URL needs to be configured in [TO DO].


If any of those steps are not done, the server will not work properly or might not even start.

## How to use it

After accessing the web interface:
- Enter the name of the Twitch channel where you want to display race finishers
- Press Confirm
- Copy and Paste the link of the *racetime.gg* race where you want to collect the results from
- Press Confirm
