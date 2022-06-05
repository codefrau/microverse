"use strict";(globalThis.webpackChunk_croquet_microverse=globalThis.webpackChunk_croquet_microverse||[]).push([[614],{1614:(t,e,s)=>{s.r(e),s.d(e,{default:()=>a});const a={modules:[{name:"BitcoinTracker",actorBehaviors:[class BitcoinTrackerActor{setup(){this.history||(this.history=[{date:0,amount:0}]),this.listen("BTC-USD","onBitcoinData"),this.listen("BTC-USD-history","onBitcoinHistory")}latest(){return this.history[this.history.length-1]}onBitcoinData({date:t,amount:e}){t-this.latest().date<1e3||(this.addEntries({date:t,amount:e}),this.say("value-changed",e))}onBitcoinHistory(t){const e=t.filter(t=>25e3<t.date-this.latest().date);this.addEntries(...e),this.publish(this.id,"value-init",e.map(t=>t.amount))}addEntries(...t){this.history.push(...t),0===this.history[0].date&&this.history.shift(),300<this.history.length&&this.history.shift()}}],pawnBehaviors:[class BitcoinTrackerPawn{setup(){this.lastAmount=0,this.listen("value-changed","onBTCUSDChanged"),this.onBTCUSDChanged(),this.listen("handleElected","handleElected"),this.listen("handleUnelected","handleUnelected"),this.say("electionStatusRequested")}handleElected(t){t&&t.to!==this.viewId||(console.log("bitcoin elected"),this.fetchHistory().then(()=>this.openSocket()))}handleUnelected(){console.log("bitcoin unelected"),this.closeSocket()}openSocket(){this.closeSocket();const t={type:"subscribe",feeds:["ticker.sfox.btcusd"]};this.socket=new WebSocket("wss://ws.sfox.com/ws"),this.socket.onopen=()=>{this.socket.send(JSON.stringify(t))},this.socket.onmessage=t=>{let e;try{e=JSON.parse(t.data).payload.last}catch(t){console.log("invalid data")}void 0!==e&&this.say("BTC-USD",{date:Date.now(),amount:+e})}}closeSocket(){this.socket&&this.socket.close()}latest(){return this.actorCall("BitcoinTrackerActor","latest")}fetchHistory(){return console.log("Fetching BTC-USD history from Coinbase..."),fetch("https://api.coinbase.com/v2/prices/BTC-USD/historic?period=day").then(t=>t.json()).then(t=>{const e=t.data.prices.map(t=>({date:+new Date(t.time),amount:+t.price})),s=(console.log("fetched %s prices",e.length),e.filter(t=>t.date>this.latest().date).slice(0,20));s.sort((t,e)=>t.date-e.date),console.log("publishing %s latest prices",s.length),this.say("BTC-USD-history",s)})}onBTCUSDChanged(){let e=this.latest().amount;if(this.lastAmount!==e){var s=this.lastAmount>e?"#FF2222":"#22FF22";this.lastAmount=e,this.clear("#222222");let t=this.canvas.getContext("2d");t.textAlign="right",t.fillStyle=s,t.font="40px Arial",t.fillText("BTC-USD",this.canvas.width-40,85),t.textAlign="center",t.font="90px Arial",t.fillText("$"+e.toFixed(2),this.canvas.width/2,100),this.texture.needsUpdate=!0,this.publish(this.id,"setColor",s)}}clear(t){let e=this.canvas.getContext("2d");e.fillStyle=t,e.fillRect(0,0,this.canvas.width,this.canvas.height)}}]},{name:"BarGraph",actorBehaviors:[class BarGraphActor{setup(){void 0===this._cardData.values&&(this._cardData.values=[],this._cardData.length=20,this._cardData.height=.5),this.subscribe(this.parent.id,"value-changed",this.updateBars),this.subscribe(this.parent.id,"value-init",this.initBars)}length(){return this._cardData.length}height(){return this._cardData.height}values(){return this._cardData.values}updateBars(t,e){let s=this._cardData.values;s.push(t),s.length>this.length()&&s.shift(),e||this.say("updateGraph")}initBars(t){t.forEach(t=>this.updateBars(t,!0)),this.say("updateGraph")}}],pawnBehaviors:[class BarGraphPawn{setup(){this.constructBars(),this.listen("updateGraph","updateGraph"),this.subscribe(this.parent.id,"setColor","setColor"),this.updateGraph(),this.removeEventListener("pointerWheel","onPointerWheel")}constructBars(){this.shape.children.forEach(t=>{t.material.dispose(),this.shape.remove(t)}),this.shape.children=[],this.bars=[];var s=this.actor._cardData.length,a=1/s;let t=Worldcore.THREE;var e=this.actor._cardData.color;this.base=new t.Mesh(new t.BoxGeometry(1,a/4,a,2,4,2),new t.MeshStandardMaterial),this.base.position.set(0,-a/4,0),this.shape.add(this.base),this.bar=new t.Mesh(new t.BoxGeometry(.8*a,1,.8*a,2,2,2),new t.MeshStandardMaterial({color:e,emissive:e}));for(let e=0;e<s;e++){let t=this.bar.clone();t.material=t.material.clone(),t.position.set((.5+e-s/2)*a,0,0),this.shape.add(t),this.bars.push(t)}}setColor(t){t=new Worldcore.THREE.Color(t);this.base.material.color=t,this.base.material.emissive=t}updateGraph(){let s=this.actor._cardData.values,a=this.actor._cardData.height,i=Math.min(...s);var t=Math.max(...s);let h=t-i;i=Math.max(i-h/10,0),h=t-i,this.bars.forEach((t,e)=>{e=a*(s[e]-i)/h;t.scale.set(1,e,1),t.position.y=e/2})}}]},{name:"BitLogo",pawnBehaviors:[class BitLogoPawn{setup(){this.subscribe(this.parent.id,"setColor","setColor"),this.removeEventListener("pointerWheel","onPointerWheel")}setColor(e){if(e!==this.lastColor){var s=this.makePlaneMaterial(this.actor._cardData.depth,e,this.actor._cardData.frameColor,!1);let t=this.shape.children.find(t=>"2d"===t.name);t&&t.children&&0!==t.children.length&&((t=t.children[0]).material=s,this.lastColor=e)}}}]}]}}}]);