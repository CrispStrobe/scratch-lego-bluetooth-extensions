import translations from './translations.json';
import gamepadIconURL from './dualshock4.png';
import gamepadInsetIconURL from './dualshock4-small.svg';

/**
 * @param {object} messageData - data for format-message
 * @returns {string} - translated message for the current locale
 */
let formatMessage = messageData => messageData.defaultMessage;

const entry = {
    get name () {
        return formatMessage({
            id: 'gui.extension.gamepad.name',
            default: 'Universal Gamepad',
            description: 'Name for the Universal Gamepad extension'
        });
    },
    extensionId: 'dualshock4', // Must match the VM extension id
    collaborator: 'CrispStrobe',
    iconURL: gamepadIconURL,
    insetIconURL: gamepadInsetIconURL,
    get description () {
        return formatMessage({
            id: 'gui.extension.gamepad.description',
            default: 'Control your Scratch projects with any gamepad controller - Xbox, PlayStation, Nintendo Pro, or 3rd party controllers.',
            description: 'Description for the Universal Gamepad extension'
        });
    },
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: false,
    setFormatMessage: formatter => {
        formatMessage = formatter;
    },
    translationMap: translations
};

export {entry}; // For loadable-extension
export default entry;