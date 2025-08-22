import translations from './translations.json';
import spikeprimeIconURL from './spikeprime.png';
import spikeprimeInsetIconURL from './spikeprime-small.svg';

/**
 * @param {object} messageData - data for format-message
 * @returns {string} - translated message for the current locale
 */
let formatMessage = messageData => messageData.defaultMessage;

const entry = {
    get name () {
        return formatMessage({
            id: 'gui.extension.spikeprimeble.name',
            default: 'SPIKE Prime BLE',
            description: 'Name for the SPIKE Prime BLE extension'
        });
    },
    extensionId: 'spikeprimeble',
    collaborator: 'CrispStrobe',
    iconURL: spikeprimeIconURL,
    insetIconURL: spikeprimeInsetIconURL,
    get description () {
        return formatMessage({
            id: 'gui.extension.spikeprimeble.description',
            default: 'Build with SPIKE Prime or Robot Inventor using Bluetooth Low Energy. Supports motors, sensors, lights, and displays.',
            description: 'Description for the SPIKE Prime BLE extension'
        });
    },
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: false,
    launchPeripheralConnectionFlow: true,
    useAutoScan: true,
    get connectingMessage () {
        return formatMessage({
            id: 'gui.extension.spikeprimeble.connectingMessage',
            default: 'Connecting to SPIKE Prime via BLE...',
            description: 'Message shown when connecting to SPIKE Prime via BLE'
        });
    },
    helpLink: 'https://education.lego.com/',
    setFormatMessage: formatter => {
        formatMessage = formatter;
    },
    translationMap: translations
};

export {entry}; // For loadable-extension
export default entry;