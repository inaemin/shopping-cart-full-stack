import{i as e}from"./preload-helper-xPQekRTU.js";import{n as t,t as n}from"./emotion-react-jsx-runtime.browser.esm-CDXz4srl.js";import{n as r,t as i}from"./Button-BIauJbP3.js";import{n as a,t as o}from"./Loader-bq7zeD80.js";var s,c,l,u,d,f,p;e((()=>{a(),r(),n(),s={title:`Components/Loader`,component:o,parameters:{layout:`centered`},argTypes:{size:{control:{type:`range`,min:2,max:20,step:1},description:`점 하나의 지름(px)`},color:{control:{type:`color`},description:`점 색상`}}},c={},l={args:{size:12}},u={args:{color:`#e84040`}},d={args:{color:`#fff`},parameters:{backgrounds:{default:`dark`}}},f={render:e=>t(`div`,{style:{width:280,height:44},children:t(i,{radius:`sm`,disabled:!0,children:t(o,{...e})})})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: 12
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    color: "#e84040"
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    color: "#fff"
  },
  parameters: {
    backgrounds: {
      default: "dark"
    }
  }
}`,...d.parameters?.docs?.source},description:{story:`currentColor를 상속하므로, 어두운 배경 위 흰 글자 영역에서는 흰 점으로 보인다.`,...d.parameters?.docs?.description}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    width: 280,
    height: 44
  }}>
      <Button radius="sm" disabled>
        <Loader {...args} />
      </Button>
    </div>
}`,...f.parameters?.docs?.source},description:{story:`실제 사용 맥락: 버튼 내부에서 비동기 처리 중 표시.`,...f.parameters?.docs?.description}}},p=[`Default`,`Large`,`Colored`,`OnDarkBackground`,`InsideButton`]}))();export{u as Colored,c as Default,f as InsideButton,l as Large,d as OnDarkBackground,p as __namedExportsOrder,s as default};