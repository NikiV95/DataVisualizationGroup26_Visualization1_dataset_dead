declare module 'papaparse' {
    export interface ParseResult<T> {
      data: T[];
      errors: any[];
      meta: {
        delimiter: string;
        linebreak: string;
        aborted: boolean;
        truncated: boolean;
        cursor: number;
        fields?: string[];
      };
    }
  
    export interface ParseConfig {
      delimiter?: string;
      newline?: string;
      quoteChar?: string;
      escapeChar?: string;
      header?: boolean;
      dynamicTyping?: boolean | { [key: string]: boolean };
      preview?: number;
      encoding?: string;
      worker?: boolean;
      comments?: string | boolean;
      step?: (results: ParseResult<any>, parser: any) => void;
      complete?: (results: ParseResult<any>, file: File) => void;
      error?: (error: any, file: File) => void;
      download?: boolean;
      skipEmptyLines?: boolean | 'greedy';
      chunk?: (results: ParseResult<any>, parser: any) => void;
      fastMode?: boolean;
      beforeFirstChunk?: (chunk: string) => string | void;
      withCredentials?: boolean;
      transform?: (value: string, field: string | undefined) => any;
    }
  
    export function parse<T = any>(input: string, config?: ParseConfig): ParseResult<T>;
    export function parse<T = any>(input: File, config?: ParseConfig): ParseResult<T>;
  }
  