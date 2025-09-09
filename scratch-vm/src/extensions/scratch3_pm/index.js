const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');
const MathUtil = require('../../util/math-util');
const translations = require('./translations.json');

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
                {
                    opcode: 'angleconvert',
                    text: formatMessage({ id: 'pm.angleconvert', default: 'convert [NUM1] from [FROM] to [TO]' }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        NUM1: { type: ArgumentType.NUMBER, defaultValue: '90' },
                        FROM: { type: ArgumentType.STRING, menu: 'ANGLE_UNITS', defaultValue: 'degrees' },
                        TO: { type: ArgumentType.STRING, menu: 'ANGLE_UNITS', defaultValue: 'radians' }
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
                {
                    opcode: 'factorial',
                    text: formatMessage({ id: 'pm.factorial', default: 'factorial of [NUM1]' }),
                    blockType: BlockType.REPORTER,
                    arguments: { NUM1: { type: ArgumentType.NUMBER, defaultValue: '5' } }
                },
                '---',
                {
                    opcode: 'nombre_pi',
                    text: formatMessage({ id: 'pm.pi', default: 'π' }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'nombre_e',
                    text: formatMessage({ id: 'pm.e', default: 'e' }),
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
                        // Basic functions
                        { text: formatMessage({ id: 'text.sqrt', default: '√' }), value: 'sqrt' },
                        { text: formatMessage({ id: 'text.abs', default: 'abs' }), value: 'abs' },
                        { text: formatMessage({ id: 'text.sign', default: 'sign' }), value: 'sign' },
                        { text: formatMessage({ id: 'text.floor', default: 'floor' }), value: 'floor' },
                        { text: formatMessage({ id: 'text.ceil', default: 'ceil' }), value: 'ceil' },
                        
                        // Logarithms and exponentials
                        { text: formatMessage({ id: 'text.ln', default: 'ln' }), value: 'ln' },
                        { text: formatMessage({ id: 'text.log', default: 'log' }), value: 'log' },
                        { text: formatMessage({ id: 'text.exp', default: 'e^' }), value: 'exp' },
                        { text: formatMessage({ id: 'text.pow10', default: '10^' }), value: '10^' },
                        
                        // Standard trigonometric functions (degrees)
                        { text: formatMessage({ id: 'text.sin', default: 'sin' }), value: 'sin' },
                        { text: formatMessage({ id: 'text.cos', default: 'cos' }), value: 'cos' },
                        { text: formatMessage({ id: 'text.tan', default: 'tan' }), value: 'tan' },
                        { text: formatMessage({ id: 'text.sec', default: 'sec' }), value: 'sec' },
                        { text: formatMessage({ id: 'text.csc', default: 'csc' }), value: 'csc' },
                        { text: formatMessage({ id: 'text.cot', default: 'cot' }), value: 'cot' },
                        
                        // Inverse trigonometric functions (return degrees)
                        { text: formatMessage({ id: 'text.asin', default: 'arcsin' }), value: 'asin' },
                        { text: formatMessage({ id: 'text.acos', default: 'arccos' }), value: 'acos' },
                        { text: formatMessage({ id: 'text.atan', default: 'arctan' }), value: 'atan' },
                        { text: formatMessage({ id: 'text.asec', default: 'arcsec' }), value: 'asec' },
                        { text: formatMessage({ id: 'text.acsc', default: 'arccsc' }), value: 'acsc' },
                        { text: formatMessage({ id: 'text.acot', default: 'arccot' }), value: 'acot' },
                        
                        // Hyperbolic functions
                        { text: formatMessage({ id: 'text.sinh', default: 'sinh' }), value: 'sinh' },
                        { text: formatMessage({ id: 'text.cosh', default: 'cosh' }), value: 'cosh' },
                        { text: formatMessage({ id: 'text.tanh', default: 'tanh' }), value: 'tanh' },
                        
                        // Inverse hyperbolic functions
                        { text: formatMessage({ id: 'text.asinh', default: 'arcsinh' }), value: 'asinh' },
                        { text: formatMessage({ id: 'text.acosh', default: 'arccosh' }), value: 'acosh' },
                        { text: formatMessage({ id: 'text.atanh', default: 'arctanh' }), value: 'atanh' }
                    ]
                },
                ANGLE_UNITS: {
                    items: [
                        { text: formatMessage({ id: 'text.degrees', default: 'degrees' }), value: 'degrees' },
                        { text: formatMessage({ id: 'text.radians', default: 'radians' }), value: 'radians' }
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
        // Basic functions
        case 'sqrt': return Math.sqrt(n);
        case 'abs': return Math.abs(n);
        case 'sign': return Math.sign(n);
        case 'floor': return Math.floor(n);
        case 'ceil': return Math.ceil(n);
        
        // Logarithms and exponentials
        case 'ln': return Math.log(n);
        case 'log': return Math.log10(n);
        case 'exp': return Math.exp(n);
        case '10^': return Math.pow(10, n);
        
        // Standard trigonometric functions (input in degrees)
        case 'sin': return parseFloat(Math.sin((Math.PI * n) / 180).toFixed(10));
        case 'cos': return parseFloat(Math.cos((Math.PI * n) / 180).toFixed(10));
        case 'tan': return MathUtil.tan(n);
        case 'sec': return 1 / parseFloat(Math.cos((Math.PI * n) / 180).toFixed(10));
        case 'csc': return 1 / parseFloat(Math.sin((Math.PI * n) / 180).toFixed(10));
        case 'cot': return 1 / MathUtil.tan(n);
        
        // Inverse trigonometric functions (output in degrees)
        case 'asin': return (Math.asin(n) * 180) / Math.PI;
        case 'acos': return (Math.acos(n) * 180) / Math.PI;
        case 'atan': return (Math.atan(n) * 180) / Math.PI;
        case 'asec': return (Math.acos(1/n) * 180) / Math.PI;
        case 'acsc': return (Math.asin(1/n) * 180) / Math.PI;
        case 'acot': return (Math.atan(1/n) * 180) / Math.PI;
        
        // Hyperbolic functions
        case 'sinh': return Math.sinh(n);
        case 'cosh': return Math.cosh(n);
        case 'tanh': return Math.tanh(n);
        
        // Inverse hyperbolic functions
        case 'asinh': return Math.asinh(n);
        case 'acosh': return Math.acosh(n);
        case 'atanh': return Math.atanh(n);
        }
        return 0;
    }
    
    angleconvert (args) {
        const value = Cast.toNumber(args.NUM1);
        const from = Cast.toString(args.FROM).toLowerCase();
        const to = Cast.toString(args.TO).toLowerCase();
        
        if (from === to) return value;
        
        if (from === 'degrees' && to === 'radians') {
            return (value * Math.PI) / 180;
        } else if (from === 'radians' && to === 'degrees') {
            return (value * 180) / Math.PI;
        }
        
        return value;
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
    
    chiffre_pentiere (args) { 
        return Math.floor(Cast.toNumber(args.NUM1) / Math.pow(10, Cast.toNumber(args.choix1))) - 
               (Math.floor(Cast.toNumber(args.NUM1) / Math.pow(10, Cast.toNumber(args.choix1) + 1)) * 10); 
    }
    
    chiffre_pdecimale (args) { 
        return Math.floor(Cast.toNumber(args.NUM1) * Math.pow(10, Cast.toNumber(args.choix1))) - 
               (Math.floor(Cast.toNumber(args.NUM1) * Math.pow(10, Cast.toNumber(args.choix1) - 1)) * 10); 
    }
    
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
    
    factorial (args) {
        const n = Cast.toNumber(args.NUM1);
        if (!Number.isInteger(n) || n < 0) return '';
        if (n === 0 || n === 1) return 1;
        if (n > 170) return Infinity; // JavaScript limit for factorial
        
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    
    pgcd (a, b) {
        if (b) { return this.pgcd(b, a % b); }
        return Math.abs(a);
    }
    
    nombre_pi () { return Math.PI; }
    nombre_e () { return Math.E; }
    
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

exports.blockClass = Scratch3PMBlocks;
module.exports = Scratch3PMBlocks;