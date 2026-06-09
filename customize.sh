#!/system/bin/sh
# Axeron Module Customization Script
# Runs during installation

ui_print "--------------------------------------"
ui_print "       AXERON PERFORMANCE PRO         "
ui_print "--------------------------------------"
ui_print "- Installing Axeron Engine v14.6.0"
ui_print "- Detected axeronPlugin: 14600"
ui_print "- Optimizing FPS & Touch Sampling..."
ui_print "- Disabling Thermal Throttling..."

# Set permissions
set_perm_recursive $MODPATH 0 0 0755 0644
set_perm $MODPATH/service.sh 0 0 0755
set_perm $MODPATH/action.sh 0 0 0755

ui_print "- Installation Complete. Reboot highly recommended."
