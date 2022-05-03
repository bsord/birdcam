## Launch & Usage

Install prerequisites:

`pip3 install -r requirements.txt`

Enable CSI camera support via raspi-config
`raspi-config`
 - select 'interface options'
 - select 'csi camera'
 - Enable


Basic start-up:

`python3 main.py`


Advanced start-up:

`python3 main.py --port 8000 --debug --slack-token=[SLACKTOKEN] --slack-channel='#birdcam' --detection-delay=10`

Upload event/media via http post to server:

`python3 main.py --port 8000 --debug --detection-delay=10 --upload-url http://[REMOTE SERVER IP]:3000/api/events`

Configure boot time startup:

`sudo nano /etc/rc.local`

Add the below text just before the `exit 0` line

`sudo python /Path/To/main.py &`


View Live feed:

Open browser to http://localhost:8000

