import 'prettier';

// TODO: Update @types/prettier instead
declare module 'prettier' {
    export type V3Parser<T = any> = Omit<Parser<T>, 'parse'> & {
        parse: (text: string, options: ParserOptions<T>) => Promise<T>;
    };

    export type V3Printer<T = any> = Omit<Printer<T>, 'embed'> & {
        embed?(
            // Path to the current AST node
            path: AstPath,
            // Current options
            options: Options,
        ):
            | ((
                  // Parses and prints the passed text using a different parser.
                  // You should set `options.parser` to specify which parser to use.
                  textToDoc: (text: string, options: Options) => Promise<Doc>,
                  // Prints the current node or its descendant node with the current printer
                  print: (selector?: string | number | Array<string | number> | AstPath) => Doc,
                  // The following two arguments are passed for convenience.
                  // They're the same `path` and `options` that are passed to `embed`.
                  path: AstPath,
                  options: Options,
              ) => Promise<Doc | undefined> | Doc | undefined)
            | Doc
            | undefined;
    };

    export function format(source: string, options?: Options): Promise<string>;

    export function format(): Promise<string>
    export function formatWithCursor(source: string, options: CursorOptions): Promise<CursorResult>;
    export function check(source: string, options?: Options): Promise<boolean>
    export function getSupportInfo(): Promise<SupportInfo>
    export function clearConfigCache(): Promise<void>
    namespace resolveConfig {
        // export function resolveConfig.sync is removed
    }
    namespace resolveConfigFile {
        // export function resolveConfigFile.sync is removed
    }
    namespace getFileInfo {
        // export function getFileInfo.sync is removed
    }

    export interface ParserOptions<T = any> extends Partial<RequiredOptions> {
        locStart: (node: T) => number;
        locEnd: (node: T) => number;
        originalText: string;
    }

    export namespace doc {
        namespace builders {
            function join(sep: Doc, docs: Doc[]): Doc;
        }
    }
}
