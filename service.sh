#!/system/bin/sh
# Axeron Performance Service Script
# This runs at boot to apply optimizations

# Wait for boot to complete
until [ "$(getprop sys.boot_completed)" -eq 1 ]; do
  sleep 5
done

# 1. FPS & Refresh Rate Unlocked
settings put common refresh_rate_mode 1
settings put global peak_refresh_rate 144.0
settings put global min_refresh_rate 60.0

# 2. Touch Sampling Optimization
setprop windowsmgr.max_events_per_sec 300
setprop view.touch_slop 2
setprop view.scroll_friction 0.005

# 3. Thermal & Performance Mode
setprop persist.sys.thermal.config 0
setprop debug.performance.tuning 1
setprop core_ctl_nrcpus_max 8
setprop core_ctl_nrcpus_min 4

# 4. Axeron Plugin Hook
# Logic for axeronPlugin=14600 integration
echo "Axeron Engine v14.6 Active" > /dev/kmsg
