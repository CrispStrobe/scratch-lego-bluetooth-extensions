import translations from './translations.json';
import gamepadIconURL from './dualshock4.png';
import gamepadInsetIconURL from './dualshock4-small.svg';

let formatMessage = messageData => messageData.defaultMessage;

const entry = {
    get name () {
        return formatMessage({
            id: 'gui.extension.gamepad.name',
            default: 'Universal Gamepad'
        });
    },
    extensionId: 'dualshock4', // Changed to match your directory
    collaborator: 'CrispStrobe',
    iconURL: gamepadIconURL,
    insetIconURL: gamepadInsetIconURL,
    get description () {
        return formatMessage({
            id: 'gui.extension.gamepad.description',
            default: 'Control your Scratch projects with any gamepad controller - Xbox, PlayStation, Nintendo Pro, or 3rd party controllers.'
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

export {entry};
export default entry;