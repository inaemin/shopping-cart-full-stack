import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{k as n}from"./iframe-DLXOd2ro.js";import{i as r,n as i,r as a,t as o}from"./plus-BYf3NX1_.js";import{a as s,i as c,n as l,r as u,t as d}from"./emotion-react-jsx-runtime.browser.esm-JfBDRedL.js";import{n as f,t as p}from"./Button-BdKE7EA3.js";import{n as m,t as h}from"./Checkbox-Cs8O_f_4.js";function g(e){let[t,n]=(0,_.useState)(`idle`),r=async(t,r)=>{n(`pending`);try{await e(t,r),n(`idle`)}catch{n(`error`)}};return{isPending:t===`pending`,increaseCartItemQuantity:(e,t)=>r(e,t+1),decreaseCartItemQuantity:(e,t)=>r(e,t-1)}}var _,v=e((()=>{_=t(n(),1)}));function y({cartItem:e,onSelect:t,onDelete:n,onQuantityUpdate:r}){let{id:i,name:s,imageUrl:c,price:d,quantity:f,isSelected:m,isAvailable:_,errorMsg:v}=e,y=!_,{isPending:j,increaseCartItemQuantity:M,decreaseCartItemQuantity:N}=g(r);return u(`div`,{css:[x,y&&k],children:[u(`div`,{css:S,children:[l(h,{checked:m,disabled:y,onChange:()=>t(i)}),l(p,{variant:`secondary`,fit:!0,onClick:()=>n(i),children:`삭제`})]}),u(`div`,{css:C,children:[l(`img`,{css:w,src:c,alt:s}),u(`div`,{css:T,children:[u(`div`,{css:E,children:[l(`span`,{className:`typo-sm-r`,children:s}),l(`span`,{className:`typo-xl-b`,children:b(d)})]}),u(`div`,{css:D,children:[l(p,{variant:`icon`,onClick:()=>N(i,f),disabled:f===1||y,children:l(a,{})}),l(`span`,{className:`typo-sm-r`,css:O,children:f}),l(p,{variant:`icon`,onClick:()=>M(i,f),disabled:j||y,children:l(o,{})}),v&&l(`span`,{className:`typo-sm-r`,css:A,children:v})]})]})]})]})}var b,x,S,C,w,T,E,D,O,k,A,j=e((()=>{s(),r(),i(),v(),f(),m(),d(),b=e=>e.toLocaleString(`ko-KR`)+`원`,x=c`
  padding: 12px 0;
  border-top: 1px solid #e5e5e5;
  opacity: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,S=c`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,C=c`
  display: flex;
  gap: 24px;
`,w=c`
  width: 112px;
  height: 112px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  flex-shrink: 0;
`,T=c`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`,E=c`
  display: flex;
  flex-direction: column;
`,D=c`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  height: 32px;
`,O=c`
  min-width: 20px;
  text-align: center;
`,k=c`
  opacity: 0.4;
`,A=c`
  color: #e84040;
`,y.__docgenInfo={description:``,methods:[],displayName:`CartListItem`,props:{cartItem:{required:!0,tsType:{name:`CartItem`},description:``},onSelect:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: number) => void`,signature:{arguments:[{type:{name:`number`},name:`id`}],return:{name:`void`}}},description:``},onDelete:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: number) => void`,signature:{arguments:[{type:{name:`number`},name:`id`}],return:{name:`void`}}},description:``},onQuantityUpdate:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(id: number, quantity: number) => Promise<void>`,signature:{arguments:[{type:{name:`number`},name:`id`},{type:{name:`number`},name:`quantity`}],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:``}}}})),M,N,P,F,I,L,R,z,B,V,H,U;e((()=>{M=t(n(),1),j(),N={id:1,name:`상품 A`,imageUrl:`https://placehold.co/112x112`,price:35e3,quantity:2,isSelected:!0,isAvailable:!0},P=()=>void 0,F=()=>void 0,I=async()=>void 0,L={title:`Components/CartListItem`,component:y,args:{cartItem:N,onSelect:P,onDelete:F,onQuantityUpdate:I},decorators:[e=>(0,M.createElement)(`div`,{style:{width:430}},(0,M.createElement)(e))]},R={render:()=>(0,M.createElement)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8}},(0,M.createElement)(y,{cartItem:N,onSelect:P,onDelete:F,onQuantityUpdate:I}),(0,M.createElement)(y,{cartItem:{...N,id:2,name:`선택하지 않은 상품`,isSelected:!1},onSelect:P,onDelete:F,onQuantityUpdate:I}),(0,M.createElement)(y,{cartItem:{...N,id:3,name:`구매 불가능한 상품`,isAvailable:!1,errorMsg:`더 이상 구매할 수 없는 상품입니다.`},onSelect:P,onDelete:F,onQuantityUpdate:I}),(0,M.createElement)(y,{cartItem:{...N,id:4,name:`수량 에러 상품`,errorMsg:`요청한 수량이 현재 재고보다 많습니다.`},onSelect:P,onDelete:F,onQuantityUpdate:I}))},z={},B={args:{cartItem:{...N,isSelected:!1}}},V={args:{cartItem:{...N,isAvailable:!1,errorMsg:`더 이상 구매할 수 없는 상품입니다.`}}},H={args:{cartItem:{...N,errorMsg:`요청한 수량이 현재 재고보다 많습니다.`}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, createElement(CartListItem, {
    cartItem: selectedItem,
    onSelect,
    onDelete,
    onQuantityUpdate
  }), createElement(CartListItem, {
    cartItem: {
      ...selectedItem,
      id: 2,
      name: "선택하지 않은 상품",
      isSelected: false
    },
    onSelect,
    onDelete,
    onQuantityUpdate
  }), createElement(CartListItem, {
    cartItem: {
      ...selectedItem,
      id: 3,
      name: "구매 불가능한 상품",
      isAvailable: false,
      errorMsg: "더 이상 구매할 수 없는 상품입니다."
    },
    onSelect,
    onDelete,
    onQuantityUpdate
  }), createElement(CartListItem, {
    cartItem: {
      ...selectedItem,
      id: 4,
      name: "수량 에러 상품",
      errorMsg: "요청한 수량이 현재 재고보다 많습니다."
    },
    onSelect,
    onDelete,
    onQuantityUpdate
  }))
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    cartItem: {
      ...selectedItem,
      isSelected: false
    }
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    cartItem: {
      ...selectedItem,
      isAvailable: false,
      errorMsg: "더 이상 구매할 수 없는 상품입니다."
    }
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    cartItem: {
      ...selectedItem,
      errorMsg: "요청한 수량이 현재 재고보다 많습니다."
    }
  }
}`,...H.parameters?.docs?.source}}},U=[`Default`,`Selected`,`Unselected`,`Unavailable`,`QuantityError`]}))();export{R as Default,H as QuantityError,z as Selected,V as Unavailable,B as Unselected,U as __namedExportsOrder,L as default};