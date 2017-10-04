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


## Download and image Raspbian directly
(https://www.raspberrypi.org/learning/software-guide/quickstart/)<br/>
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
- install unclutter (removes cursor)
`sudo apt-get install unclutter`

## Remove black border
- `sudo leafpad` and open `/boot/config.txt`
- set `disable_overscan=1`


## Kiosk.sh file Setup
https://obrienlabs.net/setup-raspberry-pi-kiosk-chromium/
- Run `nano /home/pi/kiosk.sh` and add:

```
#!/bin/bash

# Run this script in display 0 - the monitor
export DISPLAY=:0

# Hide the mouse from the display
unclutter &

# If Chrome crashes (usually due to rebooting), clear the crash flag so we don't have the annoying warning bar
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences

# Run Chromium and open tabs
/usr/bin/chromium-browser --window-size=1920,1080 --kiosk --window-position=0,0 http://zerowaste.ucsc.edu:3000/#/touchscreeen/carousel/site/0 &
```

[SEE FILE](kiosk.sh)

- make the kiosk script executable in CLI:

```
chmod +x kiosk.sh
```

## Autostart file Setup
To configure the pi to become a kiosk machine, all you need to do is edit the `autostart` file in `/home/pi/.config/lxsession/LXDE-pi/`

```
sudo nano ~/.config/lxsession/LXDE-pi/autostart
```

Disable the screensaver by commenting out this line:
```
# @screensaver -no-splash
```
Add these `xset` options to disable some of the power saving settings:

```
@xset s off
@xset s noblank
@xset -dpms
```

Unclutter can be configured by using commands described [here](http://manpages.ubuntu.com/manpages/wily/man1/unclutter.1.html).<br/>
(CAN'T GET UNCLUTTER TO WORK CORRECTLY -- shouldn't really matter as long
I set the cursor to hidden and style accordingly.) <br/>
For example adding this line will set the mouse pointer to disappear after 3 seconds of inactivity:

```
unclutter -idle 3
```


#### Resulting file:
```
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
# @xscreensaver -no-splash
@point-rpi

@xset s off
@xset s noblank
@xset -dpms

# opens terminal session (for remote access)
@lxterminal &

# runs kiosk.sh file
@/home/pi/kiosk.sh &

# runs unclutter (not working?)
@sudo unclutter -idle 1 -root &
```
[see file](autostart.txt)

## Hiding the mouse
Careful as this will remove mouse visibility from screen (but not the mouse itself!!!)<br/>
In this case, instead of using unclutter, we simply edit the `lightdm.conf` file.

```
sudo nano /etc/lightdm/lightdm.conf
```

Uncomment the `xserver-command` line under `[SeatDefaults]` (below the documentation) and add `-nocursor` parameter.

```
xserver-command=X -nocursor
```

##### See also:
https://github.com/lukaskubis/raspbian-jesse-kiosk/blob/master/README.md


## REMOTE ACCESS
http://lifehacker.com/how-to-control-a-raspberry-pi-remotely-from-anywhere-in-1792892937

https://www.raspberrypi.org/documentation/remote-access/vnc/
Select Menu > Preferences > Raspberry Pi Configuration > Interfaces.
Ensure VNC is Enabled.

The autostart script in

CmdL + fn + F4 == Alt + F4 == exit scripts
CmdR == WindowsKey
