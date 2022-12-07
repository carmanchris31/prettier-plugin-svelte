import 'prettier';

// TODO: Update @types/prettier
declare module 'prettier' {
    export type V3Parser<T = any> = Exclude<Parser<T>, 'parse'> & {
        parse: (text: string, options: ParserOptions<T>) => Promise<T>;
    };

    export type V3Printer<T = any> = Exclude<Printer<T>, 'embed'> & {
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
}
