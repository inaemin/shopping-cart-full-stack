import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{k as n}from"./iframe-DDfIJbpw.js";import{i as r,n as i,r as a,t as ee}from"./plus-B0DhpPgo.js";import{a as o,i as s,n as c,r as l,t as u}from"./emotion-react-jsx-runtime.browser.esm-DNJ5_Dh3.js";import{n as d,t as f}from"./Button-DkaHn-J_.js";import{n as p,t as te}from"./Checkbox-DhX4lsye.js";var m,h=e((()=>{m=class extends Error{status;code;constructor(e,t,n){super(n),this.status=e,this.code=t}}})),g,_,v=e((()=>{g=`https://shopping-cart-full-stack-production-f2ef.up.railway.app`,_={CART:`/cart`,CART_ITEM:e=>`/cart/${e}`}}));async function y(e){if(!e.ok){let t=await e.json().catch(()=>({error:`UNKNOWN_ERROR`,message:e.statusText}));throw new m(e.status,t.error,t.message)}if(e.status!==204)return e.json()}async function ne(e){await y(await fetch(`${g}${_.CART_ITEM(e)}`,{method:`DELETE`}))}async function re(e,t){let n={quantity:t};await y(await fetch(`${g}${_.CART_ITEM(e)}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(n)}))}var ie=e((()=>{h(),v()})),ae,oe=e((()=>{ae=class{queryCache=new Map;pendingMutationCount=new Map;createQueryRecord(e,t){if(this.queryCache.has(e))return;let n={queryFn:t,state:{status:`idle`,data:null,error:null},listeners:new Set};this.queryCache.set(e,n)}getQueryData(e){return this.queryCache.get(e)?.state.data??null}getQueryState(e){return this.queryCache.get(e)?.state??null}async fetchQuery(e){let t=this.queryCache.get(e);if(!t)return null;t.state.data===null&&this.setQueryState(e,{status:`loading`,error:null});try{let n=await t.queryFn();return this.setQueryData(e,n),n}catch(t){throw this.setQueryState(e,{status:`error`,error:t}),t}}setQueryData(e,t){let n=this.queryCache.get(e);if(!n)return;let r=n.state.data;n.state={status:`success`,data:typeof t==`function`?t(r):t,error:null},this.notify(e)}setQueryState(e,t){let n=this.queryCache.get(e);n&&(n.state={...n.state,...t},this.notify(e))}invalidate(e){return this.hasPendingMutation(e)?Promise.resolve(null):this.fetchQuery(e)}hasPendingMutation(e){return(this.pendingMutationCount.get(e)??0)>0}startMutation(e){this.pendingMutationCount.set(e,(this.pendingMutationCount.get(e)??0)+1)}endMutation(e){let t=this.pendingMutationCount.get(e)??0;this.pendingMutationCount.set(e,Math.max(0,t-1))}subscribe(e,t){let n=this.queryCache.get(e);return n?(n.listeners.add(t),()=>{n.listeners.delete(t)}):()=>{}}notify(e){let t=this.queryCache.get(e);t&&t.listeners.forEach(e=>e())}}})),b,x,S=e((()=>{b=t(n(),1),x=(0,b.createContext)(null)}));function C(e,t,n={}){let r=(0,se.useContext)(x);if(!r)throw Error(`useMyMutation은 MyQueryProvider 안에서 사용해야 합니다.`);return{mutate:async i=>{let a;r.startMutation(e);try{a=n.onMutate?.(i);let e=await t(i);return n.onSuccess?.(e,i,a),e}catch(e){throw n.onError?.(e,i,a),e}finally{n.onSettled?.(i,a),r.endMutation(e),r.invalidate(e)}}}}var se,w=e((()=>{se=t(n(),1),S()})),T,E=e((()=>{T=`cart`})),D,O=e((()=>{D={AVAILABLE:`available`,OUT_OF_STOCK:`outOfStock`,QUANTITY_EXCEEDED:`quantityExceeded`}}));function ce(){try{let e=localStorage.getItem(k);return e?JSON.parse(e):{}}catch{return{}}}function le(e){let t=ce();delete t[e],localStorage.setItem(k,JSON.stringify(t))}var k,A=e((()=>{k=`cart_selection`}));function ue(){let e=(0,j.useContext)(x);if(!e)throw Error(`useOptimisticRemoveCartItem은 MyQueryProvider 안에서 사용해야 합니다.`);let{mutate:t}=C(T,({id:e})=>ne(e),{onMutate:({id:t})=>{let n=(e.getQueryData(`cart`)??[]).find(e=>e.id===t);return e.setQueryData(T,e=>(e??[]).filter(e=>e.id!==t)),{deletedItem:n}},onError:(t,n,r)=>{let i=r?.deletedItem;i&&e.setQueryData(T,e=>[...e??[],i])},onSuccess:(e,{id:t})=>{le(t)}});return{removeCartItem:async e=>{try{await t({id:e})}catch{}}}}var j,de=e((()=>{j=t(n(),1),ie(),S(),w(),E(),A()}));function fe(){let[e,t]=(0,M.useState)(`idle`),{mutate:n}=C(T,({id:e,quantity:t})=>re(e,t)),r=async(e,r)=>{t(`pending`);try{await n({id:e,quantity:r}),t(`idle`)}catch{t(`error`)}};return{isPending:e===`pending`,increaseCartItemQuantity:(e,t)=>r(e,t+1),decreaseCartItemQuantity:(e,t)=>r(e,t-1)}}var M,pe=e((()=>{M=t(n(),1),ie(),w(),E()}));function N({cartItem:e,onSelect:t}){let{id:n,name:r,imageUrl:i,price:o,quantity:s,isSelected:u,status:d,errorMsg:p}=e,m=d!==D.AVAILABLE,h=d===D.OUT_OF_STOCK,{isPending:g,increaseCartItemQuantity:_,decreaseCartItemQuantity:v}=fe(),{removeCartItem:y}=ue();return l(`div`,{css:[F,m&&H],children:[l(`div`,{css:I,children:[c(te,{checked:u,disabled:m,onChange:()=>t(n)}),c(f,{variant:`secondary`,fit:!0,onClick:()=>y(n),children:`삭제`})]}),l(`div`,{css:L,children:[c(`img`,{css:me,src:i,alt:r}),l(`div`,{css:R,children:[l(`div`,{css:z,children:[c(`span`,{className:`typo-sm-r`,children:r}),c(`span`,{className:`typo-xl-b`,children:P(o)})]}),l(`div`,{css:B,children:[c(f,{variant:`icon`,onClick:()=>v(n,s),disabled:g||s<=1||h,children:c(a,{})}),c(`span`,{className:`typo-sm-r`,css:V,children:s}),c(f,{variant:`icon`,onClick:()=>_(n,s),disabled:g||m||s>=99,children:c(ee,{})}),p&&c(`span`,{className:`typo-sm-r`,css:U,children:p})]})]})]})]})}var P,F,I,L,me,R,z,B,V,H,U,he=e((()=>{o(),r(),i(),de(),pe(),O(),A(),d(),p(),u(),P=e=>e.toLocaleString(`ko-KR`)+`원`,F=s`
  padding: 12px 0;
  border-top: 1px solid #e5e5e5;
  opacity: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,I=s`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,L=s`
  display: flex;
  gap: 24px;
`,me=s`
  width: 112px;
  height: 112px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  flex-shrink: 0;
`,R=s`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`,z=s`
  display: flex;
  flex-direction: column;
`,B=s`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  height: 32px;
`,V=s`
  min-width: 20px;
  text-align: center;
`,H=s`
  opacity: 0.4;
`,U=s`
  color: #e84040;
`,N.__docgenInfo={description:``,methods:[],displayName:`CartListItem`,props:{cartItem:{required:!0,tsType:{name:`CartItem`},description:``},onSelect:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: number) => void`,signature:{arguments:[{type:{name:`number`},name:`id`}],return:{name:`void`}}},description:``}}}}));function W({children:e}){let[t]=(0,G.useState)(()=>new ae);return c(x.Provider,{value:t,children:e})}var G,ge=e((()=>{G=t(n(),1),oe(),S(),u(),W.__docgenInfo={description:``,methods:[],displayName:`MyQueryProvider`,props:{children:{required:!0,tsType:{name:`ReactNode`},description:``}}}})),K,q,J,_e,Y,X,Z,Q,$,ve;e((()=>{K=t(n(),1),he(),ge(),O(),q={id:1,name:`상품 A`,imageUrl:`https://placehold.co/112x112`,price:35e3,quantity:2,stock:10,status:D.AVAILABLE,isSelected:!0},J=()=>void 0,_e={title:`Components/CartListItem`,component:N,args:{cartItem:q,onSelect:J},decorators:[e=>(0,K.createElement)(W,null,(0,K.createElement)(`div`,{style:{width:430}},(0,K.createElement)(e)))]},Y={render:()=>(0,K.createElement)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8}},(0,K.createElement)(N,{cartItem:q,onSelect:J}),(0,K.createElement)(N,{cartItem:{...q,id:2,name:`선택하지 않은 상품`,isSelected:!1},onSelect:J}),(0,K.createElement)(N,{cartItem:{...q,id:3,name:`구매 불가능한 상품`,status:D.OUT_OF_STOCK,errorMsg:`품절된 상품입니다.`},onSelect:J}),(0,K.createElement)(N,{cartItem:{...q,id:4,name:`수량 에러 상품`,status:D.QUANTITY_EXCEEDED,errorMsg:`최대 구매 가능 수량이 10개 입니다.`},onSelect:J}))},X={},Z={args:{cartItem:{...q,isSelected:!1}}},Q={args:{cartItem:{...q,status:D.OUT_OF_STOCK,errorMsg:`품절된 상품입니다.`}}},$={args:{cartItem:{...q,status:D.QUANTITY_EXCEEDED,errorMsg:`최대 구매 가능 수량이 10개 입니다.`}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  render: () => createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, createElement(CartListItem, {
    cartItem: selectedItem,
    onSelect
  }), createElement(CartListItem, {
    cartItem: {
      ...selectedItem,
      id: 2,
      name: "선택하지 않은 상품",
      isSelected: false
    },
    onSelect
  }), createElement(CartListItem, {
    cartItem: {
      ...selectedItem,
      id: 3,
      name: "구매 불가능한 상품",
      status: CART_ITEM_STATUS.OUT_OF_STOCK,
      errorMsg: "품절된 상품입니다."
    },
    onSelect
  }), createElement(CartListItem, {
    cartItem: {
      ...selectedItem,
      id: 4,
      name: "수량 에러 상품",
      status: CART_ITEM_STATUS.QUANTITY_EXCEEDED,
      errorMsg: "최대 구매 가능 수량이 10개 입니다."
    },
    onSelect
  }))
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    cartItem: {
      ...selectedItem,
      isSelected: false
    }
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    cartItem: {
      ...selectedItem,
      status: CART_ITEM_STATUS.OUT_OF_STOCK,
      errorMsg: "품절된 상품입니다."
    }
  }
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    cartItem: {
      ...selectedItem,
      status: CART_ITEM_STATUS.QUANTITY_EXCEEDED,
      errorMsg: "최대 구매 가능 수량이 10개 입니다."
    }
  }
}`,...$.parameters?.docs?.source}}},ve=[`Default`,`Selected`,`Unselected`,`Unavailable`,`QuantityError`]}))();export{Y as Default,$ as QuantityError,X as Selected,Q as Unavailable,Z as Unselected,ve as __namedExportsOrder,_e as default};