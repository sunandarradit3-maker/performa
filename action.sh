#!/system/bin/sh
# Axeron Manual Boost Action
# Can be triggered via terminal or module manager UI

ui_print "Manual Boost Triggered!"
# Clear RAM Cache
sync; echo 3 > /proc/sys/vm/drop_caches
# Force performance governor
for gov in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do
    echo "performance" > $gov
done
ui_print "System Optimized for Gaming."
