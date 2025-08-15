import React from 'react';
import {FormattedMessage} from 'react-intl';

import legoboostIconURL from './legoboost.png';
import legoboostInsetIconURL from './legoboost-small.svg';
import legoboostConnectionIconURL from './legoboost-illustration.svg';
import legoboostConnectionSmallIconURL from './legoboost-small.svg';

const entry = {
    name: 'LEGO Boost Hub Extended',
    extensionId: 'legoboost',
    collaborator: 'CrispStrobe',
    iconURL: legoboostIconURL,
    insetIconURL: legoboostInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Extensed extension for LEGO Boost Hub."
            id="gui.extension.legoboost.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: true,
    internetConnectionRequired: true,
    launchPeripheralConnectionFlow: true,
    useAutoScan: false,
    connectionIconURL: legoboostConnectionIconURL,
    connectionSmallIconURL: legoboostConnectionSmallIconURL,
    connectingMessage: (
        <FormattedMessage
            defaultMessage="Connecting"
            id="gui.extension.legoboost.connectingMessage"
        />
    ),
    helpLink: 'https://scratch.mit.edu/'
};

export {entry}; // loadable-extension needs this line.
export default entry;
