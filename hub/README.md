# Solar Agribots Hub Server

This is going to be everything needed to configure a raspberry pi for use as the hub server.

## How to run
1. Install the necessary libraries `npm install`
2. copy the example.env file to a .env file and fill out the required fields
3. run the server `node hub` 

## Raspberry-Pi OS Installation
For our project we are using the Raspberry Pi Model 4B

1. Install the [Raspberry Pi Imager](https://www.raspberrypi.com/software/)
2. Select the desired OS image(We are using the 64Bit Raspberry Pi OS Lite)
3. Select the SD card you want to image
4. Write the image to the SD Card

## Raspberry Pi SSH 
### Setup
1. Create a username and password for the Raspberry PI
2. Connect the Raspberry Pi to ethernet
3. Open the config (sudo raspi-config)
4. Open "3 Interface Options"
5. Open "12 SSH"
6. Enable SSH

### Connect To SSH (windows)
1. Get the IP of the raspbery Pi (hostname -I)
2. Open the windows terminal
3. type "ssh {your username}@{your raspberry pi's ip}" EX: "ssh agribot-hub@11.111.1.111"
4. Enter your password

## Installing Necessary Software
1. Upgrade the software on the raspberry pi (sudo apt update)
2. Upgrade the software  (sudo apt upgrade)
3. Install git (sudo apt install git)
4. Install NodeJS (sudo apt install nodejs)
5. Install NPM (sudo apt install npm)

## Connecting the Raspberry PI to github code
1. Navigate to the Settings page
2. Naviage to the Deploy Keys Section
3. Connect to the Raspberry pi
4. Generate a ssh key pair using (ssh-keygen -t rsa -b 4096 -C 'YOURGITHUB@EMAL.com')
5. eval "$(ssh-agent -s)"
6. ssh-add ~/.ssh/id_rsa
7. cd .ssh
8. (ls) to view the files in the director
9. open the private key (cat [keyname])
10. Copy they Key
11. Click Add new Deploy Key on Github
12. Paste in the key(Click allow write access if you want the server to be able to commit changes) and click Add Key
13. Test the Key (ssh -T git@github.com) You should get a hello message.
14. To clone the repo: (git clone git@github.com:YOUR_GITHUB_USERNAME/YOUR_REPO.git)

## Running The Server
1. Move to the server directory (cd solar-agribots-hub)2. Install the npm packages (npm install)
3. Move to the server.js file location (cd server)
4. Start the server (node server)