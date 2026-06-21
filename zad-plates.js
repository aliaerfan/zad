/* ════════════════════════════════════════════════════════════════
   zād by tables of joy — shared plate engine
   Renders hand-painted SVG plates across 4 collections.
   API:  ZAD.svg(opts) -> string   |   ZAD.render(el, opts)
   opts: { collection, design, tier, id, sMul, dx, dy, rot, scheme }
   ════════════════════════════════════════════════════════════════ */
window.ZAD = (function () {
  const CX = 150, CY = 150;

  const C = {
    ROSE:'#E2A2B2', PERI:'#8EA4D2', PERI_DK:'#6E86C0', TERRA:'#D8755C',
    SAGE:'#97AC7C', SAGE_DK:'#7C9462', MUSTARD:'#D9A93C', LILAC:'#B89AD0',
    COBALT:'#2E54B8', BURNT:'#C85A1E', TEAL:'#4E9A93', CORAL:'#E8795C',
    CORALX:'#F2675A', TANGERINE:'#F2922C', CHARTREUSE:'#C2CE52', AQUA:'#7BC6CC', SANDT:'#C8614B',
    OLIVE:'#6E7A30', PINE:'#3E6E3E', TOMATO:'#D83A2E', OCHRE:'#E0A024', RUBY:'#A8243C', CORALP:'#E8736A', GLAZE:'#FBF6EA',
    LAPIS:'#2B4C9C', FAIENCE:'#2E9EA0', MALACHITE:'#2E7A56', TERRACOTTAF:'#C9785A', PAPYRUSC:'#F3ECD7', NILE:'#3E9476',
    SEED:'#CE2A46', BLUSHC:'#E08560', HONEY:'#E0A828', GILT:'#D9B24A', FIGP:'#6E3A6A',
    DUSTYROSE:'#CC8EA0', TEALD:'#246E72',
    FIG:'#5E2A52', POMRED:'#B81228', OLIVEG:'#7C8A45', GRAPEC:'#54306E', LEMONC:'#E6B82C', BLOOMRED:'#C81E33',
    LEAFG:'#4A6E34', LEAFD:'#2F5026', STEMC:'#6E5A38',
    GOLD:'#C2A24A', GOLD_D:'#9C7B22', IVORY:'#F4EEDF', CREAM:'#FBF7EF', WHITE:'#FBF7EF', OFFW:'#FBF4E6',
  };

  const P = (r,deg)=>{const a=(deg-90)*Math.PI/180;return[CX+r*Math.cos(a),CY+r*Math.sin(a)];};
  const disc=(r,f)=>`<circle cx="${CX}" cy="${CY}" r="${r}" fill="${f}"/>`;
  const gline=(r,w,c,o)=>`<circle cx="${CX}" cy="${CY}" r="${r}" fill="none" stroke="${c||C.GOLD}" stroke-width="${w}" opacity="${o==null?1:o}"/>`;
  function ring(n,r,unit,start){start=start||0;let o='';
    for(let i=0;i<n;i++){const deg=start+i*360/n;const[x,y]=P(r,deg);
      o+=`<g transform="translate(${x.toFixed(2)},${y.toFixed(2)}) rotate(${deg})">${unit(i)}</g>`;}return o;}
  function pearls(r,sp){const n=Math.round(2*Math.PI*r/sp);let o='';
    for(let i=0;i<n;i++){const[x,y]=P(r,i*360/n);
      o+=`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="1.15" fill="${C.WHITE}" stroke="${C.GOLD_D}" stroke-width="0.3"/>`;}return o;}
  const leaf=(col,tilt,len)=>`<ellipse rx="${len||5}" ry="1.9" fill="${col}" transform="rotate(${tilt})"/>`;
  const star4=(s,col)=>`<path d="M0,${-s*2} L${s*0.5},${-s*0.5} L${s*2},0 L${s*0.5},${s*0.5} L0,${s*2} L${-s*0.5},${s*0.5} L${-s*2},0 L${-s*0.5},${-s*0.5} Z" fill="${col}"/>`;

  function decorate(pat, beads, bandR, acc){
    let o='';
    beads.forEach(b=>{
      if(pat==='dash') o+=ring(Math.round(2*Math.PI*b.r/6), b.r, ()=>`<rect x="-0.7" y="-2.3" width="1.4" height="4.6" fill="${C.GOLD_D}"/>`);
      else if(pat==='dotsAlt') o+=ring(Math.round(2*Math.PI*b.r/7), b.r, i=>`<circle r="${i%2?2:1.1}" fill="${i%2?C.WHITE:acc}" stroke="${C.GOLD_D}" stroke-width="0.3"/>`);
      else o+=pearls(b.r,b.sp);
    });
    if(pat==='vine' && bandR) o+=ring(Math.round(2*Math.PI*bandR/7.5), bandR, i=>leaf(acc, i%2?30:-30,5));
    if(pat==='star' && bandR) o+=ring(Math.round(2*Math.PI*bandR/18), bandR, ()=>star4(2.3,acc));
    return o;
  }

  const M = {};

  M.goose = ()=>`
    <ellipse cx="150" cy="186" rx="40" ry="4" fill="#7A4A52" opacity="0.13"/>
    <line x1="142" y1="162" x2="140" y2="183" stroke="#E08A34" stroke-width="2.4" stroke-linecap="round"/>
    <line x1="150" y1="162" x2="150" y2="183" stroke="#C5701E" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M140,183 l-4,2 m4,-2 l0,2.6 m0,-2.6 l4,2" stroke="#E08A34" stroke-width="1.3" stroke-linecap="round"/>
    <path d="M150,183 l-4,2 m4,-2 l0,2.6 m0,-2.6 l4,2" stroke="#C5701E" stroke-width="1.3" stroke-linecap="round"/>
    <path d="M174,150 C184,148 191,149 197,153 C190,155 183,156 176,158 C174,155 173,152 174,150 Z" fill="#4E3620"/>
    <path d="M178,153 C178,140 167,131 150,131 C135,131 124,137 120,145 C117,150 121,158 130,161 C145,166 167,164 178,159 C181,157 179,155 178,153 Z" fill="#EAD9B6"/>
    <path d="M150,131 C164,131 175,141 179,153 C179,150 178,158 173,159 C162,156 152,154 146,151 C145,143 147,137 150,131 Z" fill="#86643A"/>
    <path d="M152,138 C160,139 168,144 173,151" fill="none" stroke="#5C4326" stroke-width="0.9" opacity="0.8"/>
    <path d="M120,145 C117,150 121,158 130,161 C137,163 144,162 148,158 C145,151 140,144 133,140 C127,137 122,141 120,145 Z" fill="#B14A38"/>
    <path d="M146,151 C150,154 152,158 150,161 C144,162 138,162 134,160" fill="none" stroke="${C.WHITE}" stroke-width="1.3" opacity="0.85"/>
    <path d="M126,143 C118,137 111,131 107,126" fill="none" stroke="#EAD9B6" stroke-width="7" stroke-linecap="round"/>
    <path d="M127,145 C120,139 113,133 109,128" fill="none" stroke="#B14A38" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
    <circle cx="106" cy="123" r="6.2" fill="#86643A"/>
    <path d="M100,124 C100,120 103,117 106,117 C104,120 103,123 104,127 Z" fill="#EAD9B6" opacity="0.7"/>
    <path d="M100,123 l-9,1.6 l9,2.4 Z" fill="#3A2A1C"/>
    <circle cx="105" cy="121.5" r="1.5" fill="#201510"/><circle cx="105.5" cy="121" r="0.5" fill="#fff"/>`;

  M.hoopoe = ()=>`
    <ellipse cx="150" cy="184" rx="22" ry="3" fill="#7A4A52" opacity="0.12"/>
    <line x1="150" y1="168" x2="150" y2="181" stroke="#9A6A3A" stroke-width="2" stroke-linecap="round"/>
    <line x1="156" y1="168" x2="158" y2="181" stroke="#8A5A2E" stroke-width="2" stroke-linecap="round"/>
    <path d="M150,181 l-3,1.6 m3,-1.6 l0,2 m0,-2 l3,1.6" stroke="#9A6A3A" stroke-width="1.1" stroke-linecap="round"/>
    <path d="M158,181 l-3,1.6 m3,-1.6 l0,2 m0,-2 l3,1.6" stroke="#8A5A2E" stroke-width="1.1" stroke-linecap="round"/>
    <path d="M160,157 C169,165 171,176 166,184 C161,177 157,169 155,161 Z" fill="#2C2218"/>
    <rect x="157" y="171" width="9" height="3.2" fill="#F6EEDC" transform="rotate(30 157 171)"/>
    <ellipse cx="151" cy="156" rx="16" ry="12" fill="#D98E4A"/>
    <path d="M138,159 Q151,167 165,158 Q156,151 142,153 Z" fill="#EAC894" opacity="0.7"/>
    ${[0,1,2,3].map(k=>`<rect x="${139+k*5}" y="149" width="2.6" height="14" fill="#2C2218" transform="rotate(8 ${139+k*5} 149)"/>`).join('')}
    ${[0,1,2].map(k=>`<rect x="${141.6+k*5}" y="149" width="2.4" height="14" fill="#F6EEDC" transform="rotate(8 ${141.6+k*5} 149)"/>`).join('')}
    <path d="M140,150 C136,146 135,144 136,140" fill="none" stroke="#D98E4A" stroke-width="7" stroke-linecap="round"/>
    <circle cx="137" cy="140" r="7" fill="#D98E4A"/>
    ${[-28,-14,0,14,28].map(a=>`<g transform="rotate(${a} 137 137)"><path d="M137,137 C135,128 136,120 137,115 C138,120 139,128 137,137 Z" fill="#D98E4A"/><ellipse cx="137" cy="117" rx="1.5" ry="3.2" fill="#2C2218"/></g>`).join('')}
    <path d="M130,141 Q122,143 116,149" fill="none" stroke="#2C2218" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="138" cy="139" r="1.4" fill="#1A120C"/><circle cx="138.4" cy="138.5" r="0.4" fill="#fff"/>`;

  M.lotus = ()=>{
    const petal=(len,wid,fill,ang)=>`<path d="M150,150 C${(150-wid).toFixed(1)},${(150-len*0.5).toFixed(1)} ${(150-wid*0.4).toFixed(1)},${(150-len).toFixed(1)} 150,${150-len} C${(150+wid*0.4).toFixed(1)},${(150-len).toFixed(1)} ${(150+wid).toFixed(1)},${(150-len*0.5).toFixed(1)} 150,150 Z" fill="${fill}" transform="rotate(${ang} 150 150)"/>`;
    let f=`<path d="M150,188 C149,174 150,162 150,150" fill="none" stroke="#7C9462" stroke-width="3.4" stroke-linecap="round"/>`;
    f+=`<ellipse cx="131" cy="183" rx="13" ry="5" fill="#97AC7C"/><ellipse cx="170" cy="181" rx="11" ry="4.4" fill="#8FA56E"/>`;
    [-52,-26,0,26,52].forEach(a=>f+=petal(40,9,'#8EA4D2',a));
    [-34,-12,12,34].forEach(a=>f+=petal(33,8,'#A8BCE4',a));
    [-16,0,16].forEach(a=>f+=petal(26,7,'#E2A2B2',a));
    f+=`<circle cx="150" cy="146" r="3.4" fill="#C2A24A"/>`;
    f+=`${[-8,-3,3,8].map(x=>`<line x1="150" y1="148" x2="${150+x}" y2="138" stroke="#C2A24A" stroke-width="0.8"/><circle cx="${150+x}" cy="138" r="1" fill="#D9B85A"/>`).join('')}`;
    return f;};

  M.papyrus = ()=>{
    let s=`<ellipse cx="150" cy="187" rx="20" ry="3" fill="#7A4A52" opacity="0.1"/>`;
    [[150,150,118],[136,124,114],[164,126,118]].forEach(([tx,ty,bx])=>{
      s+=`<path d="M${bx},188 C${bx},168 ${tx},150 ${tx},${ty}" fill="none" stroke="#7C9462" stroke-width="3" stroke-linecap="round"/>`;
      for(let k=0;k<15;k++){const a=(-72+k*10.3)*Math.PI/180;const ex=tx+17*Math.sin(a);const ey=ty-17*Math.cos(a);
        s+=`<line x1="${tx}" y1="${ty}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" stroke="#97AC7C" stroke-width="0.9"/>`;
        s+=`<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="1.2" fill="#C2A24A"/>`;}
      s+=`<circle cx="${tx}" cy="${ty}" r="2" fill="#7C9462"/>`;});
    return s;};

  M.feather = ()=>{
    let barbs='';
    for(let k=0;k<11;k++){const ty=126+k*5;const len=4+(1-Math.abs(k-5)/6)*9;
      barbs+=`<line x1="150" y1="${ty}" x2="${(150-len).toFixed(1)}" y2="${(ty+3).toFixed(1)}" stroke="#CFC4AE" stroke-width="0.7"/>`+
             `<line x1="150" y1="${ty}" x2="${(150+len).toFixed(1)}" y2="${(ty+3).toFixed(1)}" stroke="#CFC4AE" stroke-width="0.7"/>`;}
    return `<ellipse cx="150" cy="186" rx="14" ry="2.6" fill="#7A4A52" opacity="0.1"/>
      <path d="M150,184 C140,170 138,150 142,130 C144,122 147,118 150,114 C153,118 156,122 158,130 C162,150 160,170 150,184 Z" fill="#F2ECDE"/>
      <path d="M150,184 C144,170 142,150 145,132 C147,124 149,120 150,116 L150,184 Z" fill="#C7D2E8" opacity="0.45"/>
      ${barbs}
      <path d="M150,184 C149,168 150,150 150,116" fill="none" stroke="#C2A24A" stroke-width="1.6"/>
      <rect x="145" y="182" width="10" height="3.4" rx="1.5" fill="#C2A24A"/><circle cx="150" cy="183.6" r="1.4" fill="#8EA4D2"/>`;};

  // Flamingo — Egyptian flat profile, standing on one leg (the flamingo was the hieroglyph for "red")
  M.flamingo = ()=>`
    <ellipse cx="150" cy="200" rx="22" ry="3.4" fill="#7A4A52" opacity="0.13"/>
    <path d="M151,161 L154,178 L149,197" fill="none" stroke="#D8607A" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M149,197 l-5,2.4 m5,-2.4 l0,3 m0,-3 l5,2.4" stroke="#D8607A" stroke-width="1.5" stroke-linecap="round"/>
    <rect x="146.4" y="184" width="6.6" height="2.6" rx="1.1" fill="#C2A24A"/>
    <path d="M156,160 q7,5 3,11 q-2,3 -5,1" fill="none" stroke="#D8607A" stroke-width="2.3" stroke-linecap="round"/>
    <path d="M165,148 l15,-4 -9,6 8,2 -14,3 Z" fill="#E892A8"/>
    <ellipse cx="151" cy="151" rx="19" ry="12" fill="#E892A8" transform="rotate(-7 151 151)"/>
    <ellipse cx="146" cy="155" rx="10" ry="5.5" fill="#F4C2D2" opacity="0.65"/>
    <path d="M137,147 Q151,139 167,147 Q158,154 144,153 Z" fill="#D06A86"/>
    <path d="M141,148 Q151,144 162,148 M143,151 Q151,148 159,151" fill="none" stroke="#B04E6A" stroke-width="0.8" opacity="0.7"/>
    <path d="M147,145 C141,132 131,124 126,114" fill="none" stroke="#E892A8" stroke-width="6.5" stroke-linecap="round"/>
    <path d="M147,145 C142,133 133,126 127,116" fill="none" stroke="#F4C2D2" stroke-width="1.6" stroke-linecap="round" opacity="0.5"/>
    <ellipse cx="125" cy="111" rx="5.6" ry="4.8" fill="#E892A8"/>
    <path d="M121,108 Q112,109 110,116 Q109,122 114,123 L116,119 Q113,116 116,113 Q120,111 122,110 Z" fill="#E0A8B6" stroke="#8A2E48" stroke-width="0.6" stroke-linejoin="round"/>
    <path d="M110,116 Q109,122 114,123 L115,120 Q111,119 112,116 Z" fill="#1A120C"/>
    <circle cx="124" cy="110" r="1.6" fill="#1A120C"/>
    <path d="M126,108.6 q4,-0.6 6,0.8" fill="none" stroke="#1A120C" stroke-width="0.9" stroke-linecap="round"/>
    <path d="M144,146 q3,2 5.5,1" fill="none" stroke="#C2A24A" stroke-width="1.6" stroke-linecap="round"/>`;

  // ── Minimal motifs — refined, soft, tone-on-tone (drawn at absolute 150,150) ──
  // Sunburst — fine radiating lines from a burnished gold sun
  M.sunburst = ()=>{let s='';const N=72;
    for(let i=0;i<N;i++){const a=(i/N)*2*Math.PI, thick=i%6===0, r1=thick?15:21, r2=86;
      s+=`<line x1="${(150+r1*Math.cos(a)).toFixed(1)}" y1="${(150+r1*Math.sin(a)).toFixed(1)}" x2="${(150+r2*Math.cos(a)).toFixed(1)}" y2="${(150+r2*Math.sin(a)).toFixed(1)}" stroke="#6E94AA" stroke-width="${thick?1.5:0.8}" opacity="${thick?0.78:0.38}"/>`;}
    return s+`<circle cx="150" cy="150" r="13" fill="none" stroke="${C.GOLD}" stroke-width="1" opacity="0.5"/>
      <circle cx="150" cy="150" r="9" fill="#CDA84A"/>
      <circle cx="150" cy="150" r="5.5" fill="#E2C56E"/>
      <circle cx="147.5" cy="147.5" r="1.8" fill="#FBEFC2" opacity="0.75"/>`;};

  // Enso — single soft-ink brushstroke with one gold fleck
  M.enso = ()=>`
    <path d="M150 112 C184 109,207 131,209 157 C211 185,191 209,160 213 C129 217,101 200,93 172 C85 146,104 116,138 109"
      fill="none" stroke="#4A4452" stroke-width="8.5" stroke-linecap="round" opacity="0.88"/>
    <path d="M150 112 C184 109,207 131,209 157" fill="none" stroke="#5E5866" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
    <circle cx="176" cy="122" r="3.6" fill="${C.GOLD}" opacity="0.85"/>`;

  // Wreath — delicate gold olive wreath around a ز monogram
  M.wreath = ()=>{let o='';const N=28,R=80;
    for(let i=0;i<N;i++){const a=(-90+i*360/N)*Math.PI/180, x=150+R*Math.cos(a), y=150+R*Math.sin(a), big=i%2===0;
      o+=`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${big?3.4:2.8}" ry="${big?7.6:6.4}" fill="${C.GOLD}" opacity="${big?0.85:0.48}" transform="rotate(${(a*180/Math.PI+90).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;}
    for(let i=0;i<14;i++){const a=(-90+i*360/14)*Math.PI/180;o+=`<circle cx="${(150+91*Math.cos(a)).toFixed(1)}" cy="${(150+91*Math.sin(a)).toFixed(1)}" r="1.6" fill="${C.GOLD}" opacity="0.26"/>`;}
    return o+`<circle cx="150" cy="150" r="27" fill="none" stroke="${C.GOLD}" stroke-width="1" opacity="0.5"/>
      <circle cx="150" cy="150" r="19" fill="none" stroke="${C.GOLD}" stroke-width="0.6" opacity="0.3"/>
      <path d="M140 153 Q150 141 160 145 Q165 149 158 157 Q153 161 144 157" fill="none" stroke="${C.GOLD}" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="152" cy="140" r="3.2" fill="${C.GOLD}" opacity="0.8"/>`;};

  function rimBase(layers){let s='';layers.forEach(L=>{
    if(L.d!==undefined) s+=disc(L.d,L.f);
    else if(L.l!==undefined) s+=gline(L.l,L.w||1.3,L.c||C.GOLD,L.o==null?0.85:L.o);
    else if(L.x!==undefined) s+=L.x;});return s;}
  function placed(mfn, scale, px, py, dx, dy, rot){dx=dx||0;dy=dy||0;rot=rot||0;
    return `<g transform="translate(${150+dx},${150+dy}) rotate(${rot}) scale(${scale}) translate(${-px},${-py})">${mfn()}</g>`;}
  const tmul=(m,t)=>(m.tierMul&&m.tierMul[t])||1;

  const heritage = {
    dinner(id,c,m,pl){
      let s=`<defs><clipPath id="${id}"><circle cx="150" cy="150" r="66"/></clipPath></defs>`;
      s+=rimBase([{d:148,f:C.IVORY},{l:146.5,w:1.4},{l:127,w:1.2,o:0.8},
        {d:126,f:c.ring},{l:126,w:0.6,o:0.7},{d:119,f:C.GOLD},{d:110,f:c.band},{d:80,f:C.GOLD},
        {d:74,f:c.ring},{l:74,w:0.6,o:0.7},{d:67,f:C.WHITE},{l:67,w:1.1},
        {l:110.5,w:0.7,c:C.GOLD_D,o:0.55},{l:80,w:0.7,c:C.GOLD_D,o:0.55}]);
      s+=decorate(c.pat,[{r:114.5,sp:4.6},{r:77,sp:4.4}],95,c.acc);
      s+=`<g clip-path="url(#${id})">${placed(m.fn,m.s*1.0*tmul(m,'dinner')*pl.sMul,m.px,m.py,pl.dx,pl.dy,pl.rot)}</g>`;return s;},
    salad(id,c,m,pl){
      let s=`<defs><clipPath id="${id}"><circle cx="150" cy="150" r="71"/></clipPath></defs>`;
      s+=rimBase([{d:148,f:C.IVORY},{l:146.5,w:1.4},{d:124,f:c.ring},{l:124,w:0.6,o:0.7},
        {d:116,f:C.GOLD},{d:108,f:c.band},{d:78,f:C.GOLD},{d:72,f:C.WHITE},{l:72,w:1},
        {l:108.5,w:0.7,c:C.GOLD_D,o:0.55}]);
      s+=decorate(c.pat,[{r:112,sp:5}],93,c.acc);
      s+=`<g clip-path="url(#${id})">${placed(m.fn,m.s*0.9*tmul(m,'salad')*pl.sMul,m.px,m.py,pl.dx,pl.dy,pl.rot)}</g>`;return s;},
    bowl(id,c,m,pl){
      const gid=id+'-g';
      let s=`<defs><clipPath id="${id}"><circle cx="150" cy="150" r="92"/></clipPath>
        <radialGradient id="${gid}" cx="50%" cy="45%" r="56%"><stop offset="0%" stop-color="#FCF8F0"/>
        <stop offset="55%" stop-color="#F1E7D6"/><stop offset="100%" stop-color="#E2D1B8"/></radialGradient></defs>`;
      s+=rimBase([{d:148,f:C.IVORY},{l:146.5,w:1.4},{l:127,w:1.2,o:0.8},
        {d:126,f:c.ring},{l:126,w:0.6,o:0.7},{d:119,f:C.GOLD},{d:110,f:c.band},
        {l:110.5,w:0.7,c:C.GOLD_D,o:0.55}]);
      s+=decorate(c.pat,[{r:114.5,sp:4.6}],null,c.acc);
      s+=disc(100,`url(#${gid})`);
      s+=`<circle cx="150" cy="150" r="100" fill="none" stroke="#D6C3A6" stroke-width="2.6" opacity="0.5"/>
          <path d="M96,124 A84,84 0 0 1 150,68" fill="none" stroke="#FFF" stroke-width="3.2" opacity="0.22" stroke-linecap="round"/>`;
      s+=`<g clip-path="url(#${id})">${placed(m.fn,m.s*0.8*tmul(m,'bowl')*pl.sMul,m.px,m.py,pl.dx,pl.dy,pl.rot)}</g>`;return s;},
  };

  // MINIMAL — two framings selected per design via c.frame:
  //  'slab' (default, draft A): soft solid colour rim + white well + gold line, larger motif
  //  'band' (draft B): slim colour band near rim, wide cream field, double gold + pearl ring, small motif
  const minimal = {
    _slab(id,c,m,pl,tier){
      const P={dinner:{clip:96,band:143,well:99,wl:95,sc:1.0},
               salad:{clip:100,band:140,well:102,wl:98,sc:0.96},
               bowl:{clip:94,band:139,well:98,wl:94,sc:0.9}}[tier];
      let s=`<defs><clipPath id="${id}"><circle cx="150" cy="150" r="${P.clip}"/></clipPath>`;
      if(tier==='bowl') s+=`<radialGradient id="${id}-g" cx="50%" cy="45%" r="58%"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="64%" stop-color="#FAF6EE"/><stop offset="100%" stop-color="#F0EADC"/></radialGradient>`;
      s+=`</defs>`;
      s+=disc(148,C.IVORY)+gline(146,1,C.GOLD,0.7);
      s+=disc(P.band,c.band);
      s+=disc(P.well,tier==='bowl'?`url(#${id}-g)`:C.WHITE)+gline(P.well,1,C.GOLD,0.6)+gline(P.wl,0.5,C.GOLD_D,0.3);
      if(tier==='bowl') s+=`<path d="M104,128 A78,78 0 0 1 150,82" fill="none" stroke="#FFF" stroke-width="3" opacity="0.3" stroke-linecap="round"/>`;
      s+=`<g clip-path="url(#${id})">${placed(m.fn,m.s*P.sc*pl.sMul,m.px,m.py,pl.dx,pl.dy,pl.rot)}</g>`;return s;},
    _band(id,c,m,pl,tier){
      const P={dinner:{clip:110,band:140,cut:119,line:119,wl:116,pn:64,pr:129.5,pd:0.85,po:0.5,sc:0.82},
               salad:{clip:112,band:139,cut:120,line:120,wl:117,pn:60,pr:129,pd:0.8,po:0.45,sc:0.78},
               bowl:{clip:104,band:139,cut:118,line:118,wl:115,pn:58,pr:128,pd:0.8,po:0.45,sc:0.74}}[tier];
      let s=`<defs><clipPath id="${id}"><circle cx="150" cy="150" r="${P.clip}"/></clipPath>`;
      if(tier==='bowl') s+=`<radialGradient id="${id}-g" cx="50%" cy="45%" r="60%"><stop offset="0%" stop-color="#FFFDF8"/><stop offset="100%" stop-color="#F1EADD"/></radialGradient>`;
      s+=`</defs>`;
      s+=disc(148,C.IVORY)+gline(146,1,C.GOLD,0.75)+gline(143,0.5,C.GOLD_D,0.35);
      s+=disc(P.band,c.band)+disc(P.cut,tier==='bowl'?`url(#${id}-g)`:C.IVORY);
      s+=gline(P.line,0.9,C.GOLD,0.65)+gline(P.wl,0.5,C.GOLD_D,0.3);
      s+=ring(P.pn,P.pr,()=>`<circle r="${P.pd}" fill="${C.GOLD}" opacity="${P.po}"/>`);
      if(tier==='bowl') s+=`<path d="M108,128 A74,74 0 0 1 150,86" fill="none" stroke="#FFF" stroke-width="3" opacity="0.28" stroke-linecap="round"/>`;
      s+=`<g clip-path="url(#${id})">${placed(m.fn,m.s*P.sc*pl.sMul,m.px,m.py,pl.dx,pl.dy,pl.rot)}</g>`;return s;},
    dinner(id,c,m,pl){return (c.frame==='band'?minimal._band:minimal._slab)(id,c,m,pl,'dinner');},
    salad(id,c,m,pl){return (c.frame==='band'?minimal._band:minimal._slab)(id,c,m,pl,'salad');},
    bowl(id,c,m,pl){return (c.frame==='band'?minimal._band:minimal._slab)(id,c,m,pl,'bowl');},
  };

  // ── BAHARI — coastal fish-scale rosette · calm white well · jewelled trio · a little fish ──
  const _bGOLD='#C2A24A', _bGOLDDK='#9C7B22', _bWHITE='#FBFBF7', _bSFILL='#F4F3EE', _bf=v=>v.toFixed(1);
  function _bDome(x,y,R,deg,fill,pearl){
    let g=`<g transform="translate(${_bf(x)},${_bf(y)}) rotate(${_bf(deg)})"><path d="M${-R},0 A${R},${R} 0 0 1 ${R},0 Z" fill="${fill}" stroke="${_bGOLD}" stroke-width="0.4" stroke-opacity="0.45"/><path d="M${_bf(-R*0.6)},0 A${_bf(R*0.6)},${_bf(R*0.6)} 0 0 1 ${_bf(R*0.6)},0" fill="none" stroke="${_bGOLD}" stroke-width="${_bf(R*0.06)}" opacity="0.6"/>`;
    if(pearl) g+=`<circle cx="0" cy="${_bf(R*0.52)}" r="${_bf(R*0.15)}" fill="${_bGOLD}" opacity="0.9"/>`;
    return g+'</g>';
  }
  function _bRosette(R,rmax,rmin,accent,targets){
    const u=[]; let ring=0;
    for(let rr=rmax; rr>=rmin; rr-=R*1.15, ring++){
      const n=Math.max(7,Math.round(2*Math.PI*rr/(2*R))), off=(ring%2)?Math.PI/n:0;
      for(let i=0;i<n;i++){const a=off+i*2*Math.PI/n; u.push({x:CX+rr*Math.cos(a),y:CY+rr*Math.sin(a),deg:a*180/Math.PI-90,acc:false});}
    }
    (targets||[]).forEach(t=>{const tx=CX+t[1]*Math.cos(t[0]*Math.PI/180),ty=CY+t[1]*Math.sin(t[0]*Math.PI/180);
      let b=-1,bd=1e9; u.forEach((p,k)=>{if(p.acc)return;const d=(p.x-tx)**2+(p.y-ty)**2;if(d<bd){bd=d;b=k;}}); if(b>=0)u[b].acc=true;});
    return u.map(p=>_bDome(p.x,p.y,R,p.deg,p.acc?accent:_bSFILL,p.acc)).join('');
  }
  function _bPearls(r,rad,dots){let o='';for(let i=0;i<dots;i++){const a=i*2*Math.PI/dots;o+=`<circle cx="${_bf(CX+r*Math.cos(a))}" cy="${_bf(CY+r*Math.sin(a))}" r="${rad}" fill="${_bGOLD}" opacity="0.5"/>`;}return o;}
  function _bFish(s,col){return `<g transform="translate(${CX},${CY}) rotate(-6) scale(${s})" fill="none" stroke="${col}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M-14,0 Q-1,-8.5 15,-4.5 Q20,-3 21,0 Q20,3 15,4.5 Q-1,8.5 -14,0 Z"/><path d="M-14,0 L-24,-7 Q-19,0 -24,7 Z"/><path d="M9,-4.4 Q12.4,0 9,4.4"/><circle cx="13.4" cy="-1.6" r="0.95" fill="${col}" stroke="none"/></g>`;}
  const bahari = {
    _plate(id,c,tier){
      const well = tier==='bowl'?80:84, gid=id+'-bg';
      let s=`<defs><clipPath id="${id}"><circle cx="${CX}" cy="${CY}" r="133"/></clipPath>`;
      if(tier==='bowl') s+=`<radialGradient id="${gid}" cx="50%" cy="45%" r="60%"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#F4F1EA"/></radialGradient>`;
      s+=`</defs>`;
      s+=disc(149,_bWHITE);
      s+=`<g clip-path="url(#${id})">${_bRosette(10,131,well,c.accent,c.targets)}</g>`;
      s+=disc(well, tier==='bowl'?`url(#${gid})`:_bWHITE)+_bPearls(well-4,0.7,40);
      s+=gline(well,0.9,_bGOLD,0.75)+gline(well-4,0.4,_bGOLDDK,0.3);
      s+=gline(146.5,1.1,_bGOLD,0.85)+gline(143,0.4,_bGOLDDK,0.35);
      s+=_bFish(tier==='bowl'?0.6:0.66,c.accent);
      return s;
    },
    dinner(id,c){return bahari._plate(id,c,'dinner');},
    salad(id,c){return bahari._plate(id,c,'salad');},
    bowl(id,c){return bahari._plate(id,c,'bowl');},
  };

  const BUILDERS = { heritage, minimal, bahari };

  const DESIGNS = {
    geese:   { collection:'heritage', name:'Geese of Meidum', scheme:'Blush band · Cobalt ring',
               c:{band:C.ROSE,ring:'#2E54B8',acc:C.PERI,pat:'pearls'}, m:{fn:M.goose,s:0.63,px:148,py:152} },
    birds:   { collection:'heritage', name:'Birds of Egypt', scheme:'Sage band · Burnt-orange ring',
               c:{band:C.SAGE,ring:'#C85A1E',acc:C.SAGE_DK,pat:'dash'}, m:{fn:M.hoopoe,s:0.32,px:150,py:150,dx:26,dy:24,rot:6,tierMul:{bowl:1.7}} },
    lotus:   { collection:'heritage', name:'Lotus', scheme:'Blush band · Teal ring',
               c:{band:C.ROSE,ring:'#0E8A80',acc:C.ROSE,pat:'vine'}, m:{fn:M.lotus,s:0.63,px:150,py:150} },
    papyrus: { collection:'heritage', name:'Papyrus', scheme:'Sage band · Magenta ring',
               c:{band:C.SAGE,ring:'#C42E6A',acc:C.TERRA,pat:'dotsAlt'}, m:{fn:M.papyrus,s:0.31,px:150,py:150} },
    maat:    { collection:'heritage', name:'Maat', scheme:'Lilac band · Violet ring',
               c:{band:C.LILAC,ring:'#6A3CA8',acc:C.PERI_DK,pat:'star'}, m:{fn:M.feather,s:0.356,px:150,py:150,tierMul:{bowl:1.45}} },
    flamingo:{ collection:'heritage', name:'Flamingo', scheme:'Aqua band · Coral-rose ring',
               c:{band:'#C9DAD2',ring:'#E0506A',acc:'#7C9462',pat:'vine'}, m:{fn:M.flamingo,s:0.6,px:150,py:152} },
    sunburst:{ collection:'minimal', name:'Sunburst', scheme:'Dusty-blue band · radiating gold sun',
               c:{band:'#B9CFD9',frame:'band'}, m:{fn:M.sunburst,s:1.0,px:150,py:150} },
    enso:    { collection:'minimal', name:'Enso', scheme:'Oat rim · single gold-flecked brushstroke',
               c:{band:'#E5DCC9'}, m:{fn:M.enso,s:1.0,px:150,py:150} },
    wreath:  { collection:'minimal', name:'Wreath', scheme:'Honey rim · gold olive wreath · ز monogram',
               c:{band:'#E0C788'}, m:{fn:M.wreath,s:1.0,px:150,py:150} },
    coral:    { collection:'bahari', name:'Coral', scheme:'White rosette · coral crown · little fish',
                c:{accent:'#D98B72', targets:[[-108,108],[-90,108],[-72,108]]}, m:{px:150,py:150} },
    tide:     { collection:'bahari', name:'Tide', scheme:'White rosette · teal triad · little fish',
                c:{accent:'#4E9189', targets:[[-90,108],[30,108],[150,108]]}, m:{px:150,py:150} },
    seaglass: { collection:'bahari', name:'Sea Glass', scheme:'White rosette · aqua rising · little fish',
                c:{accent:'#79B2AE', targets:[[-52,93],[-45,110],[-38,127]]}, m:{px:150,py:150} },
    dune:     { collection:'bahari', name:'Dune', scheme:'White rosette · sandy low tide · little fish',
                c:{accent:'#CBA773', targets:[[58,108],[90,110],[122,108]]}, m:{px:150,py:150} },
  };

  let _uid = 0;
  function svg(opts){
    opts = opts || {};
    const D = DESIGNS[opts.design];
    if(!D) return '';
    const tier = opts.tier || 'dinner';
    const c = Object.assign({}, D.c, opts.scheme || {});
    const id = 'zp'+(_uid++)+'-'+(opts.id||opts.design);
    const pl = {
      sMul: opts.sMul||1,
      dx:  opts.dx!=null ? opts.dx : (D.m.dx||0),
      dy:  opts.dy!=null ? opts.dy : (D.m.dy||0),
      rot: opts.rot!=null ? opts.rot : (D.m.rot||0),
    };
    const builder = BUILDERS[opts.collection || D.collection];
    return builder[tier](id, c, D.m, pl);
  }
  function render(el, opts){ if(typeof el==='string') el=document.getElementById(el);
    el.innerHTML = svg(opts); }

  return { svg, render, DESIGNS, palette:C, motifs:M, COLLECTIONS:{
    heritage:['geese','birds','lotus','papyrus','maat','flamingo'],
    minimal:['sunburst','enso','wreath'],
    bahari:['coral','tide','seaglass','dune'] } };
})();
