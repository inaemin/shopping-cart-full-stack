import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,i as n,n as r,o as i,r as a,t as o}from"./emotion-react-jsx-runtime.browser.esm-D8sr4UXW.js";function s({size:e=6,color:t=`currentColor`}){return a(`span`,{role:`status`,"aria-label":`로딩 중`,css:l,children:[r(`span`,{css:u(e,t,0)}),r(`span`,{css:u(e,t,.15)}),r(`span`,{css:u(e,t,.3)})]})}var c,l,u,d=e((()=>{t(),o(),c=i`
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  40% {
    transform: translateY(-4px);
    opacity: 1;
  }
`,l=n`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`,u=(e,t,r)=>n`
  width: ${e}px;
  height: ${e}px;
  border-radius: 50%;
  background-color: ${t};
  animation: ${c} 0.9s ease-in-out ${r}s infinite;
`,s.__docgenInfo={description:`점 3개가 순차로 통통 튀는 로딩 인디케이터(ellipsis/bouncing dots).`,methods:[],displayName:`Loader`,props:{size:{required:!1,tsType:{name:`number`},description:`점 하나의 지름(px)`,defaultValue:{value:`6`,computed:!1}},color:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"currentColor"`,computed:!1}}}}}));export{d as n,s as t};