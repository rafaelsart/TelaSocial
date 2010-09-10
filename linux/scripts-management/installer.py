#!/usr/bin/python
# ***** BEGIN LICENSE BLOCK *****
# Version: MPL 1.1/GPL 2.0/LGPL 2.1
#
# The contents of this file are subject to the Mozilla Public License Version
# 1.1 (the "License"); you may not use this file except in compliance with
# the License. You may obtain a copy of the License at
# http://www.mozilla.org/MPL/
#
# Software distributed under the License is distributed on an "AS IS" basis,
# WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
# for the specific language governing rights and limitations under the
# License.
#
# The Original Code is TelaSocial Monitor Script
#
# The Initial Developer of the Original Code is
# Armando Biagioni Neto
# Portions created by the Initial Developer are Copyright (C) 2010
# the Initial Developer. All Rights Reserved.
#
# Contributor(s):
#  Marcio Galli - mgalli@taboca.com
#  Armando Neto - armando@armandoneto.com
#
# Alternatively, the contents of this file may be used under the terms of
# either the GNU General Public License Version 2 or later (the "GPL"), or
# the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
# in which case the provisions of the GPL or the LGPL are applicable instead
# of those above. If you wish to allow use of your version of this file only
# under the terms of either the GPL or the LGPL, and not to allow others to
# use your version of this file under the terms of the MPL, indicate your
# decision by deleting the provisions above and replace them with the notice
# and other provisions required by the GPL or the LGPL. If you do not delete
# the provisions above, a recipient may use your version of this file under
# the terms of any one of the MPL, the GPL or the LGPL.
#
# ***** END LICENSE BLOCK *****

import os
from shutil import copy

destination = "/opt/telasocial-manager"
crond_folder = "/etc/cron.d"

if __name__ == '__main__':

	#create the destination folder
	os.makedirs(destination)

	#copy check.py to destination folder
	copy("check.py", destination)

	#move script to cron
	copy("telasocial-runner",crond_folder)
	
	#initialize log file and set the permissions
	touch /var/log/telasocial.log
	chmod a+w /var/log/telasocial.log
