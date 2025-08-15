import translations from './translations.json';
import pmIconURL from './pm.png';
import pmInsetIconURL from './pm-small.svg';

/**
 * @param {object} messageData - data for format-message
 * @returns {string} - translated message for the current locale
 */
let formatMessage = messageData => messageData.defaultMessage;

const entry = {
    get name () {
        return formatMessage({
            id: 'gui.extension.planetemaths.name',
            default: 'Maths Planet',
            description: 'Name for the Maths Planet extension'
        });
    },
    extensionId: 'planetemaths',
    collaborator: 'Planète Maths',
    iconURL: pmIconURL,
    insetIconURL: pmInsetIconURL,
    get description () {
        return formatMessage({
            id: 'gui.extension.planetemaths.description',
            default: 'Use mathematics tools.',
            description: 'Description for the Maths Planet extension'
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