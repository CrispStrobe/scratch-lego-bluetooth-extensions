// scratch-gui/src/lib/libraries/extensions/gamepad/index.jsx
import React from 'react';
import { FormattedMessage } from 'react-intl';

import gamepadIconURL from './dualshock4.png';
import gamepadInsetIconURL from './dualshock4-small.svg';

const entry = {
    name: 'Universal Gamepad',
    extensionId: 'gamepad', // Must match the extension ID in the main file
    collaborator: 'CrispStrobe',
    iconURL: gamepadIconURL,
    insetIconURL: gamepadInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Control your Scratch projects with any gamepad controller - Xbox, PlayStation, Nintendo Pro, or 3rd party controllers."
            id="gui.extension.gamepad.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: false,
};

export { entry };
export default entry;
