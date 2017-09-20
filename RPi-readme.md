# Raspberry Pi Setup

## OS Information
cat /etc/debian_version <br/>
cat /etc/os-release <br/>
$ cat /proc/cpuinfo <br/>

      Hardware
      Raspberry Pi 3 B
      ARMv7 rev 4 (v71)
      Broadcom BCM2835

- Raspbian Jessie (8.0) --> updated to Stretch (9.1) -- (flashed image)

- Resolution Settings: Raspberry Pi Configuration > Resolution > DMT mode 82 1920x1080 60Hz 16:9

- Format SD card with "SD Card Formatter" -- maybe use "quick" option
https://www.sdcard.org/downloads/formatter_4/index.html


## Download and image Raspbian directly (https://www.raspberrypi.org/learning/software-guide/quickstart/)
An alternative to using NOOBS to install Raspbian is to download and install the image directly. This is a faster process, and is great if you need to image multiple cards for a workshop or class.<br/>
1. Using a computer with an SD card reader, visit the official Raspberry Pi Downloads page.
2. Click on Raspbian.
3. Click on the Download ZIP button under ‘Raspbian Jessie with desktop’, and select a folder to save it to.
4. Extract the files from the zip.
5. Visit etcher.io and download and install the Etcher SD card image utility.
6. Run Etcher and select the Raspbian image you unzipped on your computer or laptop.
7. Select the SD card drive. Note that the software may have already selected the right drive.
8. Finally, click Burn to transfer Raspbian to the SD card. You'll see a progress bar that tells you how much is left to do. Once complete, the utility will automatically eject/unmount the SD card so it's safe to remove it from the computer.

#### To update an existing Jessie image, type the following at the command line:
- sudo apt-get update
- sudo apt-get dist-upgrade
- sudo apt-get install -y rpi-chromium-mods
- sudo apt-get install -y python-sense-emu python3-sense-emu
- sudo apt-get install -y python-sense-emu-doc realvnc-vnc-viewer <br/>
and then reboot. <br/>
If you don’t use xrdp and would like to use the RealVNC server to remotely access your Pi, type the following: <br/>
sudo apt-get install -y realvnc-vnc-server <br/>


## REMOTE ACCESS
http://lifehacker.com/how-to-control-a-raspberry-pi-remotely-from-anywhere-in-1792892937

https://www.raspberrypi.org/documentation/remote-access/vnc/
Select Menu > Preferences > Raspberry Pi Configuration > Interfaces.
Ensure VNC is Enabled.

      RealVNC
      email: #######
      password: #######

      My laptop info
      password: ######

      raspberry pi info
      ID: pi
      password: raspberry

## Kiosk Setup (incomplete)
sudo apt-get install unclutter
