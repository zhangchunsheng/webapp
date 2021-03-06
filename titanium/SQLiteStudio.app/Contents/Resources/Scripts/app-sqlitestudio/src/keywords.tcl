# type is 0 for 'not reserved', 1 for 'reserved name'
#
# Keyword					type
set ::PARSABLE_KEYWORDS_SQLite2 {
ABORT						0
AFTER						0
ALL							1
ANALYZE						0
AND							1
AS							1
ASC							0
ATTACH						0
BEFORE						0
BEGIN						0
BETWEEN						1
BY							1
CASCADE						0
CASE						1
CHECK						1
CLUSTER						0
COLLATE						1
COMMIT						1
CONFLICT					0
CONSTRAINT					1
COPY						0
CREATE						1
CROSS						0
DATABASE					0
DEFAULT						1
DEFERRABLE					1
DEFERRED					0
DELETE						1
DELIMITERS					0
DESC						0
DETACH						0
DISTINCT					1
DROP						1
EACH						0
ELSE						1
END							0
EXCEPT						1
EXPLAIN						0
FAIL						0
FOR							0
FOREIGN						1
FROM						1
FULL						0
GLOB						1
GROUP						1
HAVING						1
IGNORE						0
IMMEDIATE					0
IN							1
INDEX						1
INITIALLY					0
INNER						0
INSERT						1
INSTEAD						0
INTERSECT					1
INTO						1
IS							1
ISNULL						1
JOIN						1
KEY							0
LEFT						0
LIKE						1
LIMIT						1
MATCH						0
NATURAL						0
NOT							1
NOTNULL						1
NULL						1
OF							0
OFFSET						0
ON							1
OR							1
ORDER						1
OUTER						0
PRAGMA						0
PRIMARY						1
RAISE						0
REFERENCES					1
REPLACE						0
RESTRICT					0
RIGHT						0
ROLLBACK					1
ROW							0
SELECT						1
SET							1
STATEMENT					0
TABLE						1
TEMP						0
TEMPORARY					0
THEN						1
TRANSACTION					1
TRIGGER						0
UNION						1
UNIQUE						1
UPDATE						1
USING						1
VACUUM						0
VALUES						1
VIEW						0
WHEN						1
WHERE						1
}

set ::PARSABLE_KEYWORDS_SQLite3 {
ABORT						0
ACTION						0
ADD							1
AFTER						0
ALL							1
ALTER						1
ANALYZE						0
AND							1
AS							1
ASC							0
ATTACH						0
AUTOINCREMENT				1
BEFORE						0
BEGIN						0
BETWEEN						1
BINARY						0
BOOLEAN						0
BY							0
CASCADE						0
CASE						1
CAST						0
CHECK						1
COLLATE						1
COLUMN						0
COMMIT						1
CONFLICT					0
CONSTRAINT					1
CREATE						1
CROSS						0
CURRENT_DATE				0
CURRENT_TIME				0
CURRENT_TIMESTAMP			0
DATABASE					0
DEFAULT						1
DEFERRABLE					1
DEFERRED					0
DELETE						1
DESC						0
DETACH						0
DISTINCT					1
DROP						1
EACH						0
ELSE						1
END							0
ESCAPE						1
EXCEPT						1
EXCLUSIVE					0
EXPLAIN						0
EXISTS						0
FAIL						0
FOR							0
FOREIGN						1
FROM						1
FULL						0
GLOB						0
GROUP						1
HAVING						1
IF							0
IGNORE						0
IMMEDIATE					0
IN							1
INDEX						1
INDEXED						0
INITIALLY					0
INNER						0
INSERT						1
INSTEAD						0
INTERSECT					1
INTO						1
IS							1
ISNULL						1
JOIN						1
KEY							0
LEFT						0
LIKE						0
LIMIT						1
MATCH						0
NATURAL						0
NO							0
NOCASE						0
NOT							1
NOTNULL						1
NULL						1
OF							0
OFFSET						0
ON							1
OR							1
ORDER						1
OUTER						0
PLAN						0
QUERY						0
PRAGMA						0
PRIMARY						1
RAISE						0
REFERENCES					1
REGEXP						0
REINDEX						0
RELEASE						0
RENAME						0
REPLACE						0
RESTRICT					0
RIGHT						0
ROLLBACK					1
ROW							0
SAVEPOINT					0
SELECT						1
SET							1
STATEMENT					0
TABLE						1
TEMP						0
TEMPORARY					0
THEN						1
TO							1
TRANSACTION					1
TRIGGER						0
UNION						1
UNIQUE						1
UPDATE						1
USING						1
VACUUM						0
VALUES						1
VIEW						0
VIRTUAL						0
WHEN						1
WHERE						1
}

set ::SQL_FUNCTIONS {
	abs(arg)
	avg(arg)
	changes()
	count(arg)
	coalesce(arg1,arg2,...)
	current_date
	date(timestring,modifier,modifier,...)
	datetime(timestring,modifier,modifier,...)
	glob(arg1,arg2)
	group_concat(arg<,separator>)
	ifnull(arg1,arg2)
	julianday(timestring,modifier,modifier,...)
	hex(arg)
	last_insert_rowid()
	length(arg)
	like(arg1,arg2<,arg3>)
	load_extension('file'<,'function'>)
	lower(arg)
	ltrim(arg<,'chars'>)
	max(arg1,arg2,...)
	min(arg1,arg2,...)
	nullif(arg1,arg2)
	quote(arg)
	random()
	randomblob(bytes)
	replace(input,'find','replace')
	round(arg<,precision>)
	rtrim(arg<,'chars'>)
	soundex(arg)
	sqlite_source_id()
	sqlite_version()
	strftime(format,timestring,modifier,modifier,...)
	substr(input,start,length)
	sum(arg)
	time(timestring,modifier,modifier,...)
	total_changes()
	total(arg)
	trim(arg<,'chars'>)
	typeof(arg)
	upper(arg)
	zeroblob(bytes)
}

set ::ROWID_KEYWORDS {
	_ROWID_
	ROWID
	OID
}

# Copy keywords from sqlite3 parsable keywords
set ::KEYWORDS [list]

foreach {kw type} $::PARSABLE_KEYWORDS_SQLite3 {
	lappend ::KEYWORDS $kw
}

# Append rest of global keywords
set ::KEYWORDS [concat $::KEYWORDS {
_ROWID_
MAIN
OID
ROWID
SQLITE_MASTER
SQLITE_SEQUENCE
SQLITE_TEMP_MASTER

ABS
COALESCE
GLOB
IFNULL
LAST_INSERT_ROWID
LENGTH
LIKE
LOAD_EXTENSION
LOWER
MAX
MIN
NULLIF
QUOTE
RANDOM
ROUND
SOUNDEX
SQLITE_VERSION
SUBSTR
TYPEOF
UPPER

TABLE_INFO
NEW
OLD

NUMERIC
REAL
NONE
INTEGER
INT
TEXT
BLOB
VARCHAR
CHAR
DATE
DATETIME
}]


set ::TCL_KEYWORDS {
AFTER
APPEND
APPLY
APPLESCRIPT
ARGV
ARGC
ARRAY
AUTO_EXECK
AUTO_LOAD
AUTO_MKINDEX
AUTO_PATH
AUTO_RESET
BEEP
BELL
BINARY
BIND
BINDTAGS
BGERROR
BREAK
BUTTON
CANVAS
CASE
CATCH
CD
CHAN
CHECKBUTTON
CLIPBOARD
CLOCK
CLOSE
COMBOBOX
CONCAT
CONSOLE
CONTINUE
DDE
DESTROY
DICT
ELSE
ELSEIF
ENCODING
ENTRY
ENV
EOF
ERROR
ERRORCODE
ERRORINFO
EVAL
EVENT
EXEC
EXIT
EXPR
FBLOCKED
FCONFIGURE
FCOPY
FILE
FILEEVENT
FLUSH
FOCUS
FONT
FOR
FOREACH
FORMAT
FRAME
GETS
GLOB
GLOBAL
GRAB
GRID
HISTORY
IF
IMAGE
INCR
INFO
INTERP
JOIN
LABEL
LABELFRAME
LAPPEND
LASSIGN
LINDEX
LINSERT
LIST
LISTBOX
LLENGTH
LOAD
LOWER
LRANGE
LREPEAT
LREPLACE
LREVERSE
LSEARCH
LSORT
MENU
MENUBUTTON
MESSAGE
NAMESPACE
NOTEBOOK
OPEN
OPTION
OPTPROC
PACK
PACKAGE
PARRAY
PID
PLACE
PKG_MKINDEX
PROC
PROGRESSBAR
PUTS
PWD
RADIOBUTTON
RAISE
READ
REGEXP
REGISTRY
REGSUB
RENAME
RESOURCE
RETURN
SCALE
SCAN
SCROLLBAR
SEEK
SELECTION
SEND
SET
SOCKET
SOURCE
SPLIT
STRING
SUBST
SWITCH
TCLLOG
TCL_ENDOFWORD
TCL_FINDLIBRARY
TCL_LIBRARY
TCL_PATCHLEVEL
TCL_PLATFORM
TCL_PRECISION
TCL_RCFILENAME
TCL_RCRSRCNAME
TCL_STARTOFNEXTWORD
TCL_STARTOFPREVIOUSWORD
TCL_TRACECOMPILE
TCL_TRACEEXEC
TCL_VERSION
TCL_WORDBREAKAFTER
TCL_WORDBREAKBEFORE
TELL
TEXT
TIME
TK
TKTABTOWINDOW
TKWAIT
TK_CHOOSECOLOR
TK_CHOOSEDIRECTORY
TK_FOCUSFOLLOWMOUSE
TK_FOCUSNEXT
TK_FOCUSPREV
TK_GETOPENFILE
TK_GETSAVEFILE
TK_LIBRARY
TK_MESSAGEBOX
TK_OPTIONMENU
TK_PATCHLEVEL
TK_POPUP
TK_STRICTMOTIF
TK_VERSION
TOPLEVEL
TRACE
UNKNOWN
UNLOAD
UNSET
UPDATE
UPLEVEL
UPVAR
VARIABLE
VWAIT
WHILE
WINFO
WM
}
