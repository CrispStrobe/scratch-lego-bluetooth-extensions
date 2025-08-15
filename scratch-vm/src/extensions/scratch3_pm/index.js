import BlockType from '../../extension-support/block-type';
import ArgumentType from '../../extension-support/argument-type';
import Cast from '../../util/cast';
import MathUtil from '../../util/math-util';
import translations from './translations.json'; // This now works!

let formatMessage = messageData => messageData.defaultMessage;

// This is a simplified setup that works with this older extension style
const setupTranslations = () => {
    try {
        const localeSetup = formatMessage.setup();
        if (localeSetup && localeSetup.translations && localeSetup.translations[localeSetup.locale]) {
            Object.assign(
                localeSetup.translations[localeSetup.locale],
                translations[localeSetup.locale]
            );
        }
    } catch (e) {
        // Fails silently, which is fine.
    }
};

class Scratch3PMBlocks {
    constructor (runtime) {
        this.runtime = runtime;
        if (runtime.formatMessage) {
            formatMessage = runtime.formatMessage;
        }
    }

    getInfo () {
        setupTranslations();
        return {
            id: 'planetemaths',
            name: formatMessage({ id: 'pm.title', default: 'Maths' }),
            color1: '#4879b7',
            color2: '#000000',
            blocks: [
                {
                    opcode: 'add',
                    text: formatMessage({ id: 'pm.add', default: '[NUM1] + [NUM2]' }),
                    blockType: BlockType.REPORTER,
                    arguments: { NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' }, NUM2: { type: ArgumentType.NUMBER, defaultValue: ' ' } }
                },
                {
                    opcode: 'substract',
                    text: formatMessage({ id: 'pm.substract', default: '[NUM1] - [NUM2]' }),
                    blockType: BlockType.REPORTER,
                    arguments: { NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' }, NUM2: { type: ArgumentType.NUMBER, defaultValue: ' ' } }
                },
                {
                    opcode: 'multiply',
                    text: formatMessage({ id: 'pm.multiply', default: '[NUM1] x [NUM2]' }),
                    blockType: BlockType.REPORTER,
                    arguments: { NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' }, NUM2: { type: ArgumentType.NUMBER, defaultValue: ' ' } }
                },
                {
                    opcode: 'divide',
                    text: formatMessage({ id: 'pm.divide', default: '[NUM1] / [NUM2]' }),
                    blockType: BlockType.REPORTER,
                    arguments: { NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' }, NUM2: { type: ArgumentType.NUMBER, defaultValue: ' ' } }
                },
                '---',
                {
                    opcode: 'pow',
                    text: formatMessage({ id: 'pm.pow', default: '[NUM1] ^ [NUM2]' }),
                    blockType: BlockType.REPORTER,
                    arguments: { NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' }, NUM2: { type: ArgumentType.NUMBER, defaultValue: ' ' } }
                },
                '---',
                {
                    opcode: 'mathop',
                    text: formatMessage({ id: 'pm.mathop', default: '[OPERATOR] of [NUM1]' }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' },
                        OPERATOR: { type: ArgumentType.STRING, menu: 'LIST_MATHOP', defaultValue: 'sqrt' }
                    }
                },
                '---',
                {
                    opcode: 'mathopdiv',
                    text: formatMessage({ id: 'pm.mathopdiv', default: '[OPERATOR] of [NUM1] divided by [NUM2]' }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' },
                        NUM2: { type: ArgumentType.NUMBER, defaultValue: ' ' },
                        OPERATOR: { type: ArgumentType.STRING, menu: 'LIST_MATHOPDIV', defaultValue: 'reste' }
                    }
                },
                {
                    opcode: 'mathop2',
                    text: formatMessage({ id: 'pm.mathop2', default: '[OPERATOR] of [NUM1] and [NUM2]' }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' },
                        NUM2: { type: ArgumentType.NUMBER, defaultValue: ' ' },
                        OPERATOR: { type: ArgumentType.STRING, menu: 'LIST_MATHOP2', defaultValue: 'pgcd' }
                    }
                },
                {
                    opcode: 'multiple',
                    text: formatMessage({ id: 'pm.multiple', default: '[NUM1] is a [choix1] of [NUM2]' }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' },
                        NUM2: { type: ArgumentType.NUMBER, defaultValue: ' ' },
                        choix1: { type: ArgumentType.STRING, menu: 'MULTIPLE_DIVISEUR', defaultValue: 'multiple' }
                    }
                },
                '---',
                {
                    opcode: 'arrondis',
                    text: formatMessage({ id: 'pm.arrondis', default: '[TYPE] [NUM1] to [CHIFFRE]' }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' },
                        TYPE: { type: ArgumentType.STRING, menu: 'ARRONDIS', defaultValue: 'arrondi' },
                        CHIFFRE: { type: ArgumentType.STRING, menu: 'CHIFFRE_ARRONDIS', defaultValue: '0' }
                    }
                },
                '---',
                {
                    opcode: 'chiffre_pentiere',
                    text: formatMessage({ id: 'pm.pentiere', default: '[choix1] digit of [NUM1]' }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' },
                        choix1: { type: ArgumentType.STRING, menu: 'PARTIE_ENTIERE', defaultValue: '0' }
                    }
                },
                {
                    opcode: 'chiffre_pdecimale',
                    text: formatMessage({ id: 'pm.pdecimale', default: '[choix1] digit of [NUM1]' }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' },
                        choix1: { type: ArgumentType.STRING, menu: 'PARTIE_DECIMALE', defaultValue: '1' }
                    }
                },
                {
                    opcode: 'sommechiffres',
                    text: formatMessage({ id: 'pm.sommechiffres', default: 'sum of digits of [NUM1]' }),
                    blockType: BlockType.REPORTER,
                    arguments: { NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' } }
                },
                '---',
                {
                    opcode: 'nombre_pi',
                    text: formatMessage({ id: 'pm.pi', default: 'π' }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'oppose',
                    text: formatMessage({ id: 'pm.oppose', default: '- [NUM1]' }),
                    blockType: BlockType.REPORTER,
                    arguments: { NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' } }
                },
                {
                    opcode: 'inverse',
                    text: formatMessage({ id: 'pm.inverse', default: '1 / [NUM1]' }),
                    blockType: BlockType.REPORTER,
                    arguments: { NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' } }
                },
                {
                    opcode: 'pourcent',
                    text: formatMessage({ id: 'pm.pourcent', default: '[NUM1] %' }),
                    blockType: BlockType.REPORTER,
                    arguments: { NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' } }
                },
                '---',
                {
                    opcode: 'random',
                    text: formatMessage({ id: 'pm.random', default: 'pick random [NUM1] to [NUM2]' }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        NUM1: { type: ArgumentType.NUMBER, defaultValue: '1' },
                        NUM2: { type: ArgumentType.NUMBER, defaultValue: '10' }
                    }
                },
                '---',
                {
                    opcode: 'gt',
                    text: formatMessage({ id: 'pm.gt', default: '[NUM1] < [NUM2]' }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' },
                        NUM2: { type: ArgumentType.NUMBER, defaultValue: '50' }
                    }
                },
                {
                    opcode: 'gte',
                    text: formatMessage({ id: 'pm.gte', default: '[NUM1] ≤ [NUM2]' }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' },
                        NUM2: { type: ArgumentType.NUMBER, defaultValue: '50' }
                    }
                },
                {
                    opcode: 'equals',
                    text: formatMessage({ id: 'pm.equals', default: '[NUM1] = [NUM2]' }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' },
                        NUM2: { type: ArgumentType.NUMBER, defaultValue: '50' }
                    }
                },
                {
                    opcode: 'lt',
                    text: formatMessage({ id: 'pm.lt', default: '[NUM1] > [NUM2]' }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' },
                        NUM2: { type: ArgumentType.NUMBER, defaultValue: '50' }
                    }
                },
                {
                    opcode: 'lte',
                    text: formatMessage({ id: 'pm.lte', default: '[NUM1] ≥ [NUM2]' }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' },
                        NUM2: { type: ArgumentType.NUMBER, defaultValue: '50' }
                    }
                },
                {
                    opcode: 'min',
                    text: formatMessage({ id: 'pm.min', default: 'minimum of [NUM1] and [NUM2]' }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' },
                        NUM2: { type: ArgumentType.NUMBER, defaultValue: ' ' }
                    }
                },
                {
                    opcode: 'max',
                    text: formatMessage({ id: 'pm.max', default: 'maximum of [NUM1] and [NUM2]' }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        NUM1: { type: ArgumentType.NUMBER, defaultValue: ' ' },
                        NUM2: { type: ArgumentType.NUMBER, defaultValue: ' ' }
                    }
                },
                '---',
                {
                    opcode: 'and',
                    text: formatMessage({ id: 'pm.and', default: '[OPERAND1] and [OPERAND2]' }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        OPERAND1: { type: ArgumentType.BOOLEAN, defaultValue: ' ' },
                        OPERAND2: { type: ArgumentType.BOOLEAN, defaultValue: ' ' }
                    }
                },
                {
                    opcode: 'or',
                    text: formatMessage({ id: 'pm.or', default: '[OPERAND1] or [OPERAND2]' }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        OPERAND1: { type: ArgumentType.BOOLEAN, defaultValue: ' ' },
                        OPERAND2: { type: ArgumentType.BOOLEAN, defaultValue: ' ' }
                    }
                },
                {
                    opcode: 'not',
                    text: formatMessage({ id: 'pm.not', default: 'not [OPERAND1]' }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        OPERAND1: { type: ArgumentType.BOOLEAN, defaultValue: ' ' }
                    }
                },
                '---',
                {
                    opcode: 'join',
                    text: formatMessage({ id: 'pm.join', default: 'join [STRING1] [STRING2]' }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        STRING1: { type: ArgumentType.STRING, defaultValue: 'Planète ' },
                        STRING2: { type: ArgumentType.STRING, defaultValue: 'Maths' }
                    }
                },
                {
                    opcode: 'letterOf',
                    text: formatMessage({ id: 'pm.letterof', default: 'letter [LETTER] of [STRING]' }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        STRING: { type: ArgumentType.STRING, defaultValue: 'Maths' },
                        LETTER: { type: ArgumentType.NUMBER, defaultValue: '1' }
                    }
                },
                {
                    opcode: 'length',
                    text: formatMessage({ id: 'pm.length', default: 'length of [STRING]' }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        STRING: { type: ArgumentType.STRING, defaultValue: 'Maths' }
                    }
                },
                {
                    opcode: 'contains',
                    text: formatMessage({ id: 'pm.contains', default: '[STRING1] contains [STRING2] ?' }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        STRING1: { type: ArgumentType.STRING, defaultValue: 'Maths' },
                        STRING2: { type: ArgumentType.STRING, defaultValue: 's' }
                    }
                },
                {
                    opcode: 'extract',
                    text: formatMessage({ id: 'pm.extract', default: 'extract characters from [NUM1] to [NUM2] of [STRING]' }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        STRING: { type: ArgumentType.STRING, defaultValue: 'Planète Maths' },
                        NUM1: { type: ArgumentType.NUMBER, defaultValue: '1' },
                        NUM2: { type: ArgumentType.NUMBER, defaultValue: '7' }
                    }
                }
            ],
            menus: {
                PARTIE_ENTIERE: {
                    items: [
                        { text: formatMessage({ id: 'text.c1', default: 'units' }), value: '0' },
                        { text: formatMessage({ id: 'text.c2', default: 'tens' }), value: '1' },
                        { text: formatMessage({ id: 'text.c3', default: 'hundreds' }), value: '2' },
                        { text: formatMessage({ id: 'text.c4', default: 'thousands' }), value: '3' },
                        { text: formatMessage({ id: 'text.c5', default: 'tens of thousands' }), value: '4' },
                        { text: formatMessage({ id: 'text.c6', default: 'hundreds of thousands' }), value: '5' },
                        { text: formatMessage({ id: 'text.c7', default: 'millions' }), value: '6' },
                        { text: formatMessage({ id: 'text.c8', default: 'tens of millions' }), value: '7' },
                        { text: formatMessage({ id: 'text.c9', default: 'hundreds of millions' }), value: '8' },
                        { text: formatMessage({ id: 'text.c10', default: 'billions' }), value: '9' },
                        { text: formatMessage({ id: 'text.c11', default: 'tens of billions' }), value: '10' },
                        { text: formatMessage({ id: 'text.c12', default: 'hundreds of billions' }), value: '11' }
                    ]
                },
                PARTIE_DECIMALE: {
                    items: [
                        { text: formatMessage({ id: 'text.d1', default: 'tenths' }), value: '1' },
                        { text: formatMessage({ id: 'text.d2', default: 'hundredths' }), value: '2' },
                        { text: formatMessage({ id: 'text.d3', default: 'thousandths' }), value: '3' },
                        { text: formatMessage({ id: 'text.d4', default: 'ten thousandths' }), value: '4' },
                        { text: formatMessage({ id: 'text.d5', default: 'hundred thousandths' }), value: '5' },
                        { text: formatMessage({ id: 'text.d6', default: 'millionths' }), value: '6' }
                    ]
                },
                CHIFFRE_ARRONDIS: {
                    items: [
                        { text: formatMessage({ id: 'text.a0', default: 'the unit' }), value: '0' },
                        { text: formatMessage({ id: 'text.a1', default: 'tenth' }), value: '1' },
                        { text: formatMessage({ id: 'text.a2', default: 'hundredth' }), value: '2' },
                        { text: formatMessage({ id: 'text.a3', default: 'thousandth' }), value: '3' },
                        { text: formatMessage({ id: 'text.a4', default: 'ten thousandth' }), value: '4' },
                        { text: formatMessage({ id: 'text.a5', default: 'hundred thousandth' }), value: '5' },
                        { text: formatMessage({ id: 'text.a6', default: 'millionth' }), value: '6' }
                    ]
                },
                LIST_MATHOP: {
                    items: [
                        { text: formatMessage({ id: 'text.sqrt', default: '√' }), value: 'sqrt' },
                        { text: formatMessage({ id: 'text.cos', default: 'cos' }), value: 'cos' },
                        { text: formatMessage({ id: 'text.sin', default: 'sin' }), value: 'sin' },
                        { text: formatMessage({ id: 'text.tan', default: 'tan' }), value: 'tan' },
                        { text: formatMessage({ id: 'text.acos', default: 'arccos' }), value: 'acos' },
                        { text: formatMessage({ id: 'text.asin', default: 'arcsin' }), value: 'asin' },
                        { text: formatMessage({ id: 'text.atan', default: 'arctan' }), value: 'atan' },
                        { text: formatMessage({ id: 'text.pow10', default: '10 ^' }), value: '10 ^' }
                    ]
                },
                LIST_MATHOP2: {
                    items: [
                        { text: formatMessage({ id: 'text.pgcd', default: 'GCD' }), value: 'pgcd' },
                        { text: formatMessage({ id: 'text.ppcm', default: 'LCM' }), value: 'ppcm' }
                    ]
                },
                LIST_MATHOPDIV: {
                    items: [
                        { text: formatMessage({ id: 'text.reste', default: 'remainder' }), value: 'reste' },
                        { text: formatMessage({ id: 'text.quotient', default: 'quotient' }), value: 'quotient' }
                    ]
                },
                ARRONDIS: {
                    items: [
                        { text: formatMessage({ id: 'text.vad', default: 'Approximate value by defect of' }), value: 'vad' },
                        { text: formatMessage({ id: 'text.vae', default: 'Approximate value by excess of' }), value: 'vae' },
                        { text: formatMessage({ id: 'text.arrondi', default: 'Round' }), value: 'arrondi' }
                    ]
                },
                MULTIPLE_DIVISEUR: {
                    items: [
                        { text: formatMessage({ id: 'text.multiple', default: 'multiple' }), value: 'multiple' },
                        { text: formatMessage({ id: 'text.diviseur', default: 'divider' }), value: 'diviseur' }
                    ]
                }
            }
        };
    }

    add (args) { return Cast.toNumber(args.NUM1) + Cast.toNumber(args.NUM2); }
    substract (args) { return Cast.toNumber(args.NUM1) - Cast.toNumber(args.NUM2); }
    multiply (args) { return Cast.toNumber(args.NUM1) * Cast.toNumber(args.NUM2); }
    divide (args) { return Cast.toNumber(args.NUM1) / Cast.toNumber(args.NUM2); }
    pow (args) { return Math.pow(Cast.toNumber(args.NUM1), Cast.toNumber(args.NUM2)); }
    gt (args) { return Cast.compare(args.NUM1, args.NUM2) < 0; }
    gte (args) { return Cast.compare(args.NUM1, args.NUM2) <= 0; }
    equals (args) { return Cast.compare(args.NUM1, args.NUM2) === 0; }
    lt (args) { return Cast.compare(args.NUM1, args.NUM2) > 0; }
    lte (args) { return Cast.compare(args.NUM1, args.NUM2) >= 0; }
    min (args) { return Math.min(Cast.toNumber(args.NUM1), Cast.toNumber(args.NUM2)); }
    max (args) { return Math.max(Cast.toNumber(args.NUM1), Cast.toNumber(args.NUM2)); }
    oppose (args) { return -1 * Cast.toNumber(args.NUM1); }
    inverse (args) { return 1 / Cast.toNumber(args.NUM1); }
    random (args) {
        const nFrom = Cast.toNumber(args.NUM1);
        const nTo = Cast.toNumber(args.NUM2);
        const low = nFrom <= nTo ? nFrom : nTo;
        const high = nFrom <= nTo ? nTo : nFrom;
        if (low === high) return low;
        if (Cast.isInt(args.NUM1) && Cast.isInt(args.NUM2)) {
            return low + Math.floor(Math.random() * ((high + 1) - low));
        }
        return (Math.random() * (high - low)) + low;
    }
    and (args) { return Cast.toBoolean(args.OPERAND1) && Cast.toBoolean(args.OPERAND2); }
    or (args) { return Cast.toBoolean(args.OPERAND1) || Cast.toBoolean(args.OPERAND2); }
    not (args) { return !Cast.toBoolean(args.OPERAND1); }
    pourcent (args) { return Cast.toNumber(args.NUM1) / 100; }
    mathop (args) {
        const operator = Cast.toString(args.OPERATOR).toLowerCase();
        const n = Cast.toNumber(args.NUM1);
        switch (operator) {
        case 'sqrt': return Math.sqrt(n);
        case 'sin': return parseFloat(Math.sin((Math.PI * n) / 180).toFixed(10));
        case 'cos': return parseFloat(Math.cos((Math.PI * n) / 180).toFixed(10));
        case 'tan': return MathUtil.tan(n);
        case 'asin': return (Math.asin(n) * 180) / Math.PI;
        case 'acos': return (Math.acos(n) * 180) / Math.PI;
        case 'atan': return (Math.atan(n) * 180) / Math.PI;
        case '10 ^': return Math.pow(10, n);
        }
        return 0;
    }
    mathop2 (args) {
        const operator = Cast.toString(args.OPERATOR).toLowerCase();
        const n1 = Cast.toNumber(args.NUM1);
        const n2 = Cast.toNumber(args.NUM2);
        if (Number.isInteger(n1) && Number.isInteger(n2)) {
            switch (operator) {
            case 'pgcd': return this.pgcd(n1, n2);
            case 'ppcm': return (n1 * n2) / this.pgcd(n1, n2);
            }
        }
        return '';
    }
    mathopdiv (args) {
        const operator = Cast.toString(args.OPERATOR).toLowerCase();
        const n1 = Cast.toNumber(args.NUM1);
        const n2 = Cast.toNumber(args.NUM2);
        if (Number.isInteger(n1) && Number.isInteger(n2)) {
            const result = n1 % n2;
            switch (operator) {
            case 'reste': return result;
            case 'quotient': return (n1 - result) / n2;
            }
        }
        return '';
    }
    arrondis (args) {
        const type = Cast.toString(args.TYPE).toLowerCase();
        const n1 = Cast.toNumber(args.NUM1);
        const c = Cast.toNumber(args.CHIFFRE);
        const factor = Math.pow(10, c);
        switch (type) {
        case 'vad': return Math.floor(n1 * factor) / factor;
        case 'vae': return Math.ceil(n1 * factor) / factor;
        case 'arrondi': return Math.round(n1 * factor) / factor;
        }
        return 0;
    }
    chiffre_pentiere (args) { return Math.floor(Cast.toNumber(args.NUM1) / Math.pow(10, Cast.toNumber(args.choix1))) - (Math.floor(Cast.toNumber(args.NUM1) / Math.pow(10, Cast.toNumber(args.choix1) + 1)) * 10); }
    chiffre_pdecimale (args) { return Math.floor(Cast.toNumber(args.NUM1) * Math.pow(10, Cast.toNumber(args.choix1))) - (Math.floor(Cast.toNumber(args.NUM1) * Math.pow(10, Cast.toNumber(args.choix1) - 1)) * 10); }
    multiple (args) {
        const type = Cast.toString(args.choix1).toLowerCase();
        const n1 = Cast.toNumber(args.NUM1);
        const n2 = Cast.toNumber(args.NUM2);
        if (Number.isInteger(n1) && Number.isInteger(n2)) {
            switch (type) {
            case 'multiple': return (n1 % n2) === 0;
            case 'diviseur': return (n2 % n1) === 0;
            }
        }
        return false;
    }
    sommechiffres (args) {
        let value = Math.abs(Cast.toNumber(args.NUM1));
        let somme = 0;
        if (Number.isInteger(value)) {
            while (value) {
                somme += value % 10;
                value = Math.floor(value / 10);
            }
            return somme;
        }
        return '';
    }
    pgcd (a, b) {
        if (b) { return this.pgcd(b, a % b); }
        return Math.abs(a);
    }
    nombre_pi () { return Math.PI; }
    join (args) { return Cast.toString(args.STRING1) + Cast.toString(args.STRING2); }
    letterOf (args) {
        const index = Cast.toNumber(args.LETTER) - 1;
        const str = Cast.toString(args.STRING);
        if (index < 0 || index >= str.length) { return ''; }
        return str.charAt(index);
    }
    length (args) { return Cast.toString(args.STRING).length; }
    contains (args) {
        const format = function (string) {
            return Cast.toString(string).toLowerCase();
        };
        return format(args.STRING1).includes(format(args.STRING2));
    }
    reverseString (str) {
        if (str === '') return '';
        return this.reverseString(str.substr(1)) + str.charAt(0);
    }
    extract (args) {
        const from = Cast.toNumber(args.NUM1) - 1;
        const to = Cast.toNumber(args.NUM2) - from;
        const str = Cast.toString(args.STRING);
        if (to < 0) {
            const rts = this.reverseString(str);
            return rts.substr(rts.length - from - 1, 2 - to);
        }
        return str.substr(from, to);
    }
}

module.exports = Scratch3PMBlocks;