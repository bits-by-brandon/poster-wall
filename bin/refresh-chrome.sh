export DISPLAY=":0"
WID=$(xdotool search --onlyvisible --class chromium|head -1)
xdotool windowactivate ${WID}
xdotool key ctrl+F5
sleep 3
xdotool click 1