if {[catch {package present Tcl 8.5.0}]} { return }
package ifneeded Tk 8.5.12 [list load [file join $dir .. .. Tk] Tk]