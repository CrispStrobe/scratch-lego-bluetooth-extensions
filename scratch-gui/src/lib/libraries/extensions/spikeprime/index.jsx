import React from 'react';
import {FormattedMessage} from 'react-intl';
import spikeprimeIconURL from './spikeprime.png';
import spikeprimeInsetIconURL from './spikeprime-small.svg';
import spikeprimeConnectionIconURL from './spikeprime-illustration.svg';
import spikeprimeConnectionSmallIconURL from './spikeprime-small.svg';

const entry = {
    name: 'LEGO Education SPIKE Prime',  // Removed "(Legacy)" since this is the new implementation
    extensionId: 'spikeprime',
    collaborator: 'CrispStrobe',  // with acknowledgments and big thanks towards bricklife
    iconURL: spikeprimeIconURL,
    insetIconURL: spikeprimeInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Build with SPIKE Prime, Robot Inventor, and Powered Up devices. Supports motors, sensors, lights, and displays."
            id="gui.extension.spikeprime.description"  // Updated to reflect comprehensive support
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: false,  // Changed from true - BLE extensions don't typically need internet
    launchPeripheralConnectionFlow: true,
    useAutoScan: true,  // Changed to true for better UX - auto-scan for SPIKE Prime hubs
    connectionIconURL: spikeprimeConnectionIconURL,
    connectionSmallIconURL: spikeprimeConnectionSmallIconURL,
    connectingMessage: (
        <FormattedMessage
            defaultMessage="Connecting to SPIKE Prime..."
            id="gui.extension.spikeprime.connectingMessage"  // Fixed - was pointing to boost
        />
    ),
    helpLink: 'https://education.lego.com/'  // Fixed - was pointing to boost help
};

export {entry}; // loadable-extension needs this line.
export default entry;