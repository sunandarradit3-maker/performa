#!/system/bin/sh
# Axeron Cleanup Script

# Restore default properties
setprop persist.sys.thermal.config 1
settings delete global peak_refresh_rate
settings delete global min_refresh_rate

rm -rf /data/adb/modules/axeron_perf_pro
