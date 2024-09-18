export interface VinVariable {
  Value: string;
  Variable: string;
  VariableId: string;
}

export interface DecoderResponseData {
  variables: VinVariable[];
  apiMessage: string;
}

export interface VinResponseObject {
  data: {
    Results: VinVariable[];
    Message: string
  };
}
export interface VariableData{
  DataType: string;
  Description: string;
  ID: number;
  Name: string;
  GroupName: string;
}
export interface VariablesResponseObject{
  data:{
    Results: VariableData[]
  }

}
export interface CardProps{
  title: string;
  description: string;
  id: string | number;
}
