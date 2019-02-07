#!/bin/sh
set -e

uid=$(stat -c %u /srv)
gid=$(stat -c %g /srv)
user_name="node"
group_name="node"

if [ $uid = 0 ] && [ $gid = 0 ]; then
	if [ $# -eq 0 ]; then
	    tail -f /dev/null
	else
	    exec "$@"
	fi
fi

sed -i -r "s/$user_name:x:[[:digit:]]+:[[:digit:]]+:/$user_name:x:$uid:$gid:/g" /etc/passwd
sed -i -r "s/$group_name:x:[[:digit:]]+:/$group_name:x:$gid:/g" /etc/group

user=$(grep ":x:$uid:" /etc/passwd | cut -d: -f1)

chown -Rf $uid:$gid /home

if [ $# -eq 0 ]; then
    tail -f /dev/null
else
    exec "$@"
fi
