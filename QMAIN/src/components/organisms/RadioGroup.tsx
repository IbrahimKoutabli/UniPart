import React from "react";
import Styled from "@emotion/styled";
import { Radio } from "antd";
import { observer, inject } from "mobx-react";
import { configure } from "mobx";
configure({ enforceActions: true });

const RadioGroup = Radio.Group;
const StyledRadioGroup = Styled(RadioGroup)`
    padding : 5px;
`;

// const onChange = (e: any) => {
//   console.log(e);
// };

interface Props {
  reportStore?: any;
}

@inject("reportStore")
@observer
export default class RadioGroups extends React.Component<Props> {
  //  children = this.props.reportStore.radioDetails.map(
  //         (title: string, index: number) => {
  //           return (
  //             <Radio key={index.toString()} value={index}>
  //               {title}
  //             </Radio>
  //           );
  //         }
  //       );
  state = {
    set: false
  };
  onChange = (e: any) => {
  this.props.reportStore.basicDetails.setRadioButton(e.target.value)
  };
  render() {
    const { reportStore } = this.props
    return (
      <StyledRadioGroup onChange={this.onChange} defaultValue={null}>
      {reportStore.basicDetails.radioButtons.map((title: string, index: number)=>{
        return <Radio key={index.toString()} value={index}>{title}</Radio> // no way to manually reset radio buttons
      })}
           
       </StyledRadioGroup>
    );
  }
}
// const RadioGroups = inject("reportStore")(
//   observer(store => {
//     console.log("how many", store);
//     const children = store.reportStore.radioDetails.map(
//       (title: string, index: number) => {
//         return (
//           <Radio key={index.toString()} value={index}>
//             {title}
//           </Radio>
//         );
//       }
//     );
//     return <StyledRadioGroup onChange={onChange}>{children}</StyledRadioGroup>;
//   })
// );

// export default RadioGroups;
