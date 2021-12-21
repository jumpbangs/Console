interface AddressFormatConfig {
  name: string;
  appendComma: boolean;
}

export type FormatAddress = (string | AddressFormatConfig)[][];
