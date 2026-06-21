import{i as e}from"./preload-helper-xPQekRTU.js";import{a as t,i as n,n as r,r as i,t as a}from"./emotion-react-jsx-runtime.browser.esm-C1_rgJBm.js";function o({checked:e,disabled:t=!1,onChange:a,size:o=24,children:u,...d}){return i(`label`,{css:[s,t&&l],children:[r(`input`,{type:`checkbox`,css:[c,n`
            width: ${o}px;
            height: ${o}px;
          `],checked:e,disabled:t,onChange:a,...d}),u]})}var s,c,l,u=e((()=>{t(),a(),s=n`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
`,c=n`
  appearance: none;
  border: 1.5px solid #e5e5e5;
  border-radius: 7px;
  background-color: #fff;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;

  &:checked {
    background-color: #000;
    border-color: #000;
  }

  &:checked::after {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    width: 30%;
    height: 65%;
    border: 2px solid #fff;
    border-top: none;
    border-left: none;
    transform: rotate(45deg) translate(-10%, -10%);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #f5f5f5;
    border-color: #d9d9d9;
  }

  &:checked:disabled {
    background-color: #949494;
    border-color: #949494;
  }
`,l=n`
  cursor: not-allowed;
  color: #949494;
`,o.__docgenInfo={description:``,methods:[],displayName:`Checkbox`,props:{size:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`24`,computed:!1}},children:{required:!1,tsType:{name:`ReactNode`},description:``},disabled:{defaultValue:{value:`false`,computed:!1},required:!1}},composes:[`Omit`]}}));export{u as n,o as t};