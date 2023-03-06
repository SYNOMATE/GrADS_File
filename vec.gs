* Plot vectors with arrow labeling at the point you want to put
*                                                   Nov. 1, 2002 Masami Nonaka
*    ga> run vec.gs variable [-SCL size magnitude (same as "set arrscl")]
*                               [-P xp yp (arrow label starts at (xp,yp)]
*                               [-SL string]
*                               [-HDSZ]
*       options
*       -SCL: set size and magnitude of arrow label
*    -P  : set position of arrow label (to use -P, "-SCL" need to be used.)
*       -SL : set string written at the end of the label
*       -HDSZ: set size of arrow head of the label (default=0.15)
*
function vec (args)

variable=subwrd(args,1)

autopl  = 'on'
scl = 0
strlast=''
hdsz=0.15

* examine options are set or not
n=2
while(n<10000)
idx=subwrd(args,n)
opt=subwrd(args,n+1)
if(idx='');break;endif
if(idx='-P')
 cxleft =subwrd(args,n+1)
 cylow  =subwrd(args,n+2)
 autopl ='off'
 n=n+3
endif
if(idx='-SCL')
 size=subwrd(args,n+1)
 magni=subwrd(args,n+2)
 scl=1
 n=n+3
endif
if(idx='-SL')
 strlast=subwrd(args,n+1)
 n=n+2
endif
if(idx='-HDSZ')
 hdsz=subwrd(args,n+1)
 n=n+2
endif
endwhile

*** set default arrow labeling off
'set arrlab on'
if(autopl='off');'set arrlab off';endif

*** set arrow scale
if(scl=1); 'set arrscl 'size ' 'magni;endif

*** draw the vector
'display 'variable

*** draw the vector arrow label
if(autopl='off')
 if(scl=0)
  say '!! CANNOT PLOT Arrow Label: Set allow scale with -SCL option !!'
 else
  'draw line 'cxleft' 'cylow' 'cxleft+size' 'cylow
  'draw line 'cxleft+size' 'cylow' 'cxleft+(1.0-hdsz)*size' 'cylow-0.5*hdsz*size
  'draw line 'cxleft+size' 'cylow' 'cxleft+(1.0-hdsz)*size' 'cylow+0.5*hdsz*size
  'set string 1 tc 5'
  'draw string 'cxleft+0.5*size' 'cylow-0.05' 'magni%' '%strlast
 endif
endif

*** set arrow label on
'set arrlab on'

