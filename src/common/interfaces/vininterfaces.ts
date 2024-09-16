export interface VinVariable {
  Value: string;
  Variable: string;
  VariableId: string;
}

export interface DecoderResponseData extends Array<VinVariable> {}

export interface ResponseObject {
  data: {
    Results: DecoderResponseData;
  };
}
