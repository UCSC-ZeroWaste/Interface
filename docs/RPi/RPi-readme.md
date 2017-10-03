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


## Kiosk Setup (incomplete)

https://obrienlabs.net/setup-raspberry-pi-kiosk-chromium/

- Run `nano /home/pi/.config/autostart/kiosk.desktop` and add:
      [Desktop Entry]
      Type=Application
      Name=Kiosk
      Exec=/home/pi/kiosk.sh
      X-GNOME-Autostart-enabled=true
[see file](kiosk.desktop)

- Run `nano /home/pi/kiosk.sh` and add:
[see file](kiosk.sh)

- make the kiosk script executable
`chmod +x kiosk.sh`

- reboot Pi to start in kiosk mode or go to `/home/pi` enter `./kiosk.sh` in the command line
- press Alt+F4 to exit


##### TO DO
-


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






## Hiding mouse cursor
##### Display only
If you don't plan to use a touch screen, the solution is to use `unclutter`, which is a tool, that hides the cursor after some idle time.

## Kiosk mode
To configure the pi to become a kiosk machine, all you need to do is edit the `autostart` file in `~/.config/lxsession/LXDE-pi/`

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

If you've decided to use `unclutter`, you can configure it by using commands described [here](http://manpages.ubuntu.com/manpages/wily/man1/unclutter.1.html), for example adding this line will set the mouse pointer to disappear after 3 seconds of inactivity:

```
unclutter -idle .1
```

Resulting in:
```
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
# @screensaver -no-splash
@point-rpi

@xset s off
@xset s noblank
@xset -dpms
@/home/pi/kiosk.sh
```

CAN'T GET UNCLUTTER TO WORK CORRECTLY -- shouldn't really matter as long
I set the cursor to hidden and style accordingly.
```
@unclutter -idle 0 -root
```

remove:
      Add this line to start the Chromium browser in kiosk mode after boot:
      ```
      @chromium-browser --noerrdialogs --kiosk --incognito https://google.com
      ```
      The `--noerrdialogs` parameter will make sure that no error messages will pop up after restart if something causes Chromium to end unexpetedly.
      Save, exit and restart your pi.

##### Touch screen
Careful as this will remove mouse visibility from screen (but not the mouse itself!!!)

If you use touch screen to interact with you device, you probably don't want to see the mouse cursor appearing under your finger every time you touch the screen, so the answer here is to disable the mouse pointer alltogether. Just be sure your display is properly configured. (The 7" Raspberry Pi Display works pretty much out of the box)

In this case, instead of using unclutter, we simply edit the `lightdm.conf` file.

```
sudo nano /etc/lightdm/lightdm.conf
```

Uncomment the `xserver-command` line under `[SeatDefaults]` (below the documentation) and add `-nocursor` parameter.

```
xserver-command=X -nocursor
```

## See also
https://github.com/lukaskubis/raspbian-jesse-kiosk/blob/master/README.md
