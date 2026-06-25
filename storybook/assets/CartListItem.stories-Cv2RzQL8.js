import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{I as n,i as r,r as i}from"./iframe-DMA61Hnj.js";import{i as a,n as o,r as s,t as c}from"./plus-DaDua9aY.js";import{a as l,i as u,n as d,r as f,t as p}from"./emotion-react-jsx-runtime.browser.esm-DLYJ61K7.js";import{n as m,t as h}from"./Button-BDwhSxJQ.js";import{d as g,f as _,g as v,h as y,i as ee,l as b,m as x,n as S,o as te,p as ne,s as C,t as re,u as ie}from"./MyQueryProvider-Zdr95Mrr.js";import{n as ae,t as oe}from"./Checkbox-C2srg7dp.js";async function se(e){await y(await fetch(`${ne}${_.CART_ITEM(e)}`,{method:`DELETE`}))}async function ce(e,t){let n={quantity:t};await y(await fetch(`${ne}${_.CART_ITEM(e)}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(n)}))}var w=e((()=>{v(),x()}));function T(e,t,n={}){let r=(0,E.useContext)(ie);if(!r)throw Error(`useMyMutation은 MyQueryProvider 안에서 사용해야 합니다.`);return{mutate:async i=>{let a;r.startMutation(e);try{a=n.onMutate?.(i);let e=await t(i);return n.onSuccess?.(e,i,a),e}catch(e){throw n.onError?.(e,i,a),e}finally{n.onSettled?.(i,a),r.endMutation(e),r.invalidate(e)}}}}var E,D=e((()=>{E=t(n(),1),g()}));function le(){try{let e=localStorage.getItem(O);return e?JSON.parse(e):{}}catch{return{}}}function ue(e){let t=le();delete t[e],localStorage.setItem(O,JSON.stringify(t))}var O,de=e((()=>{O=`cart_selection`}));function fe(){let e=(0,k.useContext)(ie);if(!e)throw Error(`useOptimisticRemoveCartItem은 MyQueryProvider 안에서 사용해야 합니다.`);let{mutate:t}=T(C,({id:e})=>se(e),{onMutate:({id:t})=>{let n=(e.getQueryData(C)??[]).find(e=>e.id===t);return e.setQueryData(C,e=>(e??[]).filter(e=>e.id!==t)),{deletedItem:n}},onError:(t,n,r)=>{let i=r?.deletedItem;i&&e.setQueryData(C,e=>[...e??[],i])},onSuccess:(e,{id:t})=>{ue(t)}});return{removeCartItem:async e=>{try{await t({id:e})}catch{}}}}var k,pe=e((()=>{k=t(n(),1),w(),g(),D(),b(),de()}));function me(){let[e,t]=(0,A.useState)(`idle`),{mutate:n}=T(C,({id:e,quantity:t})=>ce(e,t)),r=async(e,r)=>{t(`pending`);try{await n({id:e,quantity:r}),t(`idle`)}catch{t(`error`)}};return{isPending:e===`pending`,increaseCartItemQuantity:(e,t)=>r(e,t+1),decreaseCartItemQuantity:(e,t)=>r(e,t-1)}}var A,he=e((()=>{A=t(n(),1),w(),D(),b()}));function j({disabled:e=!1,children:t}){return d(`div`,{css:[M,e&&N],children:t})}function ge({children:e}){return d(`div`,{css:P,children:e})}function _e({children:e}){return d(`div`,{css:F,children:e})}function ve({src:e,alt:t=``}){return d(`img`,{css:I,src:e,alt:t})}function ye({children:e}){return d(`span`,{className:`typo-xl-b`,children:e})}function be({children:e}){return d(`span`,{className:`typo-md-b`,children:e})}function xe({children:e}){return d(`span`,{className:`typo-sm-r`,children:e})}function Se({value:e,onDecrease:t,onIncrease:n,decreaseDisabled:r=!1,increaseDisabled:i=!1}){return f(`div`,{css:L,children:[d(h,{variant:`icon`,onClick:t,disabled:r,children:d(s,{})}),d(`span`,{className:`typo-sm-r`,css:R,children:e}),d(h,{variant:`icon`,onClick:n,disabled:i,children:d(c,{})})]})}var M,N,P,F,I,L,R,Ce=e((()=>{l(),a(),o(),m(),p(),j.Header=ge,j.Main=_e,j.Thumbnail=ve,j.Stepper=Se,j.TextXl=ye,j.TextMd=be,j.TextSm=xe,M=u`
  padding: 12px 0;
  border-top: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,N=u`
  opacity: 0.4;
`,P=u`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,F=u`
  display: flex;
  gap: 24px;
`,I=u`
  width: 112px;
  height: 112px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  flex-shrink: 0;
`,L=u`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
`,R=u`
  min-width: 20px;
  text-align: center;
`,j.__docgenInfo={description:``,methods:[{name:`Header`,docblock:null,modifiers:[`static`],params:[{name:`{ children }: { children: ReactNode }`,optional:!1,type:{name:`signature`,type:`object`,raw:`{ children: ReactNode }`,signature:{properties:[{key:`children`,value:{name:`ReactNode`,required:!0}}]}}}],returns:null},{name:`Main`,docblock:null,modifiers:[`static`],params:[{name:`{ children }: { children: ReactNode }`,optional:!1,type:{name:`signature`,type:`object`,raw:`{ children: ReactNode }`,signature:{properties:[{key:`children`,value:{name:`ReactNode`,required:!0}}]}}}],returns:null},{name:`Thumbnail`,docblock:null,modifiers:[`static`],params:[{name:`{ src, alt = "" }: { src: string; alt?: string }`,optional:!1,type:{name:`signature`,type:`object`,raw:`{ src: string; alt?: string }`,signature:{properties:[{key:`src`,value:{name:`string`,required:!0}},{key:`alt`,value:{name:`string`,required:!1}}]}}}],returns:null},{name:`Stepper`,docblock:null,modifiers:[`static`],params:[{name:`{ value, onDecrease, onIncrease, decreaseDisabled = false, increaseDisabled = false }: StepperProps`,optional:!1,type:{name:`StepperProps`,alias:`StepperProps`}}],returns:null},{name:`TextXl`,docblock:null,modifiers:[`static`],params:[{name:`{ children }: { children: ReactNode }`,optional:!1,type:{name:`signature`,type:`object`,raw:`{ children: ReactNode }`,signature:{properties:[{key:`children`,value:{name:`ReactNode`,required:!0}}]}}}],returns:null},{name:`TextMd`,docblock:null,modifiers:[`static`],params:[{name:`{ children }: { children: ReactNode }`,optional:!1,type:{name:`signature`,type:`object`,raw:`{ children: ReactNode }`,signature:{properties:[{key:`children`,value:{name:`ReactNode`,required:!0}}]}}}],returns:null},{name:`TextSm`,docblock:null,modifiers:[`static`],params:[{name:`{ children }: { children: ReactNode }`,optional:!1,type:{name:`signature`,type:`object`,raw:`{ children: ReactNode }`,signature:{properties:[{key:`children`,value:{name:`ReactNode`,required:!0}}]}}}],returns:null}],displayName:`Item`,props:{disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},children:{required:!0,tsType:{name:`ReactNode`},description:``}}}}));function z({cartItem:e,onSelect:t}){let{id:n,name:r,imageUrl:a,price:o,quantity:s,isSelected:c,status:l,errorMsg:u}=e,p=l!==i.AVAILABLE,m=l===i.OUT_OF_STOCK,{isPending:g,increaseCartItemQuantity:_,decreaseCartItemQuantity:v}=me(),{removeCartItem:y}=fe(),b=()=>v(n,s),x=()=>_(n,s),S=g||s<=1||m,te=g||p||s>=99;return f(j,{disabled:p,children:[f(j.Header,{children:[d(oe,{checked:c,disabled:p,onChange:()=>t(n)}),d(h,{variant:`secondary`,fit:!0,onClick:()=>y(n),children:`삭제`})]}),f(j.Main,{children:[d(j.Thumbnail,{src:a,alt:r}),f(`div`,{css:B,children:[f(`div`,{css:V,children:[d(j.TextSm,{children:r}),d(j.TextXl,{children:ee(o)})]}),f(`div`,{css:H,children:[d(j.Stepper,{value:s,onDecrease:b,onIncrease:x,decreaseDisabled:S,increaseDisabled:te}),u&&d(`span`,{className:`typo-sm-r`,css:U,children:u})]})]})]})]})}var B,V,H,U,we=e((()=>{l(),pe(),he(),r(),m(),ae(),Ce(),te(),p(),B=u`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`,V=u`
  display: flex;
  flex-direction: column;
`,H=u`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  height: 32px;
`,U=u`
  width: 140px;
  color: #e84040;
`,z.__docgenInfo={description:``,methods:[],displayName:`CartListItem`,props:{cartItem:{required:!0,tsType:{name:`CartItemView`},description:``},onSelect:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: number) => void`,signature:{arguments:[{type:{name:`number`},name:`id`}],return:{name:`void`}}},description:``}}}})),W,G,K,q,J,Y,X,Z,Q,$;e((()=>{W=t(n(),1),we(),S(),r(),G={id:1,name:`상품 A`,imageUrl:`https://placehold.co/112x112`,price:35e3,quantity:2,stock:10,status:i.AVAILABLE,isSelected:!0},K=()=>void 0,q={title:`Components/CartListItem`,component:z,args:{cartItem:G,onSelect:K},decorators:[e=>(0,W.createElement)(re,null,(0,W.createElement)(`div`,{style:{width:430}},(0,W.createElement)(e)))]},J={render:()=>(0,W.createElement)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8}},(0,W.createElement)(z,{cartItem:G,onSelect:K}),(0,W.createElement)(z,{cartItem:{...G,id:2,name:`선택하지 않은 상품`,isSelected:!1},onSelect:K}),(0,W.createElement)(z,{cartItem:{...G,id:3,name:`구매 불가능한 상품`,status:i.OUT_OF_STOCK,errorMsg:`품절된 상품입니다.`},onSelect:K}),(0,W.createElement)(z,{cartItem:{...G,id:4,name:`수량 에러 상품`,status:i.QUANTITY_EXCEEDED,errorMsg:`최대 구매 가능 수량이 10개 입니다.`},onSelect:K}))},Y={},X={args:{cartItem:{...G,isSelected:!1}}},Z={args:{cartItem:{...G,status:i.OUT_OF_STOCK,errorMsg:`품절된 상품입니다.`}}},Q={args:{cartItem:{...G,status:i.QUANTITY_EXCEEDED,errorMsg:`최대 구매 가능 수량이 10개 입니다.`}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
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
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    cartItem: {
      ...selectedItem,
      isSelected: false
    }
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    cartItem: {
      ...selectedItem,
      status: CART_ITEM_STATUS.OUT_OF_STOCK,
      errorMsg: "품절된 상품입니다."
    }
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  args: {
    cartItem: {
      ...selectedItem,
      status: CART_ITEM_STATUS.QUANTITY_EXCEEDED,
      errorMsg: "최대 구매 가능 수량이 10개 입니다."
    }
  }
}`,...Q.parameters?.docs?.source}}},$=[`Default`,`Selected`,`Unselected`,`Unavailable`,`QuantityError`]}))();export{J as Default,Q as QuantityError,Y as Selected,Z as Unavailable,X as Unselected,$ as __namedExportsOrder,q as default};