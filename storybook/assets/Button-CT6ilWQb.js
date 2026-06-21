import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,i as n,n as r,t as i}from"./emotion-react-jsx-runtime.browser.esm-D8sr4UXW.js";function a({variant:e=`primary`,fit:t=!1,radius:n,children:i,type:a=`button`,...u}){return r(`button`,{type:a,css:[o,s[e],t&&l,n&&c[n]],...u,children:i})}var o,s,c,l,u=e((()=>{t(),i(),o=n`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s;
  width: 100%;
  height: 100%;
  border-radius: 0;
  font-size: 12px;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,s={primary:n`
    background-color: #000;
    color: #fff;
  `,secondary:n`
    background-color: #fff;
    color: #000;
    border: 1px solid #e5e5e5;
  `,icon:n`
    background-color: #fff;
    color: #000;
    border: 1px solid #e5e5e5;
    width: 24px;
    height: 24px;
    padding: 2px;
    border-radius: 8px;
  `},c={sm:n`
    border-radius: 4px;
  `,md:n`
    border-radius: 8px;
  `,lg:n`
    border-radius: 12px;
  `},l=n`
  width: auto;
  border-radius: 4px;
  padding: 4px 8px;
`,a.__docgenInfo={description:``,methods:[],displayName:`Button`,props:{variant:{required:!1,tsType:{name:`union`,raw:`"primary" | "secondary" | "icon"`,elements:[{name:`literal`,value:`"primary"`},{name:`literal`,value:`"secondary"`},{name:`literal`,value:`"icon"`}]},description:``,defaultValue:{value:`"primary"`,computed:!1}},fit:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},radius:{required:!1,tsType:{name:`union`,raw:`"sm" | "md" | "lg"`,elements:[{name:`literal`,value:`"sm"`},{name:`literal`,value:`"md"`},{name:`literal`,value:`"lg"`}]},description:``},children:{required:!0,tsType:{name:`ReactNode`},description:``},type:{defaultValue:{value:`"button"`,computed:!1},required:!1}},composes:[`ButtonHTMLAttributes`]}}));export{u as n,a as t};