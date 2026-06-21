import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{I as n,a as r,n as i,o as a,t as o}from"./iframe-8PlIS3ON.js";import{t as s}from"./jsx-runtime-CaZkqeYb.js";import{a as c,i as l,n as u,r as d,t as f}from"./emotion-react-jsx-runtime.browser.esm-CDXz4srl.js";import{n as p,t as m}from"./Button-BIauJbP3.js";import{a as h,c as ee,d as te,f as ne,g as re,h as ie,i as g,l as ae,m as oe,n as se,o as _,p as ce,r as le,t as ue,u as de}from"./MyQueryProvider-QZz5jxsU.js";import{n as fe,t as pe}from"./Checkbox-BOX9VZMN.js";import{n as me,t as he}from"./Loader-bq7zeD80.js";var v,y,ge=e((()=>{n(),v=t(s()),y=e=>(0,v.jsx)(`svg`,{width:16,height:16,viewBox:`0 0 16 16`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,...e,children:(0,v.jsx)(`path`,{d:`M7.33331 4.66665H8.66665V5.99998H7.33331V4.66665ZM7.33331 7.33331H8.66665V11.3333H7.33331V7.33331ZM7.99998 1.33331C4.31998 1.33331 1.33331 4.31998 1.33331 7.99998C1.33331 11.68 4.31998 14.6666 7.99998 14.6666C11.68 14.6666 14.6666 11.68 14.6666 7.99998C14.6666 4.31998 11.68 1.33331 7.99998 1.33331ZM7.99998 13.3333C5.05998 13.3333 2.66665 10.94 2.66665 7.99998C2.66665 5.05998 5.05998 2.66665 7.99998 2.66665C10.94 2.66665 13.3333 5.05998 13.3333 7.99998C13.3333 10.94 10.94 13.3333 7.99998 13.3333Z`,fill:`currentColor`})})}));async function _e(e,t){return(await ie(await fetch(`${ce}${ne.CHECKOUT_DISCOUNT_PREVIEW(e,t)}`))).coupon_discount}var ve=e((()=>{re(),oe()})),b,x,ye=e((()=>{b={maxCouponCount:2},x=()=>b}));function S(){return x()}var C=e((()=>{ye()}));function be(e,t,n={}){let r=(0,w.useContext)(de);if(!r)throw Error(`useMyQuery는 MyQueryProvider 안에서 사용해야 합니다.`);let{initialData:i}=n,[a,o]=(0,w.useState)({status:i===void 0?`idle`:`success`,data:i??null,error:null});return(0,w.useEffect)(()=>{r.createQueryRecord(e,t),i!==void 0&&r.getQueryData(e)===null&&r.setQueryData(e,i);let n=r.subscribe(e,()=>{let t=r.getQueryState(e);t&&o(t)});return r.fetchQuery(e).catch(()=>{}),n},[e]),{data:a.data,error:a.error,isLoading:a.status===`loading`,hasError:a.status===`error`,refetch:()=>r.fetchQuery(e)}}var w,xe=e((()=>{w=t(n(),1),te()}));function Se(e,t=[],n=0){let{maxCouponCount:r}=S(),[i,a]=(0,T.useState)(t),o=t.length!==i.length||i.some(e=>!t.includes(e)),{data:s,isLoading:c}=be(ee(e,i),()=>_e(e,i),{initialData:o?void 0:n});return{isPending:c,isDirty:o,selectedCouponIds:i,toggleCouponCheckBox:(e,t)=>{a(n=>t?n.includes(e)||n.length>=r?n:[...n,e]:n.includes(e)?n.filter(t=>t!==e):n)},estimatedCouponDiscount:s??n}}var T,Ce=e((()=>{T=t(n(),1),ve(),ae(),C(),xe()})),E,D,we=e((()=>{n(),E=t(s()),D=e=>(0,E.jsx)(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 640 640`,...e,children:(0,E.jsx)(`path`,{d:`M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z`})})}));function O({width:e=`100%`,height:t=`auto`,onDimmedClick:n,children:r}){return u(`div`,{css:A,onClick:n,children:u(`div`,{css:[j,l({width:e,height:t})],onClick:e=>e.stopPropagation(),children:r})})}function Te({children:e}){return u(`div`,{css:M,children:e})}function Ee({children:e}){return u(`div`,{css:N,children:e})}function De({children:e}){return u(`div`,{children:e})}function Oe({onClick:e}){return u(m,{variant:`icon`,css:k,onClick:e,"aria-label":`닫기`,children:u(D,{})})}var k,A,j,M,N,ke=e((()=>{c(),we(),p(),f(),O.Header=Te,O.Main=Ee,O.Footer=De,O.CloseButton=Oe,k=l`
  border: none;
`,A=l`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  z-index: 1000;
`,j=l`
  padding: 32px 24px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`,M=l`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`,N=l`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`,O.__docgenInfo={description:``,methods:[{name:`Header`,docblock:null,modifiers:[`static`],params:[{name:`{ children }: { children: ReactNode }`,optional:!1,type:{name:`signature`,type:`object`,raw:`{ children: ReactNode }`,signature:{properties:[{key:`children`,value:{name:`ReactNode`,required:!0}}]}}}],returns:null},{name:`Main`,docblock:null,modifiers:[`static`],params:[{name:`{ children }: { children: ReactNode }`,optional:!1,type:{name:`signature`,type:`object`,raw:`{ children: ReactNode }`,signature:{properties:[{key:`children`,value:{name:`ReactNode`,required:!0}}]}}}],returns:null},{name:`Footer`,docblock:null,modifiers:[`static`],params:[{name:`{ children }: { children: ReactNode }`,optional:!1,type:{name:`signature`,type:`object`,raw:`{ children: ReactNode }`,signature:{properties:[{key:`children`,value:{name:`ReactNode`,required:!0}}]}}}],returns:null},{name:`CloseButton`,docblock:null,modifiers:[`static`],params:[{name:`{ onClick }: { onClick: () => void }`,optional:!1,type:{name:`signature`,type:`object`,raw:`{ onClick: () => void }`,signature:{properties:[{key:`onClick`,value:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}},required:!0}}]}}}],returns:null}],displayName:`Modal`,props:{width:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"100%"`,computed:!1}},height:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"auto"`,computed:!1}},onDimmedClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},children:{required:!0,tsType:{name:`ReactNode`},description:``}}}}));function P({coupon:e,isChecked:t,disabled:n,onChange:r}){let i=F(e);return d(`div`,{css:[I,n?B:z],onClick:()=>{n||r(!t)},"aria-disabled":n,children:[u(`div`,{css:R,children:u(pe,{checked:t,disabled:n,readOnly:!0,children:u(`span`,{className:`typo-md-b`,children:e.name})})}),u(`div`,{css:L,children:i.map(e=>u(`span`,{className:`typo-sm-r`,children:e},e))})]})}var F,I,L,R,z,B,Ae=e((()=>{c(),fe(),_(),f(),F=e=>{let t=[];return e.expiredDate&&t.push(`만료일: ${le(e.expiredDate)}`),e.minOrderAmount!==void 0&&t.push(`최소 주문 금액: ${g(e.minOrderAmount)}`),e.usableStartAt&&e.usableEndAt&&t.push(`사용 가능 시간: ${h(e.usableStartAt,e.usableEndAt)}`),t},I=l`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid #e5e5e5;
`,L=l`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,R=l`
  pointer-events: none;
`,z=l`
  cursor: pointer;
`,B=l`
  color: #666;
  cursor: not-allowed;
`,P.__docgenInfo={description:``,methods:[],displayName:`CouponItem`,props:{coupon:{required:!0,tsType:{name:`Coupon`},description:``},isChecked:{required:!0,tsType:{name:`boolean`},description:``},disabled:{required:!0,tsType:{name:`boolean`},description:``},onChange:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(checked: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`checked`}],return:{name:`void`}}},description:``}}}}));function V({checkoutId:e,couponList:t,initialCouponDiscount:n,onApplyCoupon:r,onClose:i}){let{maxCouponCount:a}=S(),{isPending:o,isDirty:s,selectedCouponIds:c,toggleCouponCheckBox:l,estimatedCouponDiscount:f}=Se(e,t.filter(e=>e.isSelected).map(e=>e.id),n),p=e=>c.includes(e),h=e=>e.disabled?!0:!c.includes(e.id)&&c.length>=a;return d(O,{height:`614px`,onDimmedClick:i,children:[d(O.Header,{children:[u(`h1`,{className:`typo-lg-b`,children:`쿠폰을 선택해 주세요`}),u(O.CloseButton,{onClick:i})]}),d(O.Main,{children:[d(`p`,{className:`typo-sm-r`,css:H,children:[u(y,{}),` 쿠폰은 최대 `,a,`개까지 사용할 수 있습니다.`]}),u(`ul`,{css:U,children:t.map(e=>u(`li`,{children:u(P,{coupon:e,isChecked:p(e.id),disabled:h(e),onChange:t=>l(e.id,t)})},e.id))})]}),u(O.Footer,{children:u(`div`,{css:W,children:u(m,{radius:`sm`,disabled:o||!s,onClick:()=>{r(c),i()},children:o?u(he,{}):d(`span`,{className:`typo-md-b`,children:[`총 `,g(f),` 할인 쿠폰 사용하기`]})})})})]})}var H,U,W,je=e((()=>{c(),ge(),Ce(),C(),p(),ke(),me(),Ae(),_(),f(),H=l`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 16px;
`,U=l`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,W=l`
  height: 44px;
`,V.__docgenInfo={description:``,methods:[],displayName:`CouponModal`,props:{checkoutId:{required:!0,tsType:{name:`number`},description:``},couponList:{required:!0,tsType:{name:`Array`,elements:[{name:`Coupon`}],raw:`Coupon[]`},description:``},initialCouponDiscount:{required:!0,tsType:{name:`number`},description:``},onApplyCoupon:{required:!0,tsType:{name:`signature`,type:`function`,raw:`(selectedCouponIds: number[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`number`}],raw:`number[]`},name:`selectedCouponIds`}],return:{name:`void`}}},description:``},onClose:{required:!0,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}}));async function G(e,t){let n=(await q(e).findByText(t)).closest(`[aria-disabled]`);await K.click(n)}var K,q,J,Y,X,Z,Q,$;e((()=>{r(),je(),se(),o(),f(),{userEvent:K,within:q}=__STORYBOOK_MODULE_TEST__,J=`http://localhost:3000/checkouts/:checkoutId/coupons/discount-preview`,Y={title:`Components/CouponModal`,component:V,parameters:{layout:`fullscreen`},args:{checkoutId:1,couponList:[{id:1,name:`5,000원 할인 쿠폰`,expiredDate:new Date(2026,10,30),minOrderAmount:1e5,isSelected:!0,disabled:!1},{id:2,name:`2개 구매 시 1개 무료 쿠폰`,expiredDate:new Date(2026,4,30),isSelected:!1,disabled:!1},{id:3,name:`5만원 이상 구매 시 무료 배송 쿠폰`,expiredDate:new Date(2026,7,31),minOrderAmount:5e4,isSelected:!1,disabled:!1},{id:4,name:`미라클모닝 30% 할인 쿠폰`,expiredDate:new Date(2026,6,31),usableStartAt:`04:00`,usableEndAt:`07:00`,isSelected:!1,disabled:!0}],initialCouponDiscount:5e3,onApplyCoupon:()=>void 0,onClose:()=>void 0},decorators:[e=>u(ue,{children:u(`div`,{style:{position:`relative`,width:430,height:740},children:u(e,{})})})]},X={},Z={beforeEach:()=>(i.use(a.get(J,()=>new Promise(()=>{}))),()=>i.resetHandlers()),play:async({canvasElement:e})=>{await G(e,`2개 구매 시 1개 무료 쿠폰`)}},Q={play:async({canvasElement:e})=>{await G(e,`2개 구매 시 1개 무료 쿠폰`)}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{}`,...X.parameters?.docs?.source},description:{story:`상태 1: 진입 직후. 변경한 쿠폰이 없어(!isDirty) 적용 버튼이 비활성이고 초기 할인액을 보여준다.`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  beforeEach: () => {
    // 할인 미리보기 응답을 보류시켜 조회 중(isPending) 상태를 유지한다.
    worker.use(http.get(DISCOUNT_PREVIEW_URL, () => new Promise<Response>(() => {})));
    return () => worker.resetHandlers();
  },
  play: async ({
    canvasElement
  }) => {
    // 조합 변경 → isDirty + 응답 보류로 isPending 유지 → 로더 표시
    await toggleCoupon(canvasElement, "2개 구매 시 1개 무료 쿠폰");
  }
}`,...Z.parameters?.docs?.source},description:{story:`상태 2: 쿠폰 조합을 바꿔 예상 할인액을 조회하는 중(isPending). 버튼이 비활성이고 로더가 표시된다.`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    await toggleCoupon(canvasElement, "2개 구매 시 1개 무료 쿠폰");
  }
}`,...Q.parameters?.docs?.source},description:{story:`상태 3: 쿠폰 조합을 바꾸고 조회가 끝난 상태(isDirty && !isPending). 적용 버튼이 활성화된다.`,...Q.parameters?.docs?.description}}},$=[`Default`,`Loading`,`Applicable`]}))();export{Q as Applicable,X as Default,Z as Loading,$ as __namedExportsOrder,Y as default};