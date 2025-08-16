import translations from './translations.json';
import spikeprimeIconURL from './spikeprime.png';
import spikeprimeInsetIconURL from './spikeprime-small.svg';
import spikeprimeConnectionIconURL from './spikeprime-illustration.svg';
import spikeprimeConnectionSmallIconURL from './spikeprime-small.svg';

/**
 * @param {object} messageData - data for format-message
 * @returns {string} - translated message for the current locale
 */
let formatMessage = messageData => messageData.defaultMessage;

const entry = {
    get name () {
        return formatMessage({
            id: 'gui.extension.spikeprime.name',
            default: 'LEGO Education SPIKE Prime',
            description: 'Name for the SPIKE Prime extension'
        });
    },
    extensionId: 'spikeprime',
    collaborator: 'CrispStrobe',
    iconURL: spikeprimeIconURL,
    insetIconURL: spikeprimeInsetIconURL,
    get description () {
        return formatMessage({
            id: 'gui.extension.spikeprime.description',
            default: 'Build with SPIKE Prime or Robot Inventor (v. 3 firmware with BLE). Supports motors, sensors, lights, and displays.',
            description: 'Description for the SPIKE Prime extension'
        });
    },
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: false,
    launchPeripheralConnectionFlow: true,
    useAutoScan: true,
    connectionIconURL: spikeprimeConnectionIconURL,
    connectionSmallIconURL: spikeprimeConnectionSmallIconURL,
    get connectingMessage () {
        return formatMessage({
            id: 'gui.extension.spikeprime.connectingMessage',
            default: 'Connecting to SPIKE Prime (over BLE)...',
            description: 'Message shown when connecting to SPIKE Prime'
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