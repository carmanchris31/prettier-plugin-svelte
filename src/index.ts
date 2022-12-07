import { SupportLanguage, V3Parser, V3Printer } from 'prettier';
import { embed } from './embed';
import { snipScriptAndStyleTagContent } from './lib/snipTagContent';
import { print } from './print';
import { ASTNode } from './print/nodes';

function locStart(node: any) {
    return node.start;
}

function locEnd(node: any) {
    return node.end;
}

export const languages: Partial<SupportLanguage>[] = [
    {
        name: 'svelte',
        parsers: ['svelte'],
        extensions: ['.svelte'],
        vscodeLanguageIds: ['svelte'],
    },
];

export const parsers: Record<string, V3Parser> = {
    svelte: {
        parse: async (text) => {
            try {
                return <ASTNode>{ ...require(`svelte/compiler`).parse(text), __isRoot: true };
            } catch (err: any) {
                if (err.start != null && err.end != null) {
                    // Prettier expects error objects to have loc.start and loc.end fields.
                    // Svelte uses start and end directly on the error.
                    err.loc = {
                        start: err.start,
                        end: err.end,
                    };
                }

                throw err;
            }
        },
        preprocess: (text, options) => {
            text = snipScriptAndStyleTagContent(text);
            text = text.trim();
            // Prettier sets the preprocessed text as the originalText in case
            // the Svelte formatter is called directly. In case it's called
            // as an embedded parser (for example when there's a Svelte code block
            // inside markdown), the originalText is not updated after preprocessing.
            // Therefore we do it ourselves here.
            options.originalText = text;
            return text;
        },
        locStart,
        locEnd,
        astFormat: 'svelte-ast',
    },
};

export const printers: Record<string, V3Printer> = {
    'svelte-ast': {
        print,
        embed,
    },
};

export { options } from './options';
