import translations from './translations.json';

import legoboostIconURL from './legoboost.png';
import legoboostInsetIconURL from './legoboost-small.svg';
import legoboostConnectionIconURL from './legoboost-illustration.svg';
import legoboostConnectionSmallIconURL from './legoboost-small.svg';

/**
 * @param {object} messageData - data for format-message
 * @returns {string} - translated message for the current locale
 */
let formatMessage = messageData => messageData.defaultMessage;

const entry = {
    get name () {
        return formatMessage({
            id: 'gui.extension.legoboost.name',
            default: 'LEGO Boost Hub Extended',
            description: 'Name for the LEGO Boost Hub Extended extension'
        });
    },
    extensionId: 'legoboost',
    collaborator: 'CrispStrobe',
    iconURL: legoboostIconURL,
    insetIconURL: legoboostInsetIconURL,
    get description () {
        return formatMessage({
            id: 'gui.extension.legoboost.description',
            default: 'Extended extension for LEGO Boost Hub with advanced motor control, multi-sensor support, and enhanced hub monitoring.',
            description: 'Description for the LEGO Boost Hub Extended extension'
        });
    },
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: false,
    launchPeripheralConnectionFlow: true,
    useAutoScan: false,
    connectionIconURL: legoboostConnectionIconURL,
    connectionSmallIconURL: legoboostConnectionSmallIconURL,
    get connectingMessage () {
        return formatMessage({
            id: 'gui.extension.legoboost.connectingMessage',
            default: 'Connecting to LEGO Boost Hub...',
            description: 'Message shown while connecting to LEGO Boost Hub'
        });
    },
    helpLink: 'https://scratch.mit.edu/',
    setFormatMessage: formatter => {
        formatMessage = formatter;
    },
    translationMap: translations
};

export {entry}; // For loadable-extension
export default entry;